"use client"

import { useState } from "react"
import { Upload, Download, TrendingUp, BarChart3 } from "lucide-react"
import Card from "../../src/components/Card"
import LoadingSpinner from "../../src/components/LoadingSpinner"
import ErrorMessage from "../../src/components/ErrorMessage"
import { forecastAPI } from "../../src/services/api"

const Forecasts = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)

  const [formData, setFormData] = useState({
    product_id: "P017",
    days: 7,
    category: "A",
    region: "North",
    min_rating: 4,
    max_price: 500,
    min_discount: 5,
  })

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await forecastAPI.getForecast(formData)
      setForecastData(response)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch forecast data. Please try again.")
      console.error("Forecast API Error:", err)

      // Mock data for demonstration when API fails
      setForecastData({
        "Reorder Point": 150,
        "Safety Stock": 75,
        "Minimum Level": 50,
        "Maximum Level": 300,
        Forecast: [
          { date: "2024-01-01", demand: 120 },
          { date: "2024-01-02", demand: 135 },
          { date: "2024-01-03", demand: 128 },
          { date: "2024-01-04", demand: 142 },
          { date: "2024-01-05", demand: 155 },
          { date: "2024-01-06", demand: 148 },
          { date: "2024-01-07", demand: 162 },
        ],
        Warnings: ["Stock level approaching minimum threshold", "Consider increasing safety stock for peak season"],
      })
    } finally {
      setLoading(false)
    }
  }

  const downloadForecast = () => {
    if (!forecastData) return

    const dataStr = JSON.stringify(forecastData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `forecast_${formData.product_id}_${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Forecasts</h1>
          <p className="text-gray-600 mt-1">Generate AI-powered inventory forecasts</p>
        </div>
        {forecastData && (
          <button onClick={downloadForecast} className="btn-secondary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download Forecast</span>
          </button>
        )}
      </div>

      {/* Forecast Form */}
      <Card title="Forecast Parameters" subtitle="Configure your forecast settings" icon={TrendingUp}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product ID */}
            <div>
              <label htmlFor="product_id" className="block text-sm font-medium text-gray-700 mb-2">
                Product ID
              </label>
              <input
                type="text"
                id="product_id"
                name="product_id"
                value={formData.product_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., P017"
              />
            </div>

            {/* Days */}
            <div>
              <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-2">
                Forecast Days: {formData.days}
              </label>
              <input
                type="range"
                id="days"
                name="days"
                min="1"
                max="30"
                value={formData.days}
                onChange={handleInputChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>30</span>
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="A">Category A</option>
                <option value="B">Category B</option>
                <option value="C">Category C</option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>

            {/* Min Rating */}
            <div>
              <label htmlFor="min_rating" className="block text-sm font-medium text-gray-700 mb-2">
                Min Rating: {formData.min_rating}
              </label>
              <input
                type="range"
                id="min_rating"
                name="min_rating"
                min="1"
                max="5"
                step="0.1"
                value={formData.min_rating}
                onChange={handleInputChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>5</span>
              </div>
            </div>

            {/* Max Price */}
            <div>
              <label htmlFor="max_price" className="block text-sm font-medium text-gray-700 mb-2">
                Max Price ($)
              </label>
              <input
                type="number"
                id="max_price"
                name="max_price"
                value={formData.max_price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Min Discount */}
            <div>
              <label htmlFor="min_discount" className="block text-sm font-medium text-gray-700 mb-2">
                Min Discount (%): {formData.min_discount}
              </label>
              <input
                type="range"
                id="min_discount"
                name="min_discount"
                min="0"
                max="50"
                value={formData.min_discount}
                onChange={handleInputChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-primary-500">
                  <Upload className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-600">Upload JPG/PNG</span>
                  <input
                    type="file"
                    id="image"
                    accept="image/jpeg,image/png"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              {uploadedImage && (
                <div className="mt-2">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Product preview"
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Generating Forecast...</span>
                </>
              ) : (
                <>
                  <BarChart3 className="h-4 w-4" />
                  <span>Get Forecast</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Card>

      {/* Error Message */}
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
    </div>
  )
}

export default Forecasts
