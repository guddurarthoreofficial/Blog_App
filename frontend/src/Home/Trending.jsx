import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Trending = () => {
  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-2xl font-semibold mb-6">Trending</h1>
      {blogs && blogs.length > 0 ? (
        <Carousel
          responsive={responsive}
          itemClass="px-2"
        >
          {blogs.map((element) => (
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="group relative">
                <img
                  src={element.blogImage.url}
                  alt=""
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-all duration-300 rounded-t-2xl"></div>
                <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-400 transition-colors duration-300">
                  {element.title}
                </h1>
              </div>
              <div className="p-5 flex items-center bg-white rounded-b-2xl">
                <img
                  src={element.adminPhoto}
                  alt=""
                  className="w-12 h-12 rounded-full border-2 border-yellow-400"
                />
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-800">
                    {element.adminName}
                  </p>
                  <p className="text-xs text-gray-400">New</p>
                </div>
              </div>
            </Link>

          ))}
        </Carousel>
      ) : (
        <div className="flex h-40 items-center justify-center">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Trending;
