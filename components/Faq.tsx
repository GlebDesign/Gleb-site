"use client";

/*
  Блок 12 «FAQ». Референс: docs/refs/block-12-faq.png (страница 1440 → 1 css px = 1.749 px картинки).
  Композиция 1-в-1: чёрный фон, сверху по центру знак «FAQ» антиквой (высота капители 100px)
  с индексом «(6)» сверху-справа, ниже аккордеон шириной 76.2% вьюпорта по центру.
  Строка: линия 1px (50% светлого), вопрос антиквой 32px, справа «+» 26px (раскрыт — повёрнут в «×»),
  ответ антиквой 19/23.4 под вопросом. Закрытая строка = 88px между линиями, открытая с 2 строками ответа = 180px.
*/
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { faq } from "@/lib/data";
import Reveal from "./Reveal";

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="scroll-mt-20 bg-black pt-[16px] pb-[72px] text-paper md:pt-[22px] md:pb-[120px]">
      <Reveal>
        <h2 className="text-center leading-none">
          <span className="relative inline-block font-serif text-[84px] leading-none tracking-[-0.03em] md:text-[clamp(120px,9.72vw,156px)]">
            {faq.title}
            <span
              className="absolute top-[6px] left-full ml-[8px] font-serif text-[16px] leading-none tracking-normal md:top-[9px] md:ml-[12px] md:text-[22px]"
              aria-label={`${faq.items.length} вопросов`}
            >
              ({faq.items.length})
            </span>
          </span>
        </h2>
      </Reveal>

      <div className="mx-auto mt-[40px] w-[calc(100%-40px)] border-t border-paper/50 md:mt-[58px] md:w-[76.2%]">
        {faq.items.map((item, i) => {
          const isOpen = openIdx === i;
          const panelId = `faq-panel-${i}`;
          const btnId = `faq-btn-${i}`;
          return (
            <div key={item.q} className="border-b border-paper/50 pb-[3px] md:pb-[4px]">
              <h3 className="m-0">
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-start justify-between gap-6 pt-[14px] pb-[19px] text-left md:pt-[18px] md:pb-[27px]"
                >
                  <span className="font-serif text-[22px] leading-[1.2] tracking-[-0.01em] text-paper md:text-[32px]">
                    {item.q}
                  </span>
                  {/* «+» 26×26, штрих 1px; раскрыт — поворот 45° даёт «×» ~19px, как в референсе */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 26 26"
                    className="mt-[3px] mr-[4px] h-[20px] w-[20px] shrink-0 text-paper/50 transition-transform duration-300 ease-out md:mt-[6px] md:mr-[10px] md:h-[26px] md:w-[26px]"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    <path d="M13 0v26M0 13h26" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    key="panel"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[1040px] pr-[40px] pb-[28px] font-serif text-[16px] leading-[1.35] text-paper md:pr-[80px] md:pb-[45px] md:text-[19px] md:leading-[23.4px]">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
