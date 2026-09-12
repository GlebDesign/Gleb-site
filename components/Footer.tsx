"use client";

/*
  Блок 13 «Подвал». Референс: docs/refs/block-13-footer.png (страница 1440 → 1 css px = 1.749 px картинки).
  Композиция 1-в-1: фоновая фактура во весь блок (в референсе красный шёлк — ждём ассет, пока bg-black
  с мягким радиальным градиентом — унификация стиля, зелёный убран), по центру заголовок антиквой капслоком в 3 строки (капитель 62px, шаг строки 84),
  ниже три колонки на отступах 9.6%: соцсети подчёркнутыми ссылками (шаг 44.6) / телефон и почта по центру (шаг 44.6) /
  навигация справа (шаг 33). Внизу по центру кнопка 229×63 с обводкой 1px без заливки. Добавлена строка © (по заданию).
*/
import { footer, TG_URL } from "@/lib/data";

const linkCls =
  "text-paper underline decoration-1 underline-offset-[5px] transition-opacity hover:opacity-70";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contacts"
      className="relative scroll-mt-20 overflow-hidden bg-black pt-[28px] pb-[24px] text-paper md:pt-[19px]"
    >
      {/* TODO: ассет «фон подвала» — фактура во весь блок (в референсе красный шёлк). Пока плейсхолдер-градиент. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 35%, var(--color-black-2) 0%, var(--color-black) 62%, #000000 100%)",
        }}
      />
      <span
        aria-hidden="true"
        className="label pointer-events-none absolute top-2 left-3 text-[10px] text-paper/35"
      >
        TODO: фон подвала (фактура)
      </span>

      <div className="relative">
        <h2 className="mx-auto px-5 text-center font-serif text-[clamp(38px,10.4vw,44px)] leading-[0.955] font-normal tracking-[-0.02em] text-paper uppercase [text-wrap:wrap] md:max-w-[max(640px,54vw)] md:text-[clamp(72px,6.11vw,98px)]">
          {footer.title}
        </h2>

        {/* три колонки: лево / центр / право, поля 9.6% как в референсе; 375 — одна под другой */}
        <div className="mt-[44px] flex flex-col items-center gap-[36px] px-5 text-[19px] leading-[1.2] md:mt-[68px] md:grid md:grid-cols-3 md:items-start md:gap-6 md:px-[9.6%]">
          <ul className="flex flex-col items-center gap-[22px] md:items-start">
            {footer.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="max-w-[280px] text-center text-[13px] leading-[1.3] text-paper-2">
            {footer.requisites}
          </div>

          <nav aria-label="Навигация в подвале">
            <ul className="flex flex-col items-center gap-[10px] md:items-end">
              {footer.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkCls}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-[40px] flex justify-center px-5 md:mt-[47px]">
          <a
            href={TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[56px] w-[229px] items-center justify-center rounded-full bg-accent text-[16px] leading-none text-white transition-colors hover:bg-accent-deep md:h-[63px]"
          >
            {footer.button}
          </a>
        </div>

        <p className="mt-[28px] text-center text-[13px] leading-none text-paper-2">
          © {year} {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
