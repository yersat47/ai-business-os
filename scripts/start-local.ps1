$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

Write-Host ""
Write-Host " AI Business OS — локальный запуск" -ForegroundColor Cyan
Write-Host " ================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "[ОШИБКА] Node.js не найден. Установите: https://nodejs.org/" -ForegroundColor Red
  exit 1
}

if (-not (Test-Path "node_modules")) {
  Write-Host "Устанавливаю зависимости..."
  npm install
}

Write-Host ""
Write-Host " Сайт: http://localhost:3000/ru" -ForegroundColor Green
Write-Host " Остановить: Ctrl+C" -ForegroundColor Yellow
Write-Host ""

Start-Process "http://localhost:3000/ru"
npm run dev
