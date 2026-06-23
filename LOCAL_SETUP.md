# Локальный запуск (без туннелей)

Туннели Cloudflare (`trycloudflare.com`) нестабильны и часто падают с ошибками 1033/530.
**Локальный запуск на вашем компьютере работает стабильно** — сайт доступен по `http://localhost:3000`.

## Требования

- [Node.js](https://nodejs.org/) версии 18 или новее (рекомендуется LTS)
- Git (если клонируете репозиторий)

## Быстрый старт (Windows)

### Вариант 1 — двойной клик

1. Откройте папку проекта `ai-business-os`
2. Запустите файл **`scripts/start-local.bat`**
3. Браузер откроет: **http://localhost:3000/ru**

### Вариант 2 — терминал в Cursor / VS Code

```bash
cd путь/к/ai-business-os
npm install
npm run dev
```

Откройте в браузере: **http://localhost:3000/ru**

## Маршруты

| Страница | URL |
|---|---|
| Главная (RU) | http://localhost:3000/ru |
| Старт / онбординг | http://localhost:3000/ru/entry |
| Создать компанию | http://localhost:3000/ru/create-company |
| Дашборд | http://localhost:3000/ru/dashboard |
| AI-команда | http://localhost:3000/ru/team |

## Если дашборд не открывается

1. Пройдите онбординг: `/ru/entry` → «Создать компанию» → все шаги
2. Или очистите данные сайта в браузере:
   - F12 → Application → Local Storage → `localhost:3000` → Clear
3. Обновите страницу и пройдите онбординг заново

## Production-режим (ещё стабильнее)

```bash
npm run local
```

Собирает проект и запускает production-сервер на порту 3000.

## Остановка сервера

В терминале нажмите **Ctrl+C**.

## Клонирование с GitHub

```bash
git clone https://github.com/yersat47/ai-business-os.git
cd ai-business-os
git checkout cursor/dashboard-access-fix-b4b1
npm install
npm run dev
```

После слияния PR используйте ветку `main`.
