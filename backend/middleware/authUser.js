import { User } from "../models/user.model.js"; 
import jwt from "jsonwebtoken";

// ==========   Authentication Middleware  ================

export const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.jwt;
        console.log("Middleware token = " + token);

        // Check if token exists
        if (!token) {
            return res.status(401).json({ error: "User not Authenticated" });
        }

        // Verify token using secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // ✅ Fixed typo: 'tokken' to 'token'

        // Find user by decoded userId
        const user = await User.findById(decoded.userId);

        // If user not found
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Attach user to request object
        req.user = user;

        // Call next middleware
        next();
    } catch (err) {
        // Handle errors (e.g., invalid token)
        console.log("Error occurring in Authenticated: " + err);
        res.status(401).json({ err: "User is not authenticated" });
    }
};
