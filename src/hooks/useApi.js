"use client"

import { useState, useCallback } from "react"
import { apiUtils } from "../services/api"

/**
 * Custom hook for API calls with loading states and error handling
 * @param {Function} apiFunction - The API function to call
 * @param {Object} options - Configuration options
 * @returns {Object} API state and functions
 */
export const useApi = (apiFunction, options = {}) => {
  const { initialData = null, onSuccess = () => {}, onError = () => {}, retries = 0 } = options

  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(
    async (...args) => {
      setLoading(true)
      setError(null)

      try {
        let result

        if (retries > 0) {
          result = await apiUtils.retryWithBackoff(() => apiFunction(...args), retries)
        } else {
          result = await apiFunction(...args)
        }

        setData(result)
        onSuccess(result)
        return result
      } catch (err) {
        const errorMessage = apiUtils.getErrorMessage(err)
        setError(errorMessage)
        onError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [apiFunction, onSuccess, onError, retries],
  )

  const reset = useCallback(() => {
    setData(initialData)
    setError(null)
    setLoading(false)
  }, [initialData])

  return {
    data,
    loading,
    error,
    execute,
    reset,
  }
}

/**
 * Hook for forecast API calls
 */
export const useForecastApi = (options = {}) => {
  return useApi(
    async (params) => {
      const { forecastAPI } = await import("../services/api")
      return forecastAPI.getForecast(params)
    },
    {
      retries: 2,
      ...options,
    },
  )
}

/**
 * Hook for plot API calls
 */
export const usePlotApi = (options = {}) => {
  return useApi(
    async () => {
      const { forecastAPI } = await import("../services/api")
      return forecastAPI.getPlot()
    },
    {
      retries: 1,
      ...options,
    },
  )
}
