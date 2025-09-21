// API Configuration
export const API_CONFIG = {
  BASE_URL: "https://model-ai-inventory.onrender.com",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
}

// Form Configuration
export const FORM_DEFAULTS = {
  product_id: "P017",
  days: 7,
  category: "A",
  region: "North",
  min_rating: 4,
  max_price: 500,
  min_discount: 5,
}

export const FORM_LIMITS = {
  days: { min: 1, max: 30 },
  min_rating: { min: 1, max: 5, step: 0.1 },
  max_price: { min: 0, max: 10000 },
  min_discount: { min: 0, max: 50 },
}

export const FORM_OPTIONS = {
  categories: ["A", "B", "C"],
  regions: ["North", "South", "East", "West"],
}

// Chart Configuration
export const CHART_CONFIG = {
  colors: {
    primary: "#3b82f6",
    secondary: "#f59e0b",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
  },
  grid: {
    strokeDasharray: "3 3",
    stroke: "#f0f0f0",
  },
}

// Status Thresholds
export const STOCK_THRESHOLDS = {
  CRITICAL: 0.5, // Below 50% of reorder point
  LOW: 0.8, // Below 80% of reorder point
  NORMAL: 1.0, // Above reorder point
}

// File Upload Configuration
export const UPLOAD_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ["image/jpeg", "image/png"],
  allowedExtensions: [".jpg", ".jpeg", ".png"],
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: "Unable to connect to the server. Please check your internet connection.",
  SERVER: "Server is temporarily unavailable. Please try again later.",
  TIMEOUT: "Request timed out. The server may be busy, please try again.",
  VALIDATION: "Please check your input and try again.",
  GENERIC: "An unexpected error occurred. Please try again.",
  FILE_SIZE: "File size must be less than 5MB.",
  FILE_TYPE: "Only JPG and PNG files are allowed.",
}

// Success Messages
export const SUCCESS_MESSAGES = {
  FORECAST_GENERATED: "Forecast generated successfully!",
  PLOT_DOWNLOADED: "Plot downloaded successfully!",
  DATA_EXPORTED: "Data exported successfully!",
}
