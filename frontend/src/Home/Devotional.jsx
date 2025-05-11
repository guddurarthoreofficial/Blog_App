import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Devotional = () => {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotional");

  return (
    <div className="container mx-auto my-12 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Devotional</h1>
      <p className="text-center mb-8 text-gray-600">
        The concept of gods varies widely across different cultures, religions, and belief systems.
      </p>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {devotionalBlogs && devotionalBlogs.length > 0 ? (
          devotionalBlogs.map((blog, index) => (
            <Link
              to={`/blog/${blog._id}`}
              key={index}
              className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={blog.blogImage.url}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-lg font-semibold">{blog.title}</h2>
                <p className="text-sm">{blog.category}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No Devotional Blogs Found</p>
        )}
      </div>
    </div>
  );
};

export default Devotional;
