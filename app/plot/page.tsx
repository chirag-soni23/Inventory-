"use client"

import { useState } from "react"
import { Download, RefreshCw } from "lucide-react"
import ErrorMessage from "../../src/components/ErrorMessage"
import { forecastAPI } from "../../src/services/api"

const Plot = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [plotData, setPlotData] = useState(null)

  const fetchPlot = async () => {
    if (typeof window === "undefined") return

    setLoading(true)
    setError(null)

    try {
      const response = await forecastAPI.getPlot()
      setPlotData(response)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch plot data. Please try again.")
      console.error("Plot API Error:", err)

      // Mock base64 image data for demonstration when API fails
      setPlotData({
        plot_data: {
          image:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        },
      })
    } finally {
      setLoading(false)
    }
  }

  const downloadPlot = () => {
    if (!plotData?.plot_data?.image) return

    try {
      // Extract base64 data
      const base64Data = plotData.plot_data.image.split(",")[1] || plotData.plot_data.image

      // Convert base64 to blob
      const byteCharacters = atob(base64Data)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: "image/png" })

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `forecast_plot_${new Date().toISOString().split("T")[0]}.png`
      link.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Download error:", err)
      setError("Failed to download plot. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Plot Visualization</h1>
          <p className="text-gray-600 mt-1">Advanced plotting and data visualization</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchPlot}
            disabled={loading}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Plot</span>
          </button>
          {plotData?.plot_data?.image && (
            <button onClick={downloadPlot} className="btn-primary flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download Plot</span>
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
    </div>
  )
}

export default Plot
