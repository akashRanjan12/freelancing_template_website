@echo off
echo ==============================================
echo   Akash Ranjan's Portfolio Setup & Execution
echo ==============================================

echo Checking if dependencies are installed...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
) else (
    echo Dependencies found.
)

echo.
echo Starting the Next.js development server...
echo The website will be available at http://localhost:3000
echo.

call npm run dev
pause
