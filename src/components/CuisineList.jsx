import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { cuisineData, restaurantsData } from '../data'

export function CuisineList() {
  const [selectedCuisine, setSelectedCuisine] = useState(null)

  const handleCuisineClick = (cuisine) => {
    setSelectedCuisine(cuisine)
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="mb-4 text-3xl font-bold">Food Ordering App</h1>
      <h2 className="mb-4 text-xl">Select Your Cuisine:</h2>
      <div className="flex mb-4 space-x-4">
        {cuisineData.map((cuisine) => (
          <button
            key={cuisine.id}
            onClick={() => handleCuisineClick(cuisine)}
            className={`py-2 px-4 ${
              selectedCuisine && selectedCuisine.id === cuisine.id
                ? 'bg-red-600 text-white'
                : 'bg-red-500 text-white'
            } rounded-lg hover:bg-red-600 transition duration-300`}
          >
            {cuisine.name}
          </button>
        ))}
      </div>

      {selectedCuisine && (
        <div>
          {restaurantsData
            .filter(
              (restaurant) => restaurant.cuisine_id === selectedCuisine.id
            )
            .map((restaurant) => (
              <div key={restaurant.id} className="mb-8">
                <h3 className="m-4 text-3xl font-bold">{restaurant.name}</h3>
                <div className="grid grid-cols-2 gap-8">
                  {restaurant.menu.map((dish, index) => (
                    <Link key={index} to={`/restaurant/${restaurant.id}`}>
                      <div className="flex flex-col items-center p-4 transition duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
                        <img
                          src={dish.imgSrc}
                          alt={dish.name}
                          className="object-cover w-full h-48 mb-2"
                        />
                        <p className="text-lg">{dish.name}</p>
                        <p className="text-gray-500">{`Price: $${dish.price}`}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
