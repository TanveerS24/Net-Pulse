@echo off
echo ============================================
echo Load Sphere - Starting Application
echo ============================================
echo.

REM Check if MongoDB is running
echo Checking MongoDB connection...
mongosh --eval "db.version()" --quiet >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Cannot connect to MongoDB!
    echo Starting MongoDB service...
    net start MongoDB >nul 2>&1
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to start MongoDB
        echo Please start MongoDB manually:
        echo   1. Open Services (services.msc)
        echo   2. Find "MongoDB" service
        echo   3. Right-click and select "Start"
        echo.
        echo Or use MongoDB Compass to connect to:
        echo   mongodb://localhost:27017
        echo.
        pause
    ) else (
        echo [OK] MongoDB started successfully
    )
) else (
    echo [OK] MongoDB is running
)
echo.

echo ============================================
echo Starting Backend Server...
echo ============================================
start "Load Sphere - Backend" cmd /k "cd /d %~dp0server && npm run dev"
timeout /t 3 >nul
echo [OK] Backend server starting...
echo.

echo ============================================
echo Starting Frontend Client...
echo ============================================
start "Load Sphere - Frontend" cmd /k "cd /d %~dp0client && npm run dev"
echo [OK] Frontend client starting...
echo.

echo ============================================
echo Load Sphere is Starting!
echo ============================================
echo.
echo Two terminal windows have opened:
echo   1. Backend Server (Port 5000)
echo   2. Frontend Client (Port 5173)
echo.
echo Wait a few seconds, then open your browser:
echo   http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul
