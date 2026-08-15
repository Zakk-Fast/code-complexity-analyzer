#!/bin/bash

# Code Complexity Analyzer - Setup Script
# This script installs dependencies and prepares the project for local development.

set -e

echo "🚀 Setting up Code Complexity Analyzer..."

if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9+ first."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites check passed"

echo "🐍 Setting up Python virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✅ Virtual environment created"
else
    echo "✅ Virtual environment already exists"
fi

source venv/bin/activate

echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

echo "📦 Installing root Node.js dependencies..."
npm install

echo "📦 Installing frontend dependencies..."
cd client
npm install
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""

read -p "🚀 Would you like to start both servers now? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🔑 Please enter your Anthropic API key to continue:"
    echo "   (Get one from: https://console.anthropic.com/)"
    echo ""

    read -p "Enter your Anthropic API key: " api_key

    if [ -n "$api_key" ]; then
        echo "ANTHRO_API_KEY=$api_key" > server/.env
        echo "✅ API key saved to server/.env"
    else
        echo "❌ No API key provided. Please edit server/.env manually."
        exit 1
    fi

    echo ""
    echo "🚀 Starting both servers..."
    echo "  Frontend: http://localhost:3000"
    echo "  Backend:  http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop both servers"
    echo ""

    npm run dev:venv
else
    echo ""
    echo "Next steps:"
    echo "1. Create server/.env with your Anthropic API key:"
    echo "   echo 'ANTHRO_API_KEY=your_key_here' > server/.env"
    echo "2. Run 'npm run dev:venv' to start both servers"
    echo ""
    echo "The application will be available at:"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend:  http://localhost:8000"
fi
