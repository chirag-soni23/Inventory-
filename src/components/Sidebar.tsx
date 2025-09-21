"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, TrendingUp, BarChart3, Info, Package } from "lucide-react"

const Sidebar = () => {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      href: "/forecasts",
      icon: TrendingUp,
      label: "Forecasts",
    },
    {
      href: "/plot",
      icon: BarChart3,
      label: "Plot",
    },
    {
      href: "/about",
      icon: Info,
      label: "About",
    },
  ]

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg border-r border-gray-200">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-600 p-2 rounded-lg">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Inventory AI</h1>
            <p className="text-sm text-gray-500">Forecast Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-primary-50 text-primary-700 border-r-2 border-primary-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500">Powered by AI Forecasting</p>
          <p className="text-xs text-gray-400 mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
