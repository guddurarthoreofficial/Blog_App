import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/authToken.js";

// registation user
export const register = async (req, resp) => {
  try {
    // Check if a file was uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return resp.status(400).json({ message: "User Photo is Required" });
    }

    const { photo } = req.files;

    // Validate uploaded photo type
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return resp.status(400).json({
        message: "Invalid Photo format. Only JPEG, PNG, or GIF allowed",
      });
    }

    // Destructure required fields from request body
    const { name, email, password, phone, education, role } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !phone || !education || !role) {
      return resp.status(400).json({ message: "Please fill required fields" });
    }

    // Check if a user already exists with the same email
    const user = await User.findOne({ email });
    if (user) {
      return resp.status(400).json({
        message: "User already exists with this email",
      });
    }

    // Upload user photo to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );

    // Handle Cloudinary upload failure
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
      return resp.status(500).json({ message: "Photo upload failed" });
    }

    // Hash the user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
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

    // Save the user to the database
    await newUser.save();

    // Generate token and set it in cookies
    const token = await createTokenAndSaveCookies(newUser._id, resp);
    console.log(token);

    // Send success response with user and token
    resp.status(201).json({
      message: "User registered successfully",
      newUser,
      token: token,
    });
  } catch (err) {
    console.log(err);
    // Handle unexpected server errors
    resp.status(500).json({ message: "Internal Server error" });
  }
};

// Login Controller Function
export const login = async (req, res) => {
  // Destructure email, password, and role from request body
  const { email, password, role } = req.body;

  try {
    // Validate that all required fields are present
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    // Find the user by email and explicitly select the password field
    const user = await User.findOne({ email }).select("+password");
    console.log(user); // Debugging: log user details

    // Check if user or password is missing
    if (!user?.password) {
      return res.status(400).json({ message: "User password is missing" });
    }

    // Compare provided password with hashed password stored in DB
    const isMatch = await bcrypt.compare(password, user.password);

    // If user doesn't exist or password doesn't match
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if user's role matches the role provided during login
    if (user.role !== role) {
      return res.status(400).json({ message: `Given role ${role} not found` });
    }

    // Generate JWT token and save it in HTTP-only cookie
    const token = await createTokenAndSaveCookies(user._id, res);

    // Send success response excluding sensitive info like password
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // Handle and log internal server errors
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};


export const logout = async (req, res) => {
  try {
    // Clear the token cookie by setting it to empty and expiring it
    res.clearCookie("jwt",{ httpOnly: true });
    return res.status(200).json({ message: "User logged out successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

