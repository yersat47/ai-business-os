@echo off
chcp 65001 >nul
cd /d "%~dp0.."

echo.
echo  AI Business OS — локальный запуск
echo  ================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [ОШИБКА] Node.js не найден.
  echo Скачайте и установите: https://nodejs.org/
  pause
  exit /b 1
)

if not exist node_modules (
  echo Устанавливаю зависимости...
  call npm install
  if errorlevel 1 (
    echo [ОШИБКА] npm install не удался
    pause
    exit /b 1
  )
)

echo.
echo  Сайт откроется: http://localhost:3000/ru
echo  Остановить: Ctrl+C в этом окне
echo.

start "" "http://localhost:3000/ru"
call npm run dev

pause
