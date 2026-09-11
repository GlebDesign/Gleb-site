"use client";

/*
  Единая модалка с формой заявки. Открывается из любого блока:
    import { useLeadModal } from "@/components/LeadModal";
    const open = useLeadModal();  →  <button onClick={open}>…</button>
  Компонент <LeadModal /> смонтирован один раз в app/page.tsx.

  Референс: docs/refs/block-06-popup-sample.png — карточка по центру на размытом фоне,
  тёплое свечение сверху карточки, заголовок-антиква, мелкий текст, ряд круглых кнопок
  мессенджеров, крестик в правом верхнем углу. Замеры (CSS px): карточка ~804 шириной,
  радиус 28, крестик 22px с отступом 32, заголовок→текст 42, текст→иконки 42,
  иконки 80 с зазором 21, подпись 14px, низ 60.
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { audit, leadModal, TG_URL } from "@/lib/data";

const OPEN_EVENT = "lead-modal:open";

export function useLeadModal() {
  return useCallback(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent(OPEN_EVENT));
  }, []);
}

const fieldCls =
  "w-full rounded-[14px] border border-line bg-cream/70 px-4 py-3 text-[15px] text-ink placeholder:text-ink-2/70 transition-colors hover:border-ink/35 focus:border-accent focus:outline-none md:px-[18px] md:py-[14px] md:text-[16px]";

function MessengerIcon({ id }: { id: "telegram" | "whatsapp" }) {
  if (id === "telegram") {
    return (
      <svg viewBox="0 0 24 24" className="h-[38px] w-[38px]" fill="currentColor" aria-hidden>
        <path d="M21.6 3.3 2.9 10.5c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 11.1-7c.5-.3 1-.1.6.2l-9 8.1-.3 4.9c.5 0 .7-.2 1-.5l2.3-2.3 4.9 3.6c.9.5 1.5.2 1.8-.8l3.2-15.1c.3-1.3-.5-1.9-1.5-1.4Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-[40px] w-[40px]" fill="currentColor" aria-hidden>
      <path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.2 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.9c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState("");
  const [sending, setSending] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => setOpen(false), []);

  // Открытие по событию от useLeadModal()
  useEffect(() => {
    const onOpen = () => {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      setHint("");
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  // Блокировка скролла, Esc, фокус на первое поле, ловушка Tab
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), reduce ? 0 : 120);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab" && cardRef.current) {
        const focusables = cardRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      restoreFocusRef.current?.focus?.();
    };
  }, [open, close, reduce]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const site = String(data.get("site") || "").trim();
    const comment = String(data.get("comment") || "").trim();
    if (!name || !contact) {
      setHint(leadModal.hints.required);
      return;
    }

    setSending(true);
    setHint(leadModal.hints.sending);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, site, comment }),
      });
      if (res.ok) {
        form.reset();
        setHint(leadModal.hints.sent);
        setSending(false);
        return;
      }
    } catch {
      /* сервер недоступен — фолбэк ниже */
    }

    // Фолбэк: копируем заявку и открываем Telegram
    const msg = [
      "Заявка на бесплатный аудит",
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      site ? `Сайт: ${site}` : null,
      comment ? `Комментарий: ${comment}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    try {
      await navigator.clipboard.writeText(msg);
      setHint(leadModal.hints.copied);
    } catch {
      setHint(leadModal.hints.fallback);
    }
    window.open(TG_URL, "_blank", "noopener");
    setSending(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lead-modal"
          data-lenis-prevent
          className="fixed inset-0 z-[100] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
        >
          {/* Фон: размытие + лёгкое затемнение; клик по фону закрывает */}
          <div
            className="absolute inset-0 bg-ink/30 backdrop-blur-[10px]"
            onClick={close}
            aria-hidden
          />

          <div className="relative flex min-h-full items-center justify-center p-4 md:p-8">
            <motion.div
              ref={cardRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lead-modal-title"
              className="relative w-full max-w-[804px] overflow-hidden rounded-[22px] bg-cream-2 px-5 pt-14 pb-7 text-center shadow-[0_30px_80px_-30px_rgba(17,17,17,0.45)] md:rounded-[28px] md:px-12 md:pt-[60px] md:pb-[44px]"
              initial={reduce ? false : { opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {/* Тёплое свечение сверху карточки (как в референсе) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[220px]"
                style={{
                  background:
                    "radial-gradient(ellipse 285px 200px at 50% 0%, var(--color-accent-soft) 0%, color-mix(in srgb, var(--color-accent-soft) 60%, transparent) 40%, transparent 78%)",
                }}
              />

              <button
                type="button"
                onClick={close}
                aria-label={leadModal.close}
                className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full text-accent transition-colors hover:bg-accent/10 md:top-[22px] md:right-[22px]"
              >
                <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </button>

              <div className="relative">
                <h2 id="lead-modal-title" className="h-serif text-[clamp(34px,4.2vw,60px)]">
                  {leadModal.title}
                </h2>
                <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-[1.3] text-ink-2 md:mt-[26px] md:text-[17px] md:leading-[1.2]">
                  {leadModal.text}
                </p>

                <form onSubmit={onSubmit} noValidate className="mx-auto mt-6 grid max-w-[560px] gap-2.5 text-left md:mt-8 md:gap-3">
                  <div className="grid gap-2.5 sm:grid-cols-2 md:gap-3">
                    <input
                      ref={firstFieldRef}
                      name="name"
                      placeholder={leadModal.fields.name}
                      className={fieldCls}
                      autoComplete="name"
                      required
                    />
                    <input
                      name="contact"
                      placeholder={leadModal.fields.contact}
                      className={fieldCls}
                      autoComplete="tel"
                      required
                    />
                  </div>
                  <input name="site" placeholder={leadModal.fields.site} className={fieldCls} inputMode="url" />
                  <textarea
                    name="comment"
                    placeholder={leadModal.fields.comment}
                    rows={2}
                    className={`${fieldCls} resize-none`}
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-1 inline-flex h-[56px] items-center justify-center rounded-full bg-linear-to-r from-accent-deep to-accent px-8 text-[16px] font-medium text-white transition-[filter] hover:brightness-105 disabled:opacity-60 md:h-[62px] md:text-[18px]"
                  >
                    {audit.cta}
                  </button>
                  <p className="min-h-5 text-center text-[13px] text-ink-2" aria-live="polite">
                    {hint}
                  </p>
                </form>

                {/* Мессенджеры — ряд круглых кнопок как в референсе */}
                <p className="mt-2 text-[13px] text-ink-2 md:text-[14px]">{leadModal.messengersLabel}</p>
                <ul className="mt-4 flex justify-center gap-4 md:gap-[21px]">
                  {leadModal.messengers.map((m) => (
                    <li key={m.id}>
                      <a
                        href={m.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={m.label}
                        className="grid h-[64px] w-[64px] place-items-center rounded-full bg-linear-to-br from-accent-deep via-accent to-accent-soft text-white shadow-[0_12px_28px_-14px_rgba(184,88,42,0.7)] transition-transform hover:scale-[1.04] md:h-[80px] md:w-[80px]"
                      >
                        <MessengerIcon id={m.id} />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[13px] text-ink-2 md:mt-[34px] md:text-[14px]">{leadModal.note}</p>
                <p className="mt-2 text-[11px] text-ink-2/70 md:text-[12px]">{leadModal.consent}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
