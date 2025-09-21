"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Package } from "lucide-react"
import Card from "../components/Card"
import LoadingSpinner from "../components/LoadingSpinner"
import ForecastChart from "../components/ForecastChart"
import KPISection from "../components/KPISection"
import Alerts from "../components/Alerts"

const ProductForecast = () => {
  const { productId } = useParams()
  const [loading, setLoading] = useState(true)
  const [forecastData, setForecastData] = useState(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const fetchProductForecast = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Mock data for demonstration
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
      setLoading(false)
    }

    fetchProductForecast()
  }, [productId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/forecasts" className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product {productId}</h1>
          <p className="text-gray-600 mt-1">Detailed forecast analysis</p>
        </div>
      </div>

      {/* Product Info */}
      <Card title="Product Details" icon={Package}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Product ID</p>
            <p className="font-semibold">{productId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Category</p>
            <p className="font-semibold">A</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Region</p>
            <p className="font-semibold">North</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Updated</p>
            <p className="font-semibold">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </Card>

      {/* KPIs */}
      <KPISection data={forecastData} />

      {/* Charts */}
      <ForecastChart data={forecastData.Forecast} />

      {/* Alerts */}
      {forecastData.Warnings && forecastData.Warnings.length > 0 && <Alerts warnings={forecastData.Warnings} />}
    </div>
  )
}

export default ProductForecast
