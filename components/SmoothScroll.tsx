"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /*
      Закреплённая секция (Results) считает свою позицию один раз при монтировании.
      Картинки ниже по странице (кейсы, отзывы, фото) грузятся лениво и сдвигают разметку
      уже ПОСЛЕ этого расчёта и ПОСЛЕ window.load — секция может «застрять» не на своём месте.
      Фикс: следим за высотой документа и пересчитываем ScrollTrigger при любом её изменении.
    */
    let refreshTimer = 0;
    const refresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };
    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);

    // Якорные ссылки через Lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href")!);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      window.clearTimeout(refreshTimer);
      ro.disconnect();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
