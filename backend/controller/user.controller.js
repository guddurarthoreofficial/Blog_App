import { User } from "../models/user.model.js";  // Ensure .js extension for ESM

export const register = async (req, resp) => {
  const { name, email, password, phone, education, role } = req.body;

  // check all required filled or not 
  if (!name || !email || !password || !phone || !education || !role) {
    return resp.status(400).json({ message: "Please fill required fields" });
  }

  // check dublicate email
  const user = await User.findOne({ email });
  if (user) {
    return resp.status(400).json({ message: "User already exists with this email" });
  }

  // save data in DB
  const newUser = new User({ email, name, password, phone, education, role });
  await newUser.save();

  resp.status(201).json({ message: "User registered successfully" });

  console.log(name, email, password, phone, education, role);
};
