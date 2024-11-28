import React from "react";
import { Link } from "react-router-dom";
import ReviewList from "./ReviewList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation bar */}
      <nav className="bg-blue-500 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold">
            LitLens
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mx-auto p-4">
        <ReviewList />

        {/* Button to add a new review */}
        <div className="mt-6 flex justify-center">
          <Link
            to="/add-review"
            className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600 transition"
          >
            Add New Review
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
