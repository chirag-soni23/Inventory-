# Inventory Forecast Dashboard

A modern React-based inventory forecasting application built with Vite, Tailwind CSS, and React Router v6.

## Features

- **Dashboard**: Overview of key inventory metrics and alerts
- **Forecasts**: Interactive forecasting with filters and visualizations
- **Plot Visualization**: Advanced plotting capabilities with downloadable charts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time API Integration**: Connected to AI-powered inventory forecasting service

## Tech Stack

- **Frontend**: Vite + React (JavaScript)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

## API Integration

The application integrates with the inventory forecasting API at:
- Base URL: `https://model-ai-inventory.onrender.com`
- Endpoints:
  - `POST /forecast` - Get inventory forecasts
  - `GET /plot` - Generate visualization plots

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # API integration
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
