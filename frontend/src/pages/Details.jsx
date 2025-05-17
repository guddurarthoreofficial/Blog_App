import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Details = () => {
  const [blogDetails, setBlogDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3005/api/blogs/single-blogs/${id}`,
          { withCredentials: true }
        );
        setBlogDetails(data);
      } catch (err) {
        toast.error("Failed to load blog.");
      }
    };

    fetchBlog();
  }, [id]);

  if (!blogDetails._id) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500 text-lg">Loading blog details...</p>
      </div>
    );
  }

  const {
    title,
    about,
    adminName,
    adminPhoto,
    blogImage,
    category,
    createdAt,
  } = blogDetails;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10">{title}</h1>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Left Side - Blog Image */}
        <div className="w-full md:w-1/2">
          <img
            src={blogImage?.url}
            alt="Blog Visual"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          {/* Author Info */}
          <div className="flex items-center gap-4">
            <img
              src={adminPhoto}
              alt={adminName}
              className="w-14 h-14 rounded-full object-cover shadow"
            />
            <div>
              <p className="text-base font-semibold text-gray-800">{adminName}</p>
              <p className="text-sm text-gray-500">
                {new Date(createdAt).toLocaleDateString()} •{" "}
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                  {category}
                </span>
              </p>
            </div>
          </div>

          {/* About/Content */}
          <article className="text-gray-700 text-justify leading-relaxed space-y-4">
            {about.split('\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </article>
        </div>
      </div>
    </section>
  );
};

export default Details;
