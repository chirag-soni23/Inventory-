"use client"
import { AlertCircle, X } from "lucide-react"

const ErrorMessage = ({ message, onClose, className = "" }) => {
  return (
    <div className={`alert-danger flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-5 w-5 text-danger-600" />
        <span className="text-sm font-medium">{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-danger-600 hover:text-danger-800 focus:outline-none">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
