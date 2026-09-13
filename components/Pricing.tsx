import Reveal from "./Reveal";
import { pricing } from "@/lib/data";

/*
  Блок 5 «Сколько это стоит». Референс: docs/refs/block-05-pricing.png (2x).
  Замеры (CSS px при 1440): две карточки 676 + 16 + 677, высота 511, радиус 32,
  цифра 48/600 (cap 33), подпись 24/600, отступ сверху ~30, картинка с 134px до низа.
  Левая карточка белая («на рынке»), правая — персиковая (accent-soft, «у меня»).
*/

const numCls =
  "font-semibold leading-none tracking-[-0.03em] text-[clamp(27px,3.35vw,48px)] tabular-nums";
const capCls = "font-semibold leading-[1.2] text-[clamp(17px,1.67vw,24px)] tracking-[-0.01em]";

export default function Pricing() {
  const [priceRow, termRow] = pricing.compare.rows;
  const [marketLabel, meLabel] = pricing.compare.columns;

  return (
    <section id="pricing" className="scroll-mt-20 py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <h2 className="h-serif mx-auto max-w-[1100px] text-center text-[clamp(38px,5vw,72px)]">
            {pricing.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2">
          {/* Левая: на рынке */}
          <Reveal className="h-full">
            <article className="flex h-full min-h-[440px] flex-col overflow-hidden bg-cream-2 pt-6 text-center md:min-h-[511px] md:pt-[30px]">
              <div className="px-5 md:px-8">
                <span className="label text-ink-2">{marketLabel}</span>
                <p className={`${numCls} mt-2 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1`}>
                  <span className="whitespace-nowrap">{priceRow.market}</span>
                  <span className="whitespace-nowrap text-ink-2">{termRow.market}</span>
                </p>
                <p className={`${capCls} mx-auto mt-3 max-w-[560px]`}>{pricing.marketCaption}</p>
              </div>

              {/* Один скрин рынка вместо трёх (правка клиента) — TODO: файл ждём отдельно */}
              <div className="mt-auto px-4 pt-6 md:px-6 md:pt-8">
                {pricing.marketShots.map((label) => (
                  <div
                    key={label}
                    className="ph h-[260px] rounded-t-[14px] md:h-[340px] md:rounded-t-[18px]"
                    data-label={label}
                  />
                ))}
              </div>
            </article>
          </Reveal>

          {/* Правая: у меня */}
          <Reveal className="h-full" delay={0.08}>
            <article className="flex h-full min-h-[440px] flex-col overflow-hidden bg-accent-soft pt-6 text-center md:min-h-[511px] md:pt-[30px]">
              <div className="px-5 md:px-8">
                <span className="label text-ink/60">{meLabel}</span>
                <p className={`${numCls} mt-2 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1`}>
                  <span className="whitespace-nowrap">{pricing.price}</span>
                  <span className="whitespace-nowrap text-ink/60">{pricing.term}</span>
                </p>
                <p className={`${capCls} mt-3`}>
                  <span className="inline-block rounded-full bg-cream-2/85 px-4 py-1.5 md:px-5 md:py-2">
                    {pricing.badge}
                  </span>
                </p>
              </div>

              <div className="mt-6 px-5 pb-6 text-left md:mt-8 md:px-8 md:pb-8">
                <span className="label text-ink/60">{pricing.includesTitle}</span>
                <ul className="mt-3 grid gap-x-6 gap-y-2.5 text-[15px] leading-[1.3] sm:grid-cols-2 md:gap-y-3 md:text-[17px]">
                  {pricing.includes.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <svg
                        aria-hidden
                        viewBox="0 0 16 16"
                        className="mt-[3px] h-4 w-4 shrink-0 text-accent-deep"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 8.5l3.2 3L13 4.5" />
                      </svg>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
