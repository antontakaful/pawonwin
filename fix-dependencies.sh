#!/bin/bash

echo "🍜 Soto Analyzer - Quick Fix untuk Dependencies"
echo ""

echo "📦 Installing required dependencies..."
echo ""

# Install dependencies satu per satu untuk memastikan berhasil
echo "Installing Express..."
npm install express@^4.18.2

echo "Installing EJS..."
npm install ejs@^3.1.9

echo "Installing Multer..."
npm install multer@^1.4.5

echo "Installing UUID..."
npm install uuid@^9.0.0

echo "Installing Nodemon for development..."
npm install --save-dev nodemon@^3.0.1

echo ""
echo "✅ All dependencies installed!"
echo ""
echo "🚀 Now you can run:"
echo "   npm start     - Run the server"
echo "   npm run dev   - Run with auto-reload"
echo ""
echo "🌐 Server will be available at: http://localhost:3000"
echo ""
