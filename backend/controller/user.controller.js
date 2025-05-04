import { User } from "../models/user.model.js";  
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcryptjs';
import createTokenAndSAveCcookies from '../jwt/authToken.js'

export const register = async (req, resp) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return resp.status(400).json({ message: "User Photo is Required" });
  }

  const { photo } = req.files;

  const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedFormats.includes(photo.mimetype)) {
    return resp.status(400).json({ message: "Invalid Photo format. Only JPEG, PNG, or GIF allowed" });
  }

  const { name, email, password, phone, education, role } = req.body;

  if (!name || !email || !password || !phone || !education || !role) {
    return resp.status(400).json({ message: "Please fill required fields" });
  }

  // Check for duplicate email
  const user = await User.findOne({ email });
  if (user) {
    return resp.status(400).json({ message: "User already exists with this email" });
  }

  // Upload photo to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log(cloudinaryResponse.error);
    return resp.status(500).json({ message: "Photo upload failed" });
  }


  const hashedPassword = await bcrypt.hash(password,10);

  const newUser = new User({
    email,
    name,
    password: hashedPassword,
    phone,
    education,
    role,
    photo: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  await newUser.save();

  const token = await createTokenAndSAveCcookies(newUser._id, resp)
  resp.status(201).json({ message: "User registered successfully", newUser });

};
