import { NextResponse } from "next/server";

/*
  Заявка с формы → сообщение в Telegram через бота.
  Переменные окружения (файл .env.local в корне проекта):
    TELEGRAM_BOT_TOKEN=123456:ABC-DEF...   — токен от @BotFather
    TELEGRAM_CHAT_ID=123456789             — id чата, куда слать заявки
*/

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
  const name = str(body.name, 200);
  const contact = str(body.contact, 200);
  const site = str(body.site, 300);
  const comment = str(body.comment, 1000);
  if (!name || !contact) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const esc = (s: string) =>
    s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

  const lines = [
    "<b>Заявка на бесплатный аудит</b>",
    `Имя: ${esc(name)}`,
    `Контакт: ${esc(contact)}`,
    site ? `Сайт: ${esc(site)}` : null,
    comment ? `Комментарий: ${esc(comment)}` : null,
  ].filter(Boolean);

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: lines.join("\n"), parse_mode: "HTML" }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "telegram_error" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
