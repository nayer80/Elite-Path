@echo off
REM Installation Script for Rayna Tours Website

echo.
echo ========================================
echo Rayna Tours - Installation Script
echo ========================================
echo.

echo Step 1: Navigating to project directory...
cd /d "d:\Elite Path"

echo.
echo Step 2: Clearing any previous installations...
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul

echo.
echo Step 3: Installing dependencies...
echo This may take 3-5 minutes on first run...
echo.
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Error during installation. Trying with legacy peer deps...
    call npm install --legacy-peer-deps
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start the development server, run:
echo npm run dev
echo.
echo Then open http://localhost:3000 in your browser
echo.
pause
