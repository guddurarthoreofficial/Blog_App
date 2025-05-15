import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"; // ✅ Use hook

const CreateBlogs = () => {
  const [blogImage, setBlogImage] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth(); // ✅ Get token from context

  // console.log(token);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBlogImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    if (!blogImage) {
      toast.warning("Please upload a blog image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("about", data.about);
    formData.append("blogImage", blogImage);

    try {
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }

      const res = await axios.post(
        "http://localhost:3005/api/blogs/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message || "Blog created successfully!", {
        autoClose: 2000,
        onClose: () => navigate("/dashboard"),
      });

      reset();
      setBlogImage(null);
      setPreview("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create blog.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Blog</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "Min 3 characters" },
            })}
            placeholder="Enter Your Blogs Title "
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2"
            {...register("category", {
              required: "Category is required",
            })}
            placeholder="Enter Blog category"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* About */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">About</label>
          <textarea
            rows="4"
            className="w-full border border-gray-300 rounded px-4 py-2"
            {...register("about", {
              required: "About is required",
              minLength: { value: 10, message: "Minimum 10 characters" },
            })}
            placeholder="God devotional won’t see your activity..."
          />
          {errors.about && (
            <p className="text-red-500 text-sm mt-1">{errors.about.message}</p>
          )}
        </div>

        {/* Blog Image */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Blog Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-gray-50 hover:file:bg-gray-100"
          />
        </div>

        {/* Preview */}
        {preview && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded border border-gray-200"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
          >
            {isSubmitting ? "Submitting..." : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogs;
