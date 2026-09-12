/*
  Блок 7 «Обо мне». Референс: docs/refs/block-07-about.png — композиция берём (заголовок слева,
  фото-карточка справа, строки-статы с разделителями снизу), но секция переведена с
  оливково-зелёного фона референса на чёрный (унификация стиля, зелёный убран по правке клиента).
*/
import Image from "next/image";
import Reveal from "./Reveal";
import { about } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-black py-20 text-paper md:py-28">
      <div className="wrap grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
        <div>
          <Reveal>
            <h2 className="h-sans text-[34px] md:text-[44px]">{about.title}</h2>
            <p className="mt-5 max-w-[520px] text-[16px] leading-[1.4] text-paper-2 md:text-[17px]">
              {about.text}
            </p>
            <p className="mt-4 max-w-[520px] text-[15px] leading-[1.4] text-paper-2">
              {about.paragraph}
            </p>
          </Reveal>

          <div className="mt-8 divide-y divide-line-dark border-t border-line-dark md:mt-10">
            {about.stats.map((s) => (
              <div key={s.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                <span className="text-[18px] font-semibold md:text-[20px]">{s.title}</span>
                <span className="text-[14px] text-paper-2">{s.note}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line-dark pt-6 md:mt-10">
            <span className="label text-paper-2">Написать</span>
            <a href={about.contacts.telegram} target="_blank" rel="noopener noreferrer" className="text-[15px] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70">
              Telegram
            </a>
            <a href={about.contacts.max} target="_blank" rel="noopener noreferrer" className="text-[15px] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70">
              Max
            </a>
            <a href={about.contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[15px] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70">
              WhatsApp
            </a>
          </div>
        </div>

        <Reveal delay={0.1} className="h-full">
          <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[560px]">
            <Image src="/photos/gleb-about.jpg" alt={about.photoLabel} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
