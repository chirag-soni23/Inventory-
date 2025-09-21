import { Github, ExternalLink, Code, Users, Zap, Target, Award, Cpu } from "lucide-react"
import Card from "../components/Card"

const About = () => {
  const techStack = [
    {
      category: "Frontend",
      technologies: [
        { name: "React 18", description: "Modern UI library with hooks" },
        { name: "Vite", description: "Fast build tool and dev server" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework" },
        { name: "React Router v6", description: "Client-side routing" },
        { name: "Recharts", description: "Chart library for React" },
        { name: "Lucide React", description: "Beautiful icon library" },
      ],
    },
    {
      category: "Backend Integration",
      technologies: [
        { name: "Axios", description: "HTTP client for API calls" },
        { name: "AI Forecasting API", description: "Machine learning predictions" },
        { name: "REST API", description: "RESTful service architecture" },
      ],
    },
    {
      category: "Development",
      technologies: [
        { name: "ESLint", description: "Code linting and formatting" },
        { name: "PostCSS", description: "CSS processing tool" },
        { name: "Autoprefixer", description: "CSS vendor prefixing" },
      ],
    },
  ]

  const features = [
    {
      icon: Target,
      title: "AI-Powered Forecasting",
      description: "Advanced machine learning algorithms predict inventory demand with high accuracy",
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Live dashboard with instant updates and interactive visualizations",
    },
    {
      icon: Code,
      title: "Modern Architecture",
      description: "Built with cutting-edge web technologies for optimal performance",
    },
    {
      icon: Users,
      title: "User-Friendly Interface",
      description: "Intuitive design that makes complex data analysis accessible to everyone",
    },
  ]

  const teamRoles = [
    {
      role: "Frontend Developer",
      responsibilities: [
        "React component development",
        "UI/UX implementation",
        "State management",
        "Responsive design",
      ],
    },
    {
      role: "Backend Developer",
      responsibilities: ["API integration", "Data processing", "Server architecture", "Database management"],
    },
    {
      role: "Data Scientist",
      responsibilities: ["ML model development", "Forecasting algorithms", "Data analysis", "Model optimization"],
    },
    {
      role: "UI/UX Designer",
      responsibilities: ["User interface design", "User experience research", "Prototyping", "Design systems"],
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Inventory AI</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          An intelligent inventory forecasting platform that leverages artificial intelligence to optimize stock
          management and predict demand patterns with unprecedented accuracy.
        </p>
      </div>

      {/* Project Overview */}
      <Card title="Project Overview" icon={Award}>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            Inventory AI was developed as part of a hackathon challenge to create innovative solutions for supply chain
            optimization. Our team recognized the critical need for accurate demand forecasting in modern inventory
            management and set out to build a comprehensive platform that combines machine learning with intuitive user
            experience.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The application provides businesses with powerful tools to analyze historical data, predict future demand,
            and make informed decisions about stock levels. By integrating advanced AI algorithms with real-time data
            visualization, we've created a solution that transforms complex forecasting into actionable insights.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our platform supports multiple product categories, regional analysis, and customizable forecasting
            parameters, making it suitable for businesses of all sizes across various industries.
          </p>
        </div>
      </Card>

      {/* Key Features */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-primary-50 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technology Stack</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {techStack.map((stack, index) => (
            <Card key={index} title={stack.category} icon={Cpu}>
              <div className="space-y-3">
                {stack.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="border-l-2 border-primary-200 pl-4">
                    <h4 className="font-semibold text-gray-900">{tech.name}</h4>
                    <p className="text-sm text-gray-600">{tech.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Roles */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Team Roles & Responsibilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamRoles.map((team, index) => (
            <Card key={index} title={team.role} icon={Users}>
              <ul className="space-y-2">
                {team.responsibilities.map((responsibility, respIndex) => (
                  <li key={respIndex} className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* API Information */}
      <Card title="API Integration" icon={Code}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Endpoints</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <code className="text-sm font-mono text-primary-600">POST /forecast</code>
                <p className="text-sm text-gray-600 mt-1">Generate demand forecasts with custom parameters</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <code className="text-sm font-mono text-primary-600">GET /plot</code>
                <p className="text-sm text-gray-600 mt-1">Retrieve visualization plots as base64 images</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Base URL</h3>
            <div className="bg-gray-50 p-3 rounded-lg">
              <code className="text-sm font-mono text-gray-800 break-all">https://model-ai-inventory.onrender.com</code>
            </div>
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Response Format</h4>
              <p className="text-sm text-gray-600">
                All API responses return JSON data with forecast metrics, demand predictions, and warning alerts for
                comprehensive inventory analysis.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Project Links */}
      <Card title="Project Resources" icon={ExternalLink}>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>View on GitHub</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Live Demo</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors"
          >
            <Award className="h-4 w-4" />
            <span>Hackathon Submission</span>
          </a>
        </div>
      </Card>

      {/* Footer */}
      <div className="text-center py-8 border-t border-gray-200">
        <p className="text-gray-600">Built with ❤️ for the AI Inventory Management Hackathon</p>
        <p className="text-sm text-gray-500 mt-2">© 2024 Inventory AI Team. All rights reserved.</p>
      </div>
    </div>
  )
}

export default About
