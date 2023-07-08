import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { restaurantsData } from '../data'
import { HiStar } from 'react-icons/hi'

export function RestaurantDetail() {
  const { restaurantId } = useParams()
  const restaurant = restaurantsData.find(
    (restaurant) => restaurant.id === parseInt(restaurantId)
  )

  const [showReviewModal, setShowReviewModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviewerName, setReviewerName] = useState('')
  const [profilePicture, setProfilePicture] = useState('')

  const handleSubmitReview = () => {
    // Generate a profile picture using the DiceBear API
    const username = reviewerName.toLowerCase().replace(/\s+/g, '')
    const profilePictureUrl = `https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${username}`
    setProfilePicture(profilePictureUrl)

    // Create a new review object
    const newReview = {
      rating,
      comment,
      revName: reviewerName,
      pp: profilePictureUrl,
    }

    // Add the new review to the ratings array of the restaurant
    const updatedRatings = [...restaurant.ratings, newReview]
    restaurant.ratings = updatedRatings

    // Reset the form
    setRating(0)
    setComment('')
    setReviewerName('')
    setShowReviewModal(false)
  }

  return (
    <div className="flex flex-col items-center px-4 mt-8">
      <h1 className="mb-4 text-3xl font-bold">Food Ordering App</h1>
      <div className="flex items-center justify-between w-full">
        <Link
          to={'/'}
          className="px-4 py-2 mr-2 text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-600"
        >
          Go Back
        </Link>
        <button
          onClick={() => setShowReviewModal(true)}
          className="px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Add Review
        </button>
      </div>
      <h2 className="mt-2 mb-2 text-2xl font-bold">{restaurant.name}</h2>
      <p className="mb-6 text-gray-500">{restaurant.address}</p>
      <div className="flex items-center mb-6">
        <HiStar className="w-6 h-6 mr-1 text-yellow-500" />
        <p className="text-lg">{restaurant.averageRating}</p>
      </div>
      <h3 className="mb-2 text-xl">Reviews:</h3>
      {restaurant.ratings.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {restaurant.ratings.map((review, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center mb-2">
                <img
                  src={review.pp}
                  alt={review.revName}
                  className="object-cover w-8 h-8 mr-2 rounded-full"
                />
                <p className="text-lg font-medium">{review.revName}</p>
              </div>
              <div className="flex items-center">
                <HiStar className="w-6 h-6 mr-1 text-yellow-500" />
                <p className="text-lg">{review.rating}</p>
              </div>
              <p className="mt-2 text-gray-500">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews available</p>
      )}
      {showReviewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 bg-white rounded-lg">
            <h3 className="mb-4 text-2xl font-bold">Add Your Review</h3>
            <div className="flex flex-col mb-4">
              <label htmlFor="reviewerName">Your Name:</label>
              <input
                id="reviewerName"
                className="p-2 border border-gray-300 rounded"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="rating" className="mr-2">
                Rating:
              </label>
              <select
                id="rating"
                className="p-2 border border-gray-300 rounded"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
              >
                <option value={0}>Select Rating</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                className="p-2 border border-gray-300 rounded"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 mr-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 text-gray-600 transition duration-300 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
