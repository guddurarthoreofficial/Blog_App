import React from 'react'

const MyBlogs = () => {
  const blogData = [
    {
      title: "The Future of JavaScript",
      image: "https://source.unsplash.com/400x300/?javascript,code",
      description: "Explore the upcoming features and trends shaping JavaScript in the next decade.",
    },
    {
      title: "Mastering React Hooks",
      image: "https://source.unsplash.com/400x300/?reactjs,programming",
      description: "Understand useState, useEffect, and custom hooks for building modern apps.",
    },
    {
      title: "CSS Tricks for Developers",
      image: "https://source.unsplash.com/400x300/?css,design",
      description: "Level up your UI design with these handy and lesser-known CSS techniques.",
    },
    {
      title: "Top 10 VS Code Extensions",
      image: "https://source.unsplash.com/400x300/?vscode,editor",
      description: "Boost productivity and code faster with these must-have VS Code extensions.",
    },
    {
      title: "Understanding Asynchronous JS",
      image: "https://source.unsplash.com/400x300/?async,javascript",
      description: "Callbacks, Promises, and Async/Await explained in simple terms.",
    },
    {
      title: "Node.js for Beginners",
      image: "https://source.unsplash.com/400x300/?nodejs,server",
      description: "Start building your first backend with Node.js and Express.",
    },
    {
      title: "UI/UX Design Principles",
      image: "https://source.unsplash.com/400x300/?ux,ui",
      description: "Design interfaces that are intuitive, elegant, and user-friendly.",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {blogData.map((blog, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
            <p className="text-gray-600 text-sm">{blog.description}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>

  )
}

export default MyBlogs