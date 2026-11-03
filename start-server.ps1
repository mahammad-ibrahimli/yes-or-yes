Write-Host "Starting Yes-Or-Yes server with ngrok..." -ForegroundColor Green
Write-Host ""

# Start HTTP server on port 3000
Write-Host "Starting HTTP server on port 3000..." -ForegroundColor Cyan
$serverJob = Start-Job -ScriptBlock {
    http-server -p 3000
}

# Wait for server to start
Start-Sleep -Seconds 3

# Start ngrok tunnel
Write-Host "Starting ngrok tunnel..." -ForegroundColor Cyan
& "c:\Users\Admin\ngrok\ngrok.exe" http 3000

# Cleanup when done
Stop-Job $serverJob
Remove-Job $serverJob
