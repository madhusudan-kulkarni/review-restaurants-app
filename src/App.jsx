import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CuisineList } from './components/CuisineList'
import { RestaurantDetail } from './components/RestaurantDetail'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CuisineList />} />

        <Route
          path="/restaurant/:restaurantId"
          element={<RestaurantDetail />}
        />
      </Routes>
    </Router>
  )
}
