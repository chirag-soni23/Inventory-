"use client"

import { useState } from "react"
import { Download, RefreshCw, BarChart3, ImageIcon } from "lucide-react"
import Card from "../components/Card"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"
import PlotViewer from "../components/PlotViewer"
import { forecastAPI } from "../services/api"

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

  // useEffect(() => {
  //   fetchPlot()
  // }, [])

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

      {/* Plot Display */}
      <Card title="Generated Plot" subtitle="AI-generated visualization" icon={BarChart3}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <LoadingSpinner size="lg" />
            <p className="text-gray-600 mt-4">Generating plot visualization...</p>
          </div>
        ) : plotData?.plot_data?.image ? (
          <PlotViewer imageData={plotData.plot_data.image} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <ImageIcon className="h-16 w-16 mb-4" />
            <p className="text-lg font-medium">No plot data available</p>
            <p className="text-sm">Click "Refresh Plot" to generate a new visualization</p>
          </div>
        )}
      </Card>

      {/* Plot Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Plot Details" icon={ImageIcon}>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Format:</span>
              <span className="font-medium">PNG</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Generated:</span>
              <span className="font-medium">{new Date().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Source:</span>
              <span className="font-medium">AI Forecasting API</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`font-medium ${plotData?.plot_data?.image ? "text-success-600" : "text-gray-500"}`}>
                {plotData?.plot_data?.image ? "Available" : "Not Generated"}
              </span>
            </div>
          </div>
        </Card>

        <Card title="Usage Instructions" icon={BarChart3}>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="font-medium text-primary-600">1.</span>
              <span>Click "Refresh Plot" to generate a new visualization from the API</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-medium text-primary-600">2.</span>
              <span>View the generated plot in the display area above</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-medium text-primary-600">3.</span>
              <span>Use "Download Plot" to save the image to your device</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-medium text-primary-600">4.</span>
              <span>The plot updates automatically with the latest forecast data</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Plot
