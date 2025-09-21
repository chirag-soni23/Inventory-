import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import Card from "./Card"
import { TrendingUp, BarChart3 } from "lucide-react"

const ForecastChart = ({ data }) => {
  if (!data || data.length === 0) {
    return null
  }

  // Calculate moving average
  const dataWithMovingAvg = data.map((item, index) => {
    const windowSize = Math.min(3, index + 1)
    const start = Math.max(0, index - windowSize + 1)
    const slice = data.slice(start, index + 1)
    const movingAvg = slice.reduce((sum, d) => sum + d.demand, 0) / slice.length

    return {
      ...item,
      movingAvg: Math.round(movingAvg),
    }
  })

  // Create histogram data
  const demands = data.map((d) => d.demand)
  const min = Math.min(...demands)
  const max = Math.max(...demands)
  const binSize = Math.ceil((max - min) / 5)
  const bins = []

  for (let i = 0; i < 5; i++) {
    const binStart = min + i * binSize
    const binEnd = binStart + binSize
    const count = demands.filter((d) => d >= binStart && d < binEnd).length
    bins.push({
      range: `${binStart}-${binEnd}`,
      count,
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart */}
      <Card title="Demand Forecast" subtitle="Daily demand with moving average" icon={TrendingUp}>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataWithMovingAvg}>
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
                formatter={(value, name) => [value, name === "demand" ? "Demand" : "Moving Avg"]}
              />
              <Line
                type="monotone"
                dataKey="demand"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                name="demand"
              />
              <Line
                type="monotone"
                dataKey="movingAvg"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#f59e0b", strokeWidth: 2, r: 3 }}
                name="movingAvg"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Histogram */}
      <Card title="Demand Distribution" subtitle="Frequency of demand ranges" icon={BarChart3}>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bins}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => [value, "Frequency"]} />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

export default ForecastChart
