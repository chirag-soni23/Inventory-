import { Package, Shield, TrendingDown, TrendingUp } from "lucide-react"
import Card from "./Card"

const KPISection = ({ data }) => {
  const kpis = [
    {
      title: "Reorder Point",
      value: data["Reorder Point"],
      icon: Package,
      color: "primary",
      description: "Trigger level for new orders",
    },
    {
      title: "Safety Stock",
      value: data["Safety Stock"],
      icon: Shield,
      color: "success",
      description: "Buffer stock level",
    },
    {
      title: "Minimum Level",
      value: data["Minimum Level"],
      icon: TrendingDown,
      color: "warning",
      description: "Critical stock threshold",
    },
    {
      title: "Maximum Level",
      value: data["Maximum Level"],
      icon: TrendingUp,
      color: "primary",
      description: "Maximum stock capacity",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        return (
          <Card key={index} className="text-center">
            <div className="flex flex-col items-center">
              <div className={`p-3 rounded-full bg-${kpi.color}-50 mb-4`}>
                <Icon className={`h-6 w-6 text-${kpi.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{kpi.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{kpi.value}</p>
              <p className="text-sm text-gray-600">{kpi.description}</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default KPISection
