// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthProvider";

// const MyProfile = () => {
//   const { token } = useAuth();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     education: "",
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:3005/api/users/my-profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           setUser(res.data.user);
//           setFormData({
//             name: res.data.user.name || "",
//             email: res.data.user.email || "",
//             phone: res.data.user.phone || "",
//             education: res.data.user.education || "",
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching profile", err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) fetchProfile();
//     else setLoading(false);
//   }, [token]);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSave = async () => {
//     try {
//       const res = await axios.put(
//         "http://localhost:3005/api/users/update-profile",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         setUser(res.data.user);
//         setEditMode(false);
//       } else {
//         alert("Failed to update profile");
//       }
//     } catch (err) {
//       console.error("Update failed", err.response?.data || err.message);
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading profile...</div>;
//   if (!user) return <div className="text-center mt-10">No profile found.</div>;

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
//       <div className="bg-white shadow-xl rounded-lg w-full max-w-lg p-6">
//         <div className="flex justify-center">
//           <img
//             className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-500 shadow"
//             src={user.photo?.url}
//             alt={user.name}
//           />
//         </div>
//         <div className="text-center mt-4">
//           {editMode ? (
//             <>
//               <input
//                 className="input input-bordered w-full my-2 p-2 border rounded"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Name"
//               />
//               <input
//                 className="input input-bordered w-full my-2 p-2 border rounded"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//               />
//               <input
//                 className="input input-bordered w-full my-2 p-2 border rounded"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Phone"
//               />
//               <input
//                 className="input input-bordered w-full my-2 p-2 border rounded"
//                 name="education"
//                 value={formData.education}
//                 onChange={handleChange}
//                 placeholder="Education"
//               />
//               <div className="mt-4 flex justify-center gap-4">
//                 <button
//                   onClick={handleSave}
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditMode(false)}
//                   className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
//               <p className="text-gray-600">{user.email}</p>
//               <p className="text-gray-600">{user.phone}</p>
//               <p className="text-gray-600">Education: {user.education}</p>
//               <p className="text-gray-600">
//                 Joined on: {new Date(user.createdAt).toLocaleDateString()}
//               </p>
//               <button
//                 onClick={() => setEditMode(true)}
//                 className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//               >
//                 Edit Profile
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;

//  ================ fixed warning ============

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const MyProfile = () => {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/users/my-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (response.data.success) {
          setUser(response.data.user);
          setFormData(response.data.user);
        } else {
          setError("Failed to fetch profile.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching profile.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
    else setLoading(false);
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put(
        "http://localhost:3005/api/users/update-profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setUser(res.data.user);
        setEditMode(false);
        setError("");
      } else {
        setError(res.data.message || "Failed to update profile.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4">Loading profile...</div>;
  if (!user) return <div className="p-4 text-red-500">No user found.</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="text-center">
        <img
          src={user.photo?.url || "https://ui-avatars.com/api/?name=" + user.name}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300"
        />
        <h2 className="text-xl font-semibold mb-2">
          {editMode ? (
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="border p-1 rounded w-full text-center"
            />
          ) : (
            user.name
          )}
        </h2>
        <p className="text-gray-600 text-sm mb-1">
          Email:{" "}
          {editMode ? (
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="border p-1 rounded w-full"
            />
          ) : (
            user.email
          )}
        </p>
        <p className="text-gray-600 text-sm mb-4">
          Phone:{" "}
          {editMode ? (
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="border p-1 rounded w-full"
            />
          ) : (
            user.phone
          )}
        </p>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex justify-center gap-3">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setFormData(user);
                }}
                className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
