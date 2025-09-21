import axios from "axios"

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://model-ai-inventory.onrender.com"
const API_TIMEOUT = process.env.NEXT_PUBLIC_API_TIMEOUT || 30000

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Request interceptor for logging and authentication
api.interceptors.request.use(
  (config) => {
    // Log API requests in development
    if (process.env.NODE_ENV === "development") {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        data: config.data,
        params: config.params,
      })
    }

    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now(),
    }

    return config
  },
  (error) => {
    console.error("❌ API Request Error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor for error handling and logging
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === "development") {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      })
    }
    return response
  },
  (error) => {
    // Enhanced error logging
    console.error("❌ API Response Error:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    })

    // Transform error for better handling
    const enhancedError = {
      ...error,
      isNetworkError: !error.response,
      isServerError: error.response?.status >= 500,
      isClientError: error.response?.status >= 400 && error.response?.status < 500,
      isTimeout: error.code === "ECONNABORTED",
    }

    return Promise.reject(enhancedError)
  },
)

// API Service Functions
export const forecastAPI = {
  /**
   * Get forecast data from the API
   * @param {Object} params - Forecast parameters
   * @param {string} params.product_id - Product identifier
   * @param {number} params.days - Number of days to forecast
   * @param {string} params.category - Product category (A, B, C)
   * @param {string} params.region - Geographic region
   * @param {number} params.min_rating - Minimum rating filter
   * @param {number} params.max_price - Maximum price filter
   * @param {number} params.min_discount - Minimum discount filter
   * @returns {Promise<Object>} Forecast data
   */
  getForecast: async (params) => {
    try {
      // Validate required parameters
      if (!params.product_id) {
        throw new Error("Product ID is required")
      }

      // Clean and validate parameters
      const cleanParams = {
        product_id: String(params.product_id).trim(),
        days: Math.max(1, Math.min(30, Number(params.days) || 7)),
        category: ["A", "B", "C"].includes(params.category) ? params.category : "A",
        region: ["North", "South", "East", "West"].includes(params.region) ? params.region : "North",
        min_rating: Math.max(1, Math.min(5, Number(params.min_rating) || 4)),
        max_price: Math.max(0, Number(params.max_price) || 500),
        min_discount: Math.max(0, Math.min(50, Number(params.min_discount) || 5)),
      }

      const response = await api.post("/forecast", cleanParams)

      // Validate response structure
      if (!response.data) {
        throw new Error("Invalid response format")
      }

      return response.data
    } catch (error) {
      // Re-throw with additional context
      throw new Error(error.response?.data?.message || error.message || "Failed to fetch forecast data")
    }
  },

  /**
   * Get plot visualization from the API
   * @returns {Promise<Object>} Plot data with base64 image
   */
  getPlot: async () => {
    try {
      const response = await api.get("/plot")

      // Validate response structure
      if (!response.data) {
        throw new Error("Invalid response format")
      }

      return response.data
    } catch (error) {
      // Re-throw with additional context
      throw new Error(error.response?.data?.message || error.message || "Failed to fetch plot data")
    }
  },

  /**
   * Health check endpoint to verify API connectivity
   * @returns {Promise<boolean>} API health status
   */
  healthCheck: async () => {
    try {
      // Try a simple request to check if API is responsive
      const response = await api.get("/health", { timeout: 5000 })
      return response.status === 200
    } catch (error) {
      console.warn("API health check failed:", error.message)
      return false
    }
  },
}

// Utility functions for API integration
export const apiUtils = {
  /**
   * Check if error is a network connectivity issue
   * @param {Error} error - The error object
   * @returns {boolean} True if network error
   */
  isNetworkError: (error) => {
    return error.isNetworkError || error.code === "NETWORK_ERROR"
  },

  /**
   * Check if error is a server error (5xx)
   * @param {Error} error - The error object
   * @returns {boolean} True if server error
   */
  isServerError: (error) => {
    return error.isServerError
  },

  /**
   * Check if error is a client error (4xx)
   * @param {Error} error - The error object
   * @returns {boolean} True if client error
   */
  isClientError: (error) => {
    return error.isClientError
  },

  /**
   * Get user-friendly error message
   * @param {Error} error - The error object
   * @returns {string} User-friendly error message
   */
  getErrorMessage: (error) => {
    if (apiUtils.isNetworkError(error)) {
      return "Unable to connect to the server. Please check your internet connection."
    }

    if (apiUtils.isServerError(error)) {
      return "Server is temporarily unavailable. Please try again later."
    }

    if (error.isTimeout) {
      return "Request timed out. The server may be busy, please try again."
    }

    return error.message || "An unexpected error occurred. Please try again."
  },

  /**
   * Retry function with exponential backoff
   * @param {Function} fn - Function to retry
   * @param {number} maxRetries - Maximum number of retries
   * @param {number} baseDelay - Base delay in milliseconds
   * @returns {Promise} Result of the function
   */
  retryWithBackoff: async (fn, maxRetries = 3, baseDelay = 1000) => {
    let lastError

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error

        // Don't retry client errors (4xx)
        if (apiUtils.isClientError(error)) {
          throw error
        }

        // Don't retry on last attempt
        if (attempt === maxRetries) {
          break
        }

        // Calculate delay with exponential backoff
        const delay = baseDelay * Math.pow(2, attempt)
        console.log(`Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`)

        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }

    throw lastError
  },
}

// Export the configured axios instance for direct use if needed
export default api
