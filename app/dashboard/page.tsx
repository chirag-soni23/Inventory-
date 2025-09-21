"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Package,
  Shield,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Activity,
} from "lucide-react"
import Card from "../../src/components/Card"
import LoadingSpinner from "../../src/components/LoadingSpinner"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState(null)

  // Mock data for demonstration
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return

    const fetchDashboardData = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 100))

      setDashboardData({
        kpis: {
          reorderPoint: 150,
          safetyStock: 75,
          minLevel: 50,
          maxLevel: 300,
        },
        alerts: [
          {
            id: 1,
            type: "danger",
            product: "P017",
            message: "Stock level critically low (12 units remaining)",
            timestamp: "2 hours ago",
          },
          {
            id: 2,
            type: "warning",
            product: "P025",
            message: "Approaching reorder point (158 units remaining)",
            timestamp: "4 hours ago",
          },
          {
            id: 3,
            type: "success",
            product: "P031",
            message: "Stock levels optimal (245 units)",
            timestamp: "6 hours ago",
          },
        ],
        forecastPreview: [
          { date: "2024-01-01", demand: 120 },
          { date: "2024-01-02", demand: 135 },
          { date: "2024-01-03", demand: 128 },
          { date: "2024-01-04", demand: 142 },
          { date: "2024-01-05", demand: 155 },
          { date: "2024-01-06", demand: 148 },
          { date: "2024-01-07", demand: 162 },
        ],
      })
      setLoading(false)
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const kpiCards = [
    {
      title: "Reorder Point",
      value: dashboardData.kpis.reorderPoint,
      icon: Package,
      color: "primary",
      description: "Units to trigger reorder",
    },
    {
      title: "Safety Stock",
      value: dashboardData.kpis.safetyStock,
      icon: Shield,
      color: "success",
      description: "Buffer stock level",
    },
    {
      title: "Min Level",
      value: dashboardData.kpis.minLevel,
      icon: TrendingDown,
      color: "warning",
      description: "Minimum stock threshold",
    },
    {
      title: "Max Level",
      value: dashboardData.kpis.maxLevel,
      icon: TrendingUp,
      color: "primary",
      description: "Maximum stock capacity",
    },
  ]

  const getAlertIcon = (type) => {
    switch (type) {
      case "danger":
        return AlertTriangle
      case "warning":
        return AlertTriangle
      case "success":
        return CheckCircle
      default:
        return AlertTriangle
    }
  }

  const getAlertClass = (type) => {
    switch (type) {
      case "danger":
        return "alert-danger"
      case "warning":
        return "alert-warning"
      case "success":
        return "alert-success"
      default:
        return "alert-warning"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your inventory forecasting metrics</p>
        </div>
        <Link href="/forecasts" className="btn-primary flex items-center space-x-2">
          <span>New Forecast</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
                </div>
                <div className={`p-3 rounded-full bg-${kpi.color === "primary" ? "blue" : kpi.color}-50`}>
                  <Icon className={`h-6 w-6 text-${kpi.color === "primary" ? "blue" : kpi.color}-600`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Alerts */}
        <Card title="Latest Alerts" subtitle="Recent inventory notifications" icon={AlertTriangle}>
          <div className="space-y-3">
            {dashboardData.alerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.type)
              return (
                <div key={alert.id} className={`${getAlertClass(alert.type)} flex items-start space-x-3`}>
                  <AlertIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Product {alert.product}</p>
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs opacity-75 mt-1">{alert.timestamp}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              href="/forecasts"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
            >
              <span>View all alerts</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </Card>

        {/* Forecast Preview */}
        <Card title="Forecast Preview" subtitle="7-day demand forecast" icon={Activity}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.forecastPreview}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  }
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value) => [value, "Demand"]}
                />
                <Line
                  type="monotone"
                  dataKey="demand"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              href="/forecasts"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
            >
              <span>Create detailed forecast</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className="text-2xl font-bold text-gray-900">24</div>
          <div className="text-sm text-gray-600 mt-1">Active Products</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-green-600">18</div>
          <div className="text-sm text-gray-600 mt-1">Optimal Stock</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-orange-600">6</div>
          <div className="text-sm text-gray-600 mt-1">Need Attention</div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
