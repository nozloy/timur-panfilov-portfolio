# Тимур Панфилов — Portfolio

Портфолио и админ-панель для управления каруселью изображений.

## Стек

- Next.js (App Router)
- TypeScript
- TailwindCSS (локальная сборка)
- Prisma ORM + PostgreSQL
- BetterAuth + Yandex OAuth
- S3-compatible storage (presigned upload)
- shadcn/ui (Carousel + admin UI)

## Основные фичи

- Публичная главная страница и `/mini`
- Карусель `Home` перед секцией клиентов (mobile + desktop)
- Админка `/admin/carousel` с загрузкой, редактированием, публикацией, удалением и reorder
- Авторизация через Yandex OAuth, доступ только email из таблицы `Admin`

## Локальный запуск

Требования:

- Node.js 20+
- PostgreSQL

Подготовка:

```bash
npm install
cp .env.example .env.local
```

Обязательные переменные в `.env.local`:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_APP_URL`
- `YANDEX_CLIENT_ID`
- `YANDEX_CLIENT_SECRET`
- `CAROUSEL_S3_BUCKET`
- `CAROUSEL_S3_REGION`
- `CAROUSEL_S3_ACCESS_KEY_ID`
- `CAROUSEL_S3_SECRET_ACCESS_KEY`

Опционально:

- `CAROUSEL_S3_ENDPOINT` (для S3-compatible провайдеров)
- `CAROUSEL_S3_FORCE_PATH_STYLE`
- `CAROUSEL_CDN_URL` (если укажете только `https://s3.twcstorage.ru`, bucket будет добавлен автоматически)

Миграции и генерация клиента:

```bash
npm run prisma:migrate:dev
npm run prisma:generate
```

Выдать доступ администратору:

```bash
npm run grant-admin -- admin@example.com
```

Запуск dev:

```bash
npm run dev
```

## Скрипты

- `npm run dev` — Next dev server (`:3000`)
- `npm run build` — `prisma generate` + `next build`
- `npm run start` — production server
- `npm run prisma:migrate:dev` — применить миграции в dev
- `npm run prisma:migrate:deploy` — применить миграции в production
- `npm run prisma:studio` — Prisma Studio
- `npm run grant-admin -- <email>` — добавить email в таблицу `Admin`

## OAuth callback

Для Yandex OAuth укажите callback URL:

`<BETTER_AUTH_URL>/api/auth/callback/yandex`

Пример для локальной разработки:

`http://localhost:3000/api/auth/callback/yandex`

## S3 CORS for admin upload

Для загрузки через presigned `PUT` в браузере у bucket обязательно должен быть CORS.

Быстрая настройка:

```bash
npm run s3:cors:apply -- https://your-domain.com http://localhost:3000
```

Если аргументы не переданы, скрипт использует `BETTER_AUTH_URL` (или `NEXT_PUBLIC_APP_URL`) + `http://localhost:3000`.

Минимально нужно разрешить:

- `AllowedOrigins`: ваш домен админки
- `AllowedMethods`: `PUT`
- `AllowedHeaders`: `Content-Type` (или `*`)

## Docker

В проекте есть `Dockerfile` с `standalone`-сборкой Next.js и обязательным mirror-ARG для base image:

- `ARG NODE_IMAGE=mirror.gcr.io/library/node:20-bookworm-slim`
- все `FROM` используют только `${NODE_IMAGE}`

Сборка:

```bash
docker build -t timur-portfolio .
```
