#!/bin/bash

# Soto Analyzer Installation Script
echo "🍜 Installing Soto Analyzer..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "🔗 Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create upload directory if it doesn't exist
if [ ! -d "upload" ]; then
    echo "📁 Creating upload directory..."
    mkdir -p upload
    echo "✅ Upload directory created"
fi

# Make the script executable
echo "🔧 Setting up permissions..."

echo "🎉 Installation completed successfully!"
echo ""
echo "🚀 To start the application:"
echo "   npm start       - Run the server"
echo "   npm run dev     - Run with auto-reload (development)"
echo ""
echo "🌐 The application will be available at: http://localhost:3000"
echo ""
echo "📝 For more information, check the README.md file"
