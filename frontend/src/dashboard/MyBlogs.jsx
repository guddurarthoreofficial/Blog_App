import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get("http://localhost:3005/api/blogs/my-blog", {
          withCredentials: true,
        });
        setMyBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        toast.error("Failed to load blogs");
      }
    };

    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/api/blogs/delete/${id}`, {
        withCredentials: true,
      });
      setMyBlogs(myBlogs.filter(blog => blog._id !== id));
      toast.success("Blog deleted successfully");
    } catch (err) {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {myBlogs && myBlogs.length > 0 ? (
          myBlogs.map((element) => (
            <div
              key={element._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={element.blogImage?.url}
                alt={element.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">{element.category}</p>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">{element.title}</h2>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/edit-blog/${element._id}`}
                    className="text-sm px-4 py-1 border border-blue-400 text-blue-500 rounded hover:bg-blue-50"
                  >
                    UPDATE
                  </Link>
                  <button
                    onClick={() => handleDelete(element._id)}
                    className="text-sm px-4 py-1 border border-red-400 text-red-500 rounded hover:bg-red-50"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex h-40 items-center justify-center text-lg font-medium">
            Loading...
          </div>
        )}
      </div>
    </>
  );
};

export default MyBlogs;
