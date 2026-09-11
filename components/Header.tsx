"use client";

/*
  Компактная фиксированная шапка. На первом экране навигация живёт внутри cream-панели
  (см. Hero.tsx — как в референсе Anna Mihu); эта шапка появляется, когда #top
  уходит из вьюпорта. Дополнение к референсу — см. сдачу.
*/

import { useEffect, useState } from "react";
import { nav, hero } from "@/lib/data";
import { useLeadModal } from "./LeadModal";

export default function Header() {
  const [shown, setShown] = useState(false);
  const open = useLeadModal();

  useEffect(() => {
    const top = document.getElementById("top");
    if (!top) return;
    const io = new IntersectionObserver(
      ([e]) => setShown(!e.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 },
    );
    io.observe(top);
    return () => io.disconnect();
  }, []);

  return (
    <header
      aria-hidden={!shown}
      className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-md transition-transform duration-300 ease-out ${
        shown ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <a href="#top" className="font-serif text-[20px] leading-none tracking-[-0.02em] text-ink" tabIndex={shown ? 0 : -1}>
          {hero.photoCaption}
        </a>
        <nav aria-label="Разделы" className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              tabIndex={shown ? 0 : -1}
              className="text-[13px] text-ink-2 transition-colors hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={open}
          tabIndex={shown ? 0 : -1}
          className="inline-flex h-10 items-center rounded-full bg-accent px-5 text-[14px] font-semibold text-white transition-colors hover:bg-accent-deep"
        >
          {hero.cta}
        </button>
      </div>
    </header>
  );
}
