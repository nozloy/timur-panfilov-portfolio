# Тимур Панфилов — Portfolio

Официальный сайт-портфолио Тимура Панфилова: застройка и декор мероприятий, тендерные сметы, шеф-монтаж и проекты ЭКСПО.

## Домен

- Production: `https://timur.makegood.group/`

## О проекте

Сайт содержит:

- Портфолио и позиционирование специалиста
- Описание услуг
- Опыт и форматы проектов
- Список клиентов
- Контактные данные
- Адаптивную верстку (отдельные мобильная и десктопная версии)
- Переключатель светлой/тёмной темы
- Десктопный анимированный фон (`Grid Motion` на GSAP)

## Услуги

- Тендерные сметы
- Застройка под ключ
- Шеф монтаж / демонтаж
- Проекты ЭКСПО

## Контакты

- Телефон: `+7 999 164 99 19`
- Telegram: `@timur_panfilovich`
- Email: `panfilov.timur@gmail.com`

## Технологии

- `React 19`
- `TypeScript`
- `Vite`
- `TailwindCSS` (через CDN в `index.html`)
- `GSAP` (для `Grid Motion`)

## Запуск локально

Требования:

- `Node.js 18+`
- `npm`

Команды:

```bash
npm install
npm run dev
```

По умолчанию dev-сервер работает на `http://localhost:3000`.

## Сборка

```bash
npm run build
npm run preview
```

## SEO / Social / AI discoverability

В проект добавлены:

- расширенные meta-теги и Open Graph / Twitter Card в `index.html`
- JSON-LD schema (`Person`, `ProfessionalService`, `WebSite`) в `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/site.webmanifest`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/.well-known/llms.txt`
- `public/og-image.png` для предпросмотра ссылок в мессенджерах

## Структура (ключевые файлы)

- `App.tsx` — роутинг между мобильной и десктопной версией
- `components/DesktopLayout.tsx` — основная десктопная верстка
- `components/GridMotion.tsx` — анимированный фон
- `components/Header.tsx` — мобильный hero-блок
- `index.html` — meta/SEO/OG/JSON-LD
