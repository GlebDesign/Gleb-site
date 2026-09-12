"use client";

/*
  Блок 1 «Первый экран» — композиция Anna Mihu (docs/refs/block-01-hero.png) 1-в-1:
  слева фото с отступом 24px/10px и антиквенной надписью поверх, справа cream-панель
  с вертикальной навигацией (шапка), меткой справа, центрированным заголовком,
  подзаголовком и кнопкой. Кнопка — классическая пилюля (block-01-button-sample.png).
  Замеры референса: страница 2534px @2x → коэффициент к 1440 = 0.568.
*/

import Image from "next/image";
import Reveal from "./Reveal";
import { hero, nav, TG_URL } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="top"
      className="scroll-mt-20 relative bg-cream md:grid md:min-h-[max(100svh,680px)] md:grid-cols-[49.1%_50.9%]"
    >
      {/* Фото: отступ слева 24px (1.66%), сверху 10px, до низа экрана; на мобиле 4:5 */}
      <div className="relative aspect-[4/5] md:aspect-auto md:ml-[1.667vw] md:mt-[10px] md:min-h-0">
        <Image
          src="/photos/gleb-hero.jpg"
          alt={hero.photoCaption}
          fill
          priority
          sizes="(min-width: 768px) 49vw, 100vw"
          className="h-full w-full object-cover"
        />
        {/* Надпись поверх фото — как «ANNA MIHU»: капитель 83px при 1440, слева 26px, сверху 24px */}
        <div
          className="pointer-events-none absolute left-[3.8%] top-[2.9%] font-serif font-normal leading-none tracking-[-0.04em] text-paper md:left-[21px] md:top-[calc(24px-0.14em)] md:text-[7.7vw] text-[15.5vw] whitespace-nowrap"
          aria-hidden
        >
          {hero.photoCaption}
        </div>
        <span className="sr-only">{hero.photoCaption}</span>
      </div>

      {/* Правая панель */}
      <div className="relative grid grid-rows-[auto_auto] px-5 pb-12 pt-8 md:grid-rows-[3fr_auto_1fr] md:px-[6%] md:pb-0 md:pt-0">
        {/* Шапка: вертикальная навигация слева, метка справа (в референсе «ES») */}
        <div className="row-start-1 flex items-start justify-between md:absolute md:inset-x-0 md:top-0">
          <nav
            aria-label="Разделы"
            className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] leading-5 text-ink-2/65 md:ml-[25px] md:mt-[8px] md:flex-col md:gap-0"
          >
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-ink">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href={TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] leading-5 text-ink-2/65 transition-colors hover:text-ink md:mr-[27px] md:mt-[8px]"
          >
            Telegram
          </a>
        </div>

        {/* Оффер: центр панели, ширина текстового блока 560/340px */}
        <div className="row-start-2 mt-8 flex flex-col items-center text-center md:mt-0">
          <Reveal>
            {/* Отступление: плашка hero.badge, в референсе Anna Mihu её нет */}
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[12px] font-medium leading-none text-ink-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {hero.badge}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-[620px] font-serif text-[34px] font-normal leading-[0.92] tracking-[-0.02em] text-balance text-ink md:text-[48px] md:leading-[0.89]">
              {hero.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[340px] text-[15px] leading-[1.25] text-ink md:mt-[43px] md:text-[14px] md:leading-[17px]">
              {hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col items-center md:mt-[50px]">
              {/* Кнопка по образцу block-01-button-sample: пилюля 56px, паддинг 34px, 16px/600 */}
              <a
                href={TG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full bg-accent px-[34px] text-[16px] font-semibold text-white transition-colors hover:bg-accent-deep"
              >
                {hero.cta}
              </a>
              <p className="mt-3 max-w-[340px] text-[12px] leading-[1.4] text-ink-2">{hero.ctaNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
