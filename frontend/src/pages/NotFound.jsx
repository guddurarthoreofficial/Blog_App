import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-2xl mt-4 font-semibold text-gray-800">Page Not Found</p>
        <p className="text-gray-600 mt-2 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
