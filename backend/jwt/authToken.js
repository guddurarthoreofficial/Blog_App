
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// const createTokenAndSaveCookies = async (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
//     expiresIn: "7d",
//   });

//   res.cookie("jwt", token, {
//     httpOnly: true,                          // Prevents JavaScript access (XSS protection)
//     secure: process.env.NODE_ENV === "production", // Only send on HTTPS in production
//     sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Prevent CSRF (but allow dev cookies)
//     maxAge: 7 * 24 * 60 * 60 * 1000,         // 7 days in ms
//   });

//   // Optional: Save token to DB (useful for logout or token tracking)
//   await User.findByIdAndUpdate(userId, { token });

//   return token;
// };

// export default createTokenAndSaveCookies;









// ====================Production ===============================

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: false,                          // Prevents JavaScript access (XSS protection)
    secure: process.env.NODE_ENV === "production", // Only send on HTTPS in production
    // sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Prevent CSRF (but allow dev cookies)
    sameSite: null, // Prevent CSRF (but allow dev cookies)
    maxAge: 7 * 24 * 60 * 60 * 1000,         // 7 days in ms
  });

  // Optional: Save token to DB (useful for logout or token tracking)
  await User.findByIdAndUpdate(userId, { token });

  return token;
};

export default createTokenAndSaveCookies;
