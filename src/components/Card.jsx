const Card = ({ children, className = "", title, subtitle, icon: Icon, ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {(title || subtitle || Icon) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="p-2 bg-primary-50 rounded-lg">
                <Icon className="h-5 w-5 text-primary-600" />
              </div>
            )}
            <div>
              {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export default Card
