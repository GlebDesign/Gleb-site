# Глеб Жидель — лендинг

Персональный продающий сайт: разработка сайтов полного цикла, главное действие — заявка на бесплатный аудит.
Стек: Next.js 15 (App Router) · Tailwind v4 · GSAP · Lenis · Motion.

## Локальный запуск

```bash
npm install
cp .env.example .env.local   # вписать токен бота и chat_id
npm run dev                  # http://localhost:3001
```

## Где что лежит

| Путь | Что |
|---|---|
| `lib/data.ts` | Все тексты и ссылки сайта в одном месте |
| `components/` | По компоненту на блок: Hero, Problems, Results, Cases, Pricing, Audit (форма), Header, Footer |
| `app/api/lead/route.ts` | Серверный роут: заявка → сообщение в Telegram |
| `app/globals.css` | Дизайн-токены (цвета, шрифт, радиусы) |
| `docs/copy.md` | Исходный текст от клиента |
| `docs/structure.md` | Структура блоков |

## Переменные окружения

| Переменная | Зачем |
|---|---|
| `TELEGRAM_BOT_TOKEN` | токен бота от @BotFather |
| `TELEGRAM_CHAT_ID` | id чата, куда падают заявки с формы |

## Деплой (Vercel)

1. Запушить репозиторий на GitHub.
2. vercel.com → Add New → Project → импортировать репозиторий.
3. Settings → Environment Variables → добавить `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.
4. Deploy. Домен подключается в Settings → Domains.

## Статус

Визуал пока плейсхолдерный: ждём референс-франкенштейн по блокам, фото Глеба,
скриншоты рынка для блока цены и превью кейсов. Все места для ассетов помечены `TODO` в коде.
