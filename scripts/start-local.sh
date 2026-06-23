#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo ""
echo " AI Business OS — локальный запуск"
echo " ================================"
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "[ОШИБКА] Node.js не найден. Установите: https://nodejs.org/"
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Устанавливаю зависимости..."
  npm install
fi

echo ""
echo " Сайт: http://localhost:3000/ru"
echo " Остановить: Ctrl+C"
echo ""

if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "http://localhost:3000/ru" >/dev/null 2>&1 || true
elif command -v open >/dev/null 2>&1; then
  open "http://localhost:3000/ru" >/dev/null 2>&1 || true
fi

npm run dev
