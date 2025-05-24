@echo off
echo 🍜 Installing Soto Analyzer...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo 🔗 Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Check if installation was successful
if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Create upload directory if it doesn't exist
if not exist "upload" (
    echo 📁 Creating upload directory...
    mkdir upload
    echo ✅ Upload directory created
)

echo 🎉 Installation completed successfully!
echo.
echo 🚀 To start the application:
echo    npm start       - Run the server
echo    npm run dev     - Run with auto-reload (development)
echo.
echo 🌐 The application will be available at: http://localhost:3000
echo.
echo 📝 For more information, check the README.md file
echo.
pause
