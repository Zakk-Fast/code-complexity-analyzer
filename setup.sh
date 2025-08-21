#!/bin/bash

# Code Complexity Analyzer - Setup Script
# This script will install all dependencies and set up the project

set -e  # Exit on any error

echo "🚀 Setting up Code Complexity Analyzer..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Create and activate virtual environment
echo "🐍 Setting up Python virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✅ Virtual environment created"
else
    echo "✅ Virtual environment already exists"
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "📦 Installing Python dependencies..."
cd server
pip install -r ../requirements.txt
cd ..

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
cd client
npm install
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""

# Ask if user wants to start the servers
read -p "🚀 Would you like to start both servers now? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🔑 Please enter your Anthropic API key to continue:"
    echo "   (Get one from: https://console.anthropic.com/)"
    echo ""
    
    # Prompt for API key
    read -p "Enter your Anthropic API key: " api_key
    
    # Update .env file with the actual API key
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
    
    # Start both servers using the virtual environment script
    npm run dev:venv
else
    echo ""
    echo "🧹 Cleaning up virtual environment..."
    rm -rf venv
    echo "✅ Virtual environment removed"
    echo ""
    echo "Next steps:"
    echo "1. Create server/.env file with your Anthropic API key:"
    echo "   echo 'ANTHRO_API_KEY=your_key_here' > server/.env"
    echo "2. Run 'npm run dev:server' for backend only"
    echo "3. Run 'npm run dev:client' for frontend only"
    echo ""
    echo "The application will be available at:"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend:  http://localhost:8000"
fi
