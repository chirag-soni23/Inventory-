"use client"

import { Github, ExternalLink, Users, Code, Database, Zap } from "lucide-react"
import Card from "../../src/components/Card"

const About = () => {
  const techStack = [
    {
      category: "Frontend",
      technologies: ["Next.js 15", "React 18", "TypeScript", "Tailwind CSS"],
      icon: Code,
    },
    {
      category: "Data & AI",
      technologies: ["Python", "Machine Learning", "Forecasting Models", "Data Analytics"],
      icon: Database,
    },
    {
      category: "Visualization",
      technologies: ["Recharts", "D3.js", "Interactive Charts", "Real-time Updates"],
      icon: Zap,
    },
  ]

  const teamMembers = [
    {
      name: "AI Development Team",
      role: "Machine Learning Engineers",
      description: "Specialized in inventory forecasting algorithms and predictive analytics",
    },
    {
      name: "Frontend Team",
      role: "React Developers",
      description: "Creating intuitive user interfaces for complex data visualization",
    },
    {
      name: "Data Science Team",
      role: "Data Scientists",
      description: "Analyzing inventory patterns and optimizing forecasting models",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Inventory AI</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced AI-powered inventory forecasting platform designed to optimize stock levels and reduce costs through
          intelligent demand prediction.
        </p>
      </div>

      {/* Project Overview */}
      <Card title="Project Overview" icon={Users}>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            Inventory AI is a comprehensive forecasting solution that leverages machine learning algorithms to predict
            inventory demand with high accuracy. Our platform helps businesses optimize their stock levels, reduce
            carrying costs, and prevent stockouts through intelligent analytics.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Built with modern web technologies and powered by advanced AI models, the platform provides real-time
            insights, interactive visualizations, and actionable recommendations for inventory management.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="https://github.com/inventory-ai"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://docs.inventory-ai.com"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <span>Documentation</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </Card>

      {/* Tech Stack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {techStack.map((stack, index) => {
          const Icon = stack.icon
          return (
            <Card key={index} title={stack.category} icon={Icon}>
              <ul className="space-y-2">
                {stack.technologies.map((tech, techIndex) => (
                  <li key={techIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700">{tech}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )
        })}
      </div>

      {/* Team */}
      <Card title="Development Team" icon={Users}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-primary-600 font-medium mb-2">{member.role}</p>
              <p className="text-sm text-gray-600">{member.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Features */}
      <Card title="Key Features">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Forecasting</h4>
            <p className="text-gray-600 text-sm">
              Advanced machine learning models analyze historical data and market trends to provide accurate demand
              predictions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Real-time Analytics</h4>
            <p className="text-gray-600 text-sm">
              Live dashboard with interactive charts and KPIs to monitor inventory performance and trends.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Smart Alerts</h4>
            <p className="text-gray-600 text-sm">
              Intelligent notifications for low stock levels, reorder points, and potential stockout situations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Data Visualization</h4>
            <p className="text-gray-600 text-sm">
              Interactive charts and plots to visualize forecasting results and inventory trends over time.
            </p>
          </div>
        </div>
      </Card>

      {/* Version Info */}
      <div className="text-center py-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">Inventory AI Platform v1.0.0 • Built with ❤️ using Next.js and AI</p>
        <p className="text-xs text-gray-400 mt-1">
          © 2024 Inventory AI. Empowering businesses with intelligent forecasting.
        </p>
      </div>
    </div>
  )
}

export default About
