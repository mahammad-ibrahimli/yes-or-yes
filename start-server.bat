@echo off
echo Starting Yes-Or-Yes server with ngrok...
echo.

REM Start HTTP server on port 3000
echo Starting HTTP server on port 3000...
start cmd /k "http-server -p 3000"

REM Wait for server to start
timeout /t 3 /nobreak >nul

REM Start ngrok tunnel
echo Starting ngrok tunnel...
c:\Users\Admin\ngrok\ngrok.exe http 3000

echo.
echo Server is running!
echo Press Ctrl+C to stop ngrok
