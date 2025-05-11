import axios from "axios";
import React, { useEffect, useState } from "react";

function Creator() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get("http://localhost:3005/api/users/admins", {
          withCredentials: true,
        });

        setAdmin(data); // ✅ Directly using the array
      } catch (error) {
        console.error("Failed to fetch admin users", error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Popular Creators</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => (
            <div
              key={element._id}
              className=" rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105 \ duration-300"
            >
              <div className="rounded-full ring-4 ring-indigo-500 ring-offset-4 ring-offset-white">
                <img
                  src={element.photo?.url}
                  alt={element.name}
                  className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-medium text-lg">{element.name}</p>
                <p className="text-gray-500 text-sm capitalize">{element.role}</p>
                <p className="text-gray-400 text-sm">{element.email}</p>
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

export default Creator;
