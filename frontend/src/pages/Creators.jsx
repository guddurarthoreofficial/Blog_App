import axios from "axios";
import React, { useEffect, useState } from "react";

function Creators() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get("http://localhost:3005/api/users/admins", {
          withCredentials: true,
        });

        setAdmin(data);
      } catch (error) {
        console.error("Failed to fetch admin users", error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">All Creators</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {admin.length > 0 ? (
          admin.map((element) => (
            <div
              key={element._id}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Background Image - Now using Profile Image as background */}
              <div
                className="h-28 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${element.photo?.url})`, // Set profile image as background
                }}
              ></div>

              {/* Profile Image */}
              <div className="flex justify-center -mt-12">
                <img
                  src={element.photo?.url}
                  alt={element.name}
                  className="w-24 h-24 rounded-full border-4 border-white ring-4 ring-indigo-500 object-cover"
                />
              </div>

              {/* Info */}
              <div className="text-center px-4 pb-6 mt-2">
                <h2 className="text-lg font-semibold mt-2">{element.name}</h2>
                <p className="text-sm text-gray-500 capitalize">{element.role}</p>
                <p className="text-xs text-gray-400 mt-1">{element.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No creators found.</p>
        )}
      </div>
    </div>
  );
}

export default Creators;
