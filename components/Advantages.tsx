"use client";

/*
  Блок 9 «Преимущества». Референс: docs/refs/block-09-advantages.png
  (страница референса 1269 css-px, панель 1253×474; размеры пересчитаны на 1440: ref × 1.138).
  Композиция: тёмная панель (унифицирована с чёрными секциями сайта), фоном «аудио-волна» из штрихов (снята с референса
  попиксельно — components/advantages-wave.ts), пункты в две «строки» шахматкой.
  Поведение: секция закрепляется, дорожка едет влево при скролле вниз (GSAP ScrollTrigger pin,
  ход = ширина дорожки − ширина экрана). На <768px и при prefers-reduced-motion — обычная сетка.
*/

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { advantages } from "@/lib/data";
import { WAVE_PATH, WAVE_W, WAVE_H } from "./advantages-wave";
import "./Advantages.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Раскладка референса (в % ширины экрана / высоты панели):
   верхняя строка — пункты 0..2 с шагом 43.9%, левый край 6.4%, верх 13.7%;
   нижняя строка — пункты 3..5 со сдвигом +25.2%, верх 61%. */
const COL = 43.9;
const LEFT = 6.4;
const SHIFT = 25.2;
const TOP_ROW = 13.7;
const BOTTOM_ROW = 61;
/* Ширина дорожки в долях экрана: последний нижний пункт + колонка текста + правое поле */
const TRACK = 1.414;

/* Положение стрелки «часов» у каждого пункта (градусы по часовой, 0 = вверх) — как в референсе */
const HANDS = [210, 0, 315, 100, 45, 150];

function Clock({ angle }: { angle: number }) {
  const r = 6.4;
  const a = ((angle - 90) * Math.PI) / 180;
  const x = 10 + r * Math.cos(a);
  const y = 10 + r * Math.sin(a);
  return (
    <svg className="adv-clock" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9.3" />
      <path d={`M10 10L${x.toFixed(2)} ${y.toFixed(2)}`} />
    </svg>
  );
}

export default function Advantages() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      /*
        Баг (реальная причина, не просто поздняя картинка): useGSAP монтируется как layout-effect
        (синхронно, до отрисовки), а у блока «Результат» (Results.tsx) — обычный useEffect
        (после отрисовки). React гарантирует, что ВСЕ layout-эффекты дерева отрабатывают раньше
        ЛЮБЫХ passive-эффектов — значит на момент расчёта "center center" здесь спейсер пина
        Results ещё не вставлен в документ, высота страницы занижена на его PIN_DISTANCE,
        и триггер закрепления считается на ~3200px раньше своего места (наезжает на блок цены).
        Фикс: откладываем создание пина на один кадр — к этому моменту passive-эффект
        Results уже отработал и его спейсер учтён в высоте документа.
      */
      let mm: ReturnType<typeof gsap.matchMedia> | null = null;
      const raf = requestAnimationFrame(() => {
        mm = gsap.matchMedia();
        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
          const vp = viewport.current!;
          const tr = track.current!;
          const travel = () => Math.max(0, tr.scrollWidth - vp.clientWidth);
          gsap.to(tr, {
            x: () => -travel(),
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              pin: true,
              scrub: true,
              start: "center center",
              end: () => "+=" + travel(),
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        });
      });
      return () => {
        cancelAnimationFrame(raf);
        mm?.revert();
      };
    },
    { scope: section },
  );
  // Доп. страховка на позднюю догрузку картинок (кейсы/фото сдвигают разметку) — см. SmoothScroll.tsx

  const trackViewBox = `0 0 ${Math.round(WAVE_W * TRACK)} ${WAVE_H}`;

  return (
    <section id="advantages" ref={section} className="adv scroll-mt-20 bg-black text-paper">
      {/* Волна один раз в defs, ниже — два <use> для десктопа и мобилки */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <g id="adv-wave">
            <path d={WAVE_PATH} />
            <path d={WAVE_PATH} transform={`translate(${WAVE_W} 0)`} />
          </g>
        </defs>
      </svg>

      <div ref={viewport} className="adv-viewport">
        <ul ref={track} className="adv-track" role="list">
          <svg className="adv-wave adv-wave-desktop" viewBox={trackViewBox} preserveAspectRatio="none" aria-hidden="true">
            <use href="#adv-wave" />
          </svg>
          <svg
            className="adv-wave adv-wave-mobile"
            viewBox={`0 0 ${WAVE_W} ${WAVE_H}`}
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <use href="#adv-wave" />
          </svg>

          {advantages.items.map((text, i) => {
            const bottom = i >= 3;
            const k = i % 3;
            const x = LEFT + k * COL + (bottom ? SHIFT : 0);
            const style = {
              "--x": `${(x / TRACK).toFixed(3)}%`,
              "--y": `${bottom ? BOTTOM_ROW : TOP_ROW}%`,
            } as React.CSSProperties;
            return (
              <li key={text} className="adv-item" style={style}>
                <Clock angle={HANDS[i % HANDS.length]} />
                <span className="adv-line" aria-hidden="true" />
                <p className="adv-text">{text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
