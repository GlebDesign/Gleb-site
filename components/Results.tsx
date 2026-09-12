"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { results } from "@/lib/data";
import "./Results.css";

/*
  Блок 3. Скролл-анимация по референсу iampolie.ru (docs/refs/block-03-results-{a,b,c}.png):
  секция закреплена; заголовок сначала один по центру, затем чуть отходит назад и размывается,
  карточки по очереди выезжают снизу на свои места (лево-верх → право-верх → центр-низ → лево-низ → право-низ).
  Тайминги сняты с источника (артборд 2395u: блюр 0→700u, карточки фиксируются на 778u / 1079u / 1388u).
*/

const PIN_DISTANCE = 3200; // px скролла, на которые закреплена сцена

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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const title = section.querySelector<HTMLElement>(".rs-title");
      const approach = section.querySelector<HTMLElement>(".rs-approach");
      const cards = gsap.utils.toArray<HTMLElement>(section.querySelectorAll(".rs-card"));

      gsap.set(cards, { y: "115vh" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${PIN_DISTANCE}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // кадр A → B: заголовок отходит назад и размывается (источник: overlay-блюр 0→700u из 2395u ≈ 0.16–0.44)
      tl.fromTo(
        title,
        { filter: "blur(0px)", scale: 1, opacity: 1 },
        { filter: "blur(7px)", scale: 0.9, opacity: 0.85, duration: 0.28 },
        0.16,
      );
      if (approach) tl.to(approach, { opacity: 0, duration: 0.1 }, 0.16);

      // карточки выезжают снизу и встают на места; заезды перекрываются, как на источнике
      cards.forEach((card, i) => {
        tl.to(card, { y: 0, duration: 0.2 }, 0.26 + i * 0.14);
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    // после подгрузки шрифтов пересчитать позиции (доп. фикс на позднюю догрузку картинок — в SmoothScroll.tsx)
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section id="results" ref={sectionRef} className="rs scroll-mt-20">
      <div className="rs-stage">
        <div className="rs-head">
          <h2 className="rs-title">{results.title}</h2>
          <p className="rs-approach">{results.approach}</p>
        </div>

        <ul className="rs-cards">
          {results.items.map((r, i) => (
            <li key={r.title} className="rs-card">
              <span className="rs-icon">{ICONS[i]}</span>
              <div>
                <h3 className="rs-card-title">{r.title}</h3>
                <p className="rs-card-text">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
