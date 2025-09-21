import type React from "react"
import { AlertTriangle } from "lucide-react"

interface ErrorMessageProps {
  message: string
  className?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = "" }) => {
  return (
    <div
      className={`flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 ${className}`}
    >
      <AlertTriangle className="h-5 w-5 flex-shrink-0" />
      <span className="text-sm">{message}</span>
    </div>
  )
}

export default ErrorMessage
