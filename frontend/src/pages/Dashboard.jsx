import { useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import MyBlogs from "../dashboard/MyBlogs";
import MyProfile from "../dashboard/MyProfile";
import CreateBlogs from "../dashboard/CreateBlogs";
import UpdateBlog from "../dashboard/UpdateBlog";

function Dashboard() {
  const [component, setComponent] = useState("My Blog");

  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Sidebar component={component} setComponent={setComponent} />

      {/* Main content area on the right */}
      <div className="flex-1 p-4 overflow-y-auto">
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
    </div>
  );
}

export default Dashboard;
