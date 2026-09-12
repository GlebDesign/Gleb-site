import Reveal from "./Reveal";
import { problems } from "@/lib/data";
import "./Problems.css";

/* Линейные иконки в стиле референса (тонкие светлые контуры, изометрия).
   viewBox 96×78, толщина линии 2.5 — как в референсе (≈4.5px при 2x). */
const iconProps = {
  viewBox: "0 0 96 78",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons = [
  /* 01 — воронка: трафик сверху, одна заявка снизу */
  <svg key="funnel" {...iconProps} className="pr-icon">
    <ellipse cx="48" cy="21" rx="44" ry="9" />
    <path d="M4 21 L38 52 V68 M92 21 L58 52 V68" />
    <path d="M38 52 A10 3.5 0 0 0 58 52" />
    <ellipse cx="48" cy="68" rx="10" ry="3.5" />
    <circle cx="28" cy="5" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="48" cy="3" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="68" cy="5" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="48" cy="76" r="1.6" fill="currentColor" stroke="none" />
  </svg>,
  /* 02 — растущие столбики бюджета и стрелка вверх */
  <svg key="budget" {...iconProps} className="pr-icon">
    <path d="M8 60 H24 V76 H8 Z M8 60 L14 56 H30 L24 60 M24 60 L30 56 V72 L24 76" />
    <path d="M36 46 H52 V76 H36 Z M36 46 L42 42 H58 L52 46 M52 46 L58 42 V72 L52 76" />
    <path d="M64 30 H80 V76 H64 Z M64 30 L70 26 H86 L80 30 M80 30 L86 26 V72 L80 76" />
    <path d="M8 40 L34 30 L58 22 L88 6 M76 4 L88 6 L85 17" />
  </svg>,
  /* 03 — весы: маленький бюджет против больших запросов */
  <svg key="scales" {...iconProps} className="pr-icon">
    <ellipse cx="48" cy="73" rx="14" ry="4" />
    <path d="M48 69 V24" />
    <circle cx="48" cy="24" r="3" />
    <path d="M12 32 L84 16" />
    <path d="M12 32 L2 54 M12 32 L22 54" />
    <ellipse cx="12" cy="54" rx="11" ry="3.5" />
    <path d="M6 46 H16 V52 H6 Z M6 46 L9 43 H19 L16 46 M16 46 L19 43 V49 L16 52" />
    <path d="M84 16 L74 38 M84 16 L94 38" />
    <ellipse cx="84" cy="38" rx="11" ry="3.5" />
    <ellipse cx="84" cy="35" rx="4" ry="1.5" />
  </svg>,
  /* 04 — две карточки, выбрана соседняя */
  <svg key="compare" {...iconProps} className="pr-icon">
    <path d="M40 66 H10 A4 4 0 0 1 6 62 V18 A4 4 0 0 1 10 14 H40" />
    <path d="M14 26 H30 M14 34 H26 M14 42 H22" />
    <rect x="40" y="8" width="50" height="62" rx="4" />
    <path d="M48 20 H72 M48 28 H64" />
    <path d="M54 48 L62 56 L78 40" />
  </svg>,
];

export default function Problems() {
  const [before, after] = problems.title.split(problems.titleAccent);

  return (
    <section id="problems" className="scroll-mt-20 bg-black py-16 text-paper md:py-24">
      <div className="wrap">
        <div className="mx-auto max-w-[1252px]">
          <Reveal>
            <h2 className="h-sans pr-title">
              {before}
              <span className="mark-accent">{problems.titleAccent}</span>
              {after}
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-y-9 md:grid-cols-2 md:gap-y-12 lg:mt-[88px] lg:grid-cols-4 lg:gap-y-0">
            {problems.items.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="h-full">
                <article className="pr-col h-full">
                  <span className="pr-num">0{i + 1}</span>
                  {icons[i]}
                  <h3 className="h-serif pr-h">{p.title}</h3>
                  <p className="pr-text">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
