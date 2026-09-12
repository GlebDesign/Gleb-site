"use client";

import Reveal from "./Reveal";
import { audit, TG_URL } from "@/lib/data";

/*
  Блок 6 «Мягкий призыв». Референс: docs/refs/block-06-cta.png (2x).
  Замеры (CSS px): надзаголовок 18px по центру; заголовок-антиква в 2 строки по центру;
  текст 18px, интерлиньяж ~1.1, 2 строки; кнопка-пилюля 470×70 с горизонтальным градиентом
  (слева темнее, справа светлее), текст 19px; отступы: заголовок→текст 28, текст→кнопка 63,
  кнопка→низ блока 55. Под кнопкой — тёплое радиальное свечение, центр на нижней кромке блока.
  Кнопка ведёт в Telegram с готовым сообщением (правка клиента — не через форму на сайте).
*/

const auditHref = `${TG_URL}?text=${encodeURIComponent(audit.telegramPrefill)}`;

export default function Audit() {
  return (
    <section
      id="audit"
      className="relative scroll-mt-20 overflow-hidden bg-cream pt-16 pb-12 md:pt-[72px] md:pb-[55px]"
    >
      {/* Свечение под кнопкой (в референсе — тёплый ореол, обрезанный нижней кромкой блока) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[260px] md:h-[340px]"
        style={{
          background:
            "radial-gradient(ellipse 320px 330px at 50% 100%, var(--color-accent-soft) 0%, color-mix(in srgb, var(--color-accent-soft) 55%, transparent) 38%, transparent 76%)",
        }}
      />

      <div className="wrap relative text-center">
        <Reveal>
          <p className="text-[15px] text-ink-2 md:text-[18px]">{audit.kicker}</p>
          <h2 className="h-serif mx-auto mt-2 max-w-[1280px] text-[clamp(36px,6.05vw,88px)] leading-[0.95]">
            {audit.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[660px] text-[15px] leading-[1.3] text-ink-2 md:mt-7 md:text-[18px] md:leading-[1.15]">
            {audit.text}
          </p>
          <a
            href={auditHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex h-[60px] w-full max-w-[470px] items-center justify-center rounded-full bg-linear-to-r from-accent-deep to-accent px-8 text-[17px] font-medium text-white shadow-[0_10px_30px_-12px_rgba(184,88,42,0.55)] transition-[filter,transform] hover:brightness-105 active:scale-[0.99] md:mt-[63px] md:h-[70px] md:text-[19px]"
          >
            {audit.cta}
          </a>
          <p className="mt-3 text-[13px] text-ink-2">{audit.ctaNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
