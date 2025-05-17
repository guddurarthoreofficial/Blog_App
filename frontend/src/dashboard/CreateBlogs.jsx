import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const UpdateBlog = () => {
  const [blogImage, setBlogImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { blogId } = useParams(); // blog ID from route

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3005/api/blogs/${blogId}`);
        const { title, category, about, blogImage } = res.data;
        reset({ title, category, about });
        setPreview(blogImage);
      } catch (err) {
        toast.error("Failed to fetch blog data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, reset]);

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
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("about", data.about);
    if (blogImage) {
      formData.append("blogImage", blogImage);
    }

    try {
      const res = await axios.put(
        `http://localhost:3005/api/blogs/update/${blogId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Blog updated successfully", {
        autoClose: 2000,
        onClose: () => navigate("/dashboard"),
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update blog.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Blog</h2>

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
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
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
          />
          {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about.message}</p>}
        </div>

        {/* Blog Image */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Blog Image (optional)</label>
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
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow"
          >
            {isSubmitting ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
