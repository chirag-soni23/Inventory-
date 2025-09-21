import type React from "react"

interface CardProps {
  title?: string
  subtitle?: string
  icon?: React.ComponentType<{ className?: string }>
  children?: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ title, subtitle, icon: Icon, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      {(title || subtitle || Icon) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
          {Icon && (
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icon className="h-5 w-5 text-blue-600" />
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

export default Card
