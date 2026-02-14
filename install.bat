@echo off
echo ============================================
echo Load Sphere - Installation Script
echo ============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

REM Check if MongoDB is installed
where mongo >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] MongoDB may not be installed
    echo Please ensure MongoDB is installed and running
    echo Download from: https://www.mongodb.com/try/download/community
    echo.
) else (
    echo [OK] MongoDB is installed
)

echo ============================================
echo Installing Backend Dependencies...
echo ============================================
cd server
if exist node_modules (
    echo Cleaning existing node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    del package-lock.json
)
echo Installing packages...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Backend installation failed!
    pause
    exit /b 1
)
echo [OK] Backend dependencies installed
cd ..
echo.

echo ============================================
echo Installing Frontend Dependencies...
echo ============================================
cd client
if exist node_modules (
    echo Cleaning existing node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    del package-lock.json
)
echo Installing packages (with legacy peer deps)...
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo [ERROR] Frontend installation failed!
    pause
    exit /b 1
)
echo [OK] Frontend dependencies installed
cd ..
echo.

echo ============================================
echo Installation Complete!
echo ============================================
echo.
echo Next Steps:
echo 1. Ensure MongoDB is running
echo 2. Run 'start-app.bat' to start the application
echo.
echo Or manually start:
echo   Terminal 1: cd server ^&^& npm run dev
echo   Terminal 2: cd client ^&^& npm run dev
echo.
pause
