import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";
import { response } from "express";

// ========== Create Blog ==============
export const createBlog = async (req, res) => {
  try {
    // Validate blog image
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Image is required" });
    }

    const { blogImage } = req.files;

    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg and png are allowed",
      });
    }

    // Validate fields
    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res.status(400).json({
        message: "title, category & about are required fields",
      });
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo;
    const createdBy = req?.user?._id;

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
      return res.status(500).json({ message: "Photo upload failed" });
    }

    // Construct blog data
    const blogData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    };

    // Save to DB
    const blog = await Blog.create(blogData);

    // Send response
    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

// ========== Delete Blog ==============
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog first
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete image from Cloudinary if it exists
    const publicId = blog.blogImage?.public_id;
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    // Delete the blog from the database
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ========== Get All Blog ==============
export const getAllBlogs = async (req, res) => {
  try {
    // Fetch all blog documents from the database
    const allBlogs = await Blog.find();
    res.status(200).json(allBlogs);
  } catch (error) {
    // Handle any errors during fetch
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

// ========== Get Single Blog ==============
export const getSingleBlogs = async (req, res) => {
  try {
    // Extract blog ID from request parameters
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog id " });
    }

    // Find blog by ID in the database
    const blog = await Blog.findById(id);

    // If blog is not found, return 404
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // If blog is found, return it with 200 status
    res.status(200).json(blog);
  } catch (error) {
    // Catch and return any server errors
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

// ========== My Blogs ==============
export const getMyBlogs = async (req, res) => {
  try {
    // Get the user ID from the authenticated user (assuming middleware sets req.user)
    const createdBy = req.user._id;

    // Find all blogs created by this user
    const myBlogs = await Blog.find({ createdBy });

    // Send the blogs in response
    res.status(200).json(myBlogs);
  } catch (error) {
    console.error("Error fetching user's blogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




// ========== Update Blog ==========
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    // Attempt to update the blog by ID with the new data from req.body
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });

    // If blog with given ID was not found
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Send the updated blog as response
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

