import { AlertTriangle } from "lucide-react"
import Card from "./Card"

const Alerts = ({ warnings }) => {
  if (!warnings || warnings.length === 0) {
    return null
  }

  return (
    <Card title="Forecast Alerts" subtitle="Important warnings and recommendations" icon={AlertTriangle}>
      <div className="space-y-3">
        {warnings.map((warning, index) => (
          <div key={index} className="alert-warning flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{warning}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default Alerts
