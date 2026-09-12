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
                <article className="pc-card">
                  <h3 className="pc-h">{s.title}</h3>
                  <p className="pc-text">{s.text}</p>
                  <svg className="pc-arrow" viewBox="0 0 18 18" aria-hidden="true">
                    <path d="M3 15 15 3M6 3h9v9" />
                  </svg>
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
