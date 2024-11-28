import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");
  const navigate = useNavigate();

  useEffect(() => {
  
    axios
      .get('http://localhost:8080/reviews') 
      .then((response) => {
        setReviews(response.data);
        setFilteredReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  // Handle filtering by rating
  const handleRatingFilter = (e) => {
    const rating = parseInt(e.target.value, 10);
    setSelectedRating(rating);

    const filtered = reviews.filter((review) =>
      rating === 0 ? true : review.rating === rating
    );
    setFilteredReviews(filtered);
  };

  // Handle sorting by date
  const handleSortOrder = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    const sorted = [...filteredReviews].sort((a, b) => {
      const dateA = new Date(a.dateAdded);
      const dateB = new Date(b.dateAdded);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    setFilteredReviews(sorted);
  };

  const handleDelete = (id) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this review?")) {
      axios
        .delete(`http://localhost:8080/reviews/${id}`) // Replace with actual API endpoint
        .then((response) => {
          setReviews(reviews.filter((review) => review.id !== id));
          setFilteredReviews(filteredReviews.filter((review) => review.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting review:', error);
        });
    }
  }

    const handleEdit = (id) => {
      navigate(`/edit-review/${id}`); // Redirect to edit form page
    };


  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between mb-4">
    
        <div>
          <label className="mr-2 text-gray-700 font-semibold">Filter by Rating:</label>
          <select
            value={selectedRating}
            onChange={handleRatingFilter}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="0">All</option>
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="5">5 ⭐</option>
          </select>
        </div>

        {/* Sort by Date */}
        <div>
          <label className="mr-2 text-gray-700 font-semibold">Sort by Date:</label>
          <select
            value={sortOrder}
            onChange={handleSortOrder}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </div>
      </div>

      {/* Reviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800">{review.bookTitle}</h3>
            <h4 className="text-lg text-gray-600">{review.author}</h4>
            <div className="flex items-center mt-2">
              {'⭐'.repeat(review.rating)}
            </div>
            <p className="text-gray-700 mt-4">{review.reviewText}</p>
            <small className="text-gray-500 mt-4 block text-right">
              {new Date(review.dateAdded).toLocaleString()}
            </small>

             {/* Edit and Delete Buttons */}
             <div className="flex justify-between mt-4">
              {/* Edit Button */}
              <button
                onClick={() => handleEdit(review.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit className="inline-block mr-2" /> Edit
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(review.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash className="inline-block mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
