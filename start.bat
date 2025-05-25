@echo off
echo 🍜 Starting Soto Analyzer...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Running installer...
    call install.bat
    exit /b
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Dependencies not found. Installing...
    call fix-dependencies.bat
)

echo 🚀 Starting server...
echo.
echo 🌐 Server will be available at: http://localhost:3000
echo 📝 Press Ctrl+C to stop the server
echo.

npm start
