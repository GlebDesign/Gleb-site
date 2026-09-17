import Reveal from "./Reveal";
import { results } from "@/lib/data";
import "./Results.css";

/*
  Блок 3 «Решения, которые приносят деньги».
  Было: карточки на GSAP-пине с абсолютным позиционированием по референсу iampolie.ru —
  постоянно ломалось (текст либо переносился не туда, либо карточку обрезало по низу экрана,
  либо обрезался текст внутри самой карточки при разных пропорциях экрана). Правка клиента:
  убрана вся пин-анимация, обычная сетка с высотой по контенту — как в блоке «Пять шагов»,
  там с той же типографикой такого бага никогда не было.
*/

/* Тонкие линейные иконки по смыслу карточек (stroke = currentColor) */
const ICONS = [
  // 1 — прогнозируемый поток: график с ровным ростом
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 20h18" /><path d="M4 16l5-5 4 3 7-8" /><path d="M16 6h4v4" />
  </svg>,
  // 2 — платёжеспособные клиенты: человек с галочкой
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="10" cy="8" r="3.5" /><path d="M3.5 20c0-3.5 3-6 6.5-6 1.2 0 2.3.3 3.2.8" /><path d="M14.5 18l2 2 4-4.5" />
  </svg>,
  // 3 — доверие: щит с галочкой
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4.5" />
  </svg>,
  // 4 — уровень цен / партнёры: портфель
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="7.5" width="18" height="12.5" rx="2" /><path d="M8.5 7.5V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" /><path d="M3 12.5h18" />
  </svg>,
  // 5 — вопросы снимаются: диалог с галочкой
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 5.5h16v10H10l-4.5 3.5v-3.5H4z" /><path d="M9 10.5l2 2 4-4" />
  </svg>,
];

export default function Results() {
  return (
    <section id="results" className="rs scroll-mt-20 py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <div className="rs-head">
            <h2 className="rs-title">{results.title}</h2>
            <p className="rs-approach">{results.approach}</p>
          </div>
        </Reveal>

        <ul className="rs-cards" role="list">
          {results.items.map((r, i) => (
            <li key={r.title} className="rs-cell">
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <article className="rs-card">
                  <span className="rs-icon">{ICONS[i]}</span>
                  <div>
                    <h3 className="rs-card-title">{r.title}</h3>
                    <p className="rs-card-text">{r.text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
