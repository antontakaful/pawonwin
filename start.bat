@echo off
title Soto Analyzer Server

echo 🍜 Starting Soto Analyzer Server...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Dependencies not found. Installing...
    call fix-dependencies.bat
)

REM Check if EJS is installed
if not exist "node_modules\ejs" (
    echo 📦 EJS not found. Installing EJS...
    npm install ejs@^3.1.9
)

echo 🚀 Starting server...
echo.
echo 🌐 Server will be available at: http://localhost:3000
echo 📁 Upload folder: %cd%\upload
echo.
echo Press Ctrl+C to stop the server
echo.

node app.js

pause
