/*
  Блок 10 «Этапы». Референс: docs/refs/block-10-process.png
  (страница референса 1269 css-px; размеры пересчитаны на 1440: ref × 1.138).
  Берём композицию: чёрный фон, заголовок в 2 строки по центру (вторая часть — акцент),
  карточки cream без скругления шахматкой на сетке 4×2: верх — 1, ·, 2, 3; низ — ·, 4, 5, ·.
  По просьбе клиента: заголовок этапа в левом верхнем углу, подтекст — снизу слева.
  Стилистика (шрифты, цвета) — из токенов.
*/

import Reveal from "./Reveal";
import { process, TG_URL } from "@/lib/data";
import "./Process.css";

/* Иконки — тем же стилем, что в блоке «Результат» (rs-icon): line-иконки, currentColor */
const ICONS = [
  // 1 — исследование: лупа
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-5-5" />
  </svg>,
  // 2 — позиционирование: мишень
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" fill="currentColor" />
  </svg>,
  // 3 — воронка по болям
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 4.5h17L14 13v6l-4 2v-8L3.5 4.5z" />
  </svg>,
  // 4 — дизайн-концепт: макет/сетка
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9.5h18" /><path d="M9 9.5V20" />
  </svg>,
  // 5 — вёрстка, SEO и аналитика: график
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19h16" /><path d="M7 19v-6M12 19V7M17 19v-9" />
  </svg>,
];

export default function Process() {
  return (
    <section id="process" className="pc scroll-mt-20 bg-black text-paper">
      <div className="wrap">
        <Reveal>
          <h2 className="h-sans pc-title">
            {process.title}
            <br />
            <span className="mark-accent">{process.titleAccent}</span>
          </h2>
        </Reveal>

        <ol className="pc-grid" role="list">
          {process.steps.map((s, i) => (
            <li key={s.title} className="pc-cell">
              <Reveal delay={i * 0.06} className="h-full">
                {/* Дизайн карточки один в один как в блоке «Результат» (rs-icon/rs-card-title/rs-card-text) */}
                <article className="pc-card">
                  <span className="pc-icon">{ICONS[i]}</span>
                  <div>
                    <h3 className="pc-h">{s.title}</h3>
                    <p className="pc-text">{s.text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <p className="pc-more">
          <a href={TG_URL} target="_blank" rel="noopener noreferrer">
            {process.more}
          </a>
        </p>
      </div>
    </section>
  );
}
