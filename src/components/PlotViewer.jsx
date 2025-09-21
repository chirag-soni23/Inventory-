"use client"

import { useState } from "react"
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react"

const PlotViewer = ({ imageData }) => {
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!imageData) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No plot data available</p>
      </div>
    )
  }

  // Ensure the image data has the proper data URL format
  const imageUrl = imageData.startsWith("data:") ? imageData : `data:image/png;base64,${imageData}`

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="relative">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={handleZoomIn}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
            disabled={zoom >= 3}
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button onClick={handleReset} className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded">
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
        <button onClick={toggleFullscreen} className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded">
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* Image Container */}
      <div
        className={`relative overflow-auto border border-gray-200 rounded-lg bg-white ${
          isFullscreen ? "fixed inset-4 z-50 bg-white shadow-2xl" : "max-h-96"
        }`}
      >
        {isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-10 p-2 bg-white shadow-lg rounded-lg text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        )}
        <div className="flex items-center justify-center min-h-[300px] p-4">
          <img
            src={imageUrl || "/placeholder.svg?height=400&width=600&query=forecast plot visualization"}
            alt="Forecast Plot"
            className="max-w-none transition-transform duration-200"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center",
            }}
            onError={(e) => {
              console.error("Image load error:", e)
              e.target.src = "/forecast-plot-visualization.jpg"
            }}
          />
        </div>
      </div>

      {/* Image Info */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Use the controls above to zoom and view the plot in fullscreen</p>
      </div>
    </div>
  )
}

export default PlotViewer
