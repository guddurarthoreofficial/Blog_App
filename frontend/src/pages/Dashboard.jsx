import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyBlogs from "../dashboard/MyBlogs";
import MyProfile from "../dashboard/MyProfile"
import CreateBlogs from "../dashboard/CreateBlogs";
import UpdateBlog from "../dashboard/UpdateBlog";
import { useState } from "react";

function Dashboard() {
  // const { profile, isAuthenticated } = useAuth();
  // console.log(profile);
  // console.log(isAuthenticated);

  const [component,setComponent] = useState("My Blog")

  return (
    <div>
      <Sidebar component={component} setComponent={setComponent} />
      {component === "My profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlogs />
      ) : component === "Update Blog" ? (
        <UpdateBlog />
      ) : (
        <MyBlogs />
      )}
    </div>
  );
}

export default Dashboard;