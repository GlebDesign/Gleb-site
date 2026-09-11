import Reveal from "./Reveal";
import { cases, type CaseItem } from "@/lib/data";

function Card({ c }: { c: CaseItem }) {
  const inner = (
    <>
      {/* TODO: превью кейса — плейсхолдер до прихода скринов */}
      <div className="ph aspect-[16/10] rounded-[calc(var(--radius-card)-6px)]" data-label="TODO: превью" />
      <div className="mt-5">
        <h3 className="text-xl font-semibold leading-snug tracking-tight md:text-2xl">{c.result}</h3>
        <p className="mt-2 text-base leading-relaxed text-ink-2">{c.text}</p>
        <p className="mt-4 text-sm text-ink-2">{c.client}</p>
      </div>
      {c.href && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Читать кейс
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </>
  );
  const cls =
    "flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-bg-2 p-4 transition-colors md:p-5";
  return c.href ? (
    <a href={c.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:border-ink/40`}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export default function Cases() {
  return (
    <section id="cases" className="scroll-mt-20 py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <h2 className="h2 max-w-[820px]">{cases.title}</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {cases.items.map((c, i) => (
            <Reveal key={c.result} delay={(i % 3) * 0.06}>
              <Card c={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
