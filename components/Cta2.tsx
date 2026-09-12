"use client";

/*
  Блок 11 «Призыв 2». Референс: docs/refs/block-11-cta2.png (страница 1440 → 1 css px = 1.749 px картинки).
  Композиция 1-в-1: очень светлый фон, по центру заголовок обычным гротеском, под ним подзаголовок
  (добавлен по комментарию клиента), ниже кнопка-пилюля 350×74 с текстом и стрелкой →.
  Замеры (1440): верх → верх заголовка 106, кнопка на 228 от верха, низ 147, высота блока ≈ 449.
*/
import { cta2, TG_URL } from "@/lib/data";
import Reveal from "./Reveal";

export default function Cta2() {
  return (
    <section
      id="cta2"
      className="scroll-mt-20 bg-cream-2 px-5 pt-[64px] pb-[88px] text-center md:pt-[100px] md:pb-[147px]"
    >
      <Reveal>
        <h2 className="mx-auto max-w-[1100px] font-serif text-[clamp(38px,5vw,72px)] leading-[1.02] font-normal tracking-[-0.01em] text-ink">
          {cta2.title}
        </h2>
        <p className="mx-auto mt-[12px] max-w-[520px] text-[15px] leading-[1.4] text-ink-2 md:mt-[16px] md:text-[16px]">
          {cta2.subtitle}
        </p>
        <a
          href={TG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[32px] inline-flex h-[60px] cursor-pointer items-center justify-center gap-[20px] rounded-[var(--radius-pill)] bg-accent px-[48px] text-[21px] leading-none text-paper transition-colors hover:bg-accent-deep md:mt-[46px] md:h-[74px] md:gap-[27px] md:pr-[97px] md:pl-[93px] md:text-[26px]"
        >
          <span>{cta2.button}</span>
          {/* стрелка 27×19, штрих 2.2 — как в референсе */}
          <svg
            aria-hidden="true"
            width="27"
            height="19"
            viewBox="0 0 27 19"
            fill="none"
            className="h-[15px] w-[21px] shrink-0 md:h-[19px] md:w-[27px]"
          >
            <path
              d="M1 9.5h24M17 1.5l8 8-8 8"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </Reveal>
    </section>
  );
}
