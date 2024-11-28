import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditReview = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({
    bookTitle: "",
    author: "",
    rating: 0,
    reviewText: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {

    axios
      .get(`http://localhost:8080/reviews/${id}`)
      .then((response) => {
        setReviewData(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching review:", error);
      });
  }, [id]);

  const validateField = (name, value) => {
    const validationErrors = {};

    if (name === "bookTitle" && !value) {
      validationErrors.bookTitle = "Book title is required";
    }

    if (name === "author" && !value) {
      validationErrors.author = "Author name is required";
    }

    if (name === "rating") {
      if (!value) {
        validationErrors.rating = "Rating is required";
      } else if (value < 1 || value > 5) {
        validationErrors.rating = "Rating must be between 1 and 5";
      }
    }

    if (name === "reviewText" && !value) {
      validationErrors.reviewText = "Review text is required";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    Object.keys(reviewData).forEach((field) =>
      validateField(field, reviewData[field])
    );

    // Check if there are any validation errors
    if (Object.values(errors).some((error) => error)) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill all required fields correctly.",
      });
      return;
    }


    axios
      .put(`http://localhost:8080/reviews/${id}`, reviewData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Review updated successfully!",
        });
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error updating the review:", error);
      });
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 border rounded-md shadow-lg mt-8"
    >
      <h2 className="text-2xl mb-4 text-center font-semibold">
        Edit Review
      </h2>

      <div className="flex-grow">
        {errors.bookTitle && (
          <div className="text-[#d32f2f] text-xs my-1">
            {errors.bookTitle}
          </div>
        )}
        <input
          type="text"
          name="bookTitle"
          placeholder="Book Title"
          value={reviewData.bookTitle}
          onChange={onInputChange}
          onBlur={handleBlur}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-grow">
        {errors.author && (
          <div className="text-[#d32f2f] text-xs my-1">
            {errors.author}
          </div>
        )}
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={reviewData.author}
          onChange={onInputChange}
          onBlur={handleBlur}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-grow">
        {errors.rating && (
          <div className="text-[#d32f2f] text-xs my-1">
            {errors.rating}
          </div>
        )}
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={reviewData.rating}
          onChange={onInputChange}
          onBlur={handleBlur}
          min="1"
          max="5"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-grow">
        {errors.reviewText && (
          <div className="text-[#d32f2f] text-xs my-1">
            {errors.reviewText}
          </div>
        )}
        <textarea
          name="reviewText"
          placeholder="Write your review..."
          value={reviewData.reviewText}
          onChange={onInputChange}
          onBlur={handleBlur}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Save Changes
      </button>

      {/* Back Button */}
      <button
        type="button"
        onClick={handleBack}
        className="w-full bg-gray-500 text-white p-2 mt-4 rounded hover:bg-gray-600"
      >
        Back
      </button>
    </form>
  );
};

export default EditReview;
