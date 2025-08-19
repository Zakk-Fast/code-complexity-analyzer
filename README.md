# CodeAnalyzer AI

A full-stack code analysis application powered by Claude AI that transforms code into interactive data visualizations, providing complexity scoring, suggestions, and insights through rich charts and dashboards.

<img width="1132" height="557" alt="Screenshot 2025-08-19 at 3 00 59 PM" src="https://github.com/user-attachments/assets/34305f6f-acde-4484-973d-40b0dea6fdde" />

## Live Demo
🚀 **[View Live Application](https://code-complexity-analyzer-indol.vercel.app/)**


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

## Screenshots
<img width="1134" height="881" alt="Screenshot 2025-08-19 at 2 59 49 PM" src="https://github.com/user-attachments/assets/efd9fc41-21fe-4dd0-a522-ba3b406ffd3d" />
<img width="1131" height="882" alt="Screenshot 2025-08-19 at 2 59 59 PM" src="https://github.com/user-attachments/assets/866e8f84-4a6f-48e4-bd08-904daccd9499" />
<img width="1137" height="869" alt="Screenshot 2025-08-19 at 3 00 41 PM" src="https://github.com/user-attachments/assets/8b7a7201-5009-44e4-8bf3-1c57a5ce1426" />
<img width="1132" height="557" alt="Screenshot 2025-08-19 at 3 00 59 PM" src="https://github.com/user-attachments/assets/18a69684-b0cf-41c8-8334-7f2defe52953" />
<img width="1125" height="517" alt="Screenshot 2025-08-19 at 3 01 06 PM" src="https://github.com/user-attachments/assets/e3cccd56-cb02-4e10-8ec0-bd62d56cf094" />
<img width="1144" height="417" alt="Screenshot 2025-08-19 at 3 01 18 PM" src="https://github.com/user-attachments/assets/8dfc9359-2f28-4c2c-8899-a10e69303cbc" />

## Getting Started

### Prerequisites
- Python 3.9+, Node.js 18+, Anthropic API key

### Setup
```bash
# Backend
cd server
pip install fastapi uvicorn anthropic python-dotenv
echo "ANTHRO_API_KEY=your_api_key_here" > .env

# Frontend
cd client
npm install

# Run
cd ../
npm run dev
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

Modern full-stack development, AI integration, data visualization, and professional modern UI/UX design.
