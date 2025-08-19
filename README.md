# CodeAnalyzer AI

A full-stack code analysis application powered by Claude AI that transforms code into interactive data visualizations, providing complexity scoring, suggestions, and insights through rich charts and dashboards.



## Features

### Interactive Data Visualization
- **Complexity Gauge** - Circular progress chart with color-coded complexity scoring (1-100)
- **Code Metrics Dashboard** - Bar charts showing functions, lines of code, and conditionals
- **Severity-Coded Suggestions** - Color-categorized feedback cards (Critical, Warning, Info, Good)
- **Real-time Charts** - Interactive Recharts components with responsive design
- **Visual History Browser** - Timeline view of past analyses with complexity indicators

### AI-Powered Analysis
- **Multi-Language Support** - Auto-detects 30+ programming languages
- **Smart Complexity Scoring** - 1-100 scale with detailed breakdown
- **Contextual Suggestions** - Categorized feedback with severity levels
- **Function-Level Analysis** - Individual component breakdown

### User Experience
- **Modern Interface** - Clean design with smooth animations and toast notifications
- **History Management** - Save and revisit analyses with privacy controls
- **Mobile-Responsive** - Works seamlessly across all devices
- **Real-time Feedback** - Instant visual updates and loading states

## Tech Stack

**Backend:** FastAPI, Claude AI API, Pydantic  
**Frontend:** Next.js 14, TypeScript, Tailwind CSS, Recharts  
**Data:** localStorage with smart cleanup and privacy controls

## Getting Started

### Prerequisites
- Python 3.9+, Node.js 18+, Anthropic API key

### Setup
```bash
# Backend
cd server
pip install fastapi uvicorn anthropic python-dotenv
echo "ANTHRO_API_KEY=your_api_key_here" > .env
python main.py

# Frontend
cd client
npm install && npm run dev
```

## API

**POST /analyze** - Returns structured analysis with complexity metrics and suggestions
```json
{
  "code_text": "your code here",
  "language": "unknown", 
  "file_name": "example.js"
}
```

## Built With

Modern full-stack development showcasing AI integration, data visualization, and professional UI/UX design.
