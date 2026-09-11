/*
  Блок 8 «Отзывы». Референс: docs/refs/block-08-reviews.png — берём композицию: заголовок-антиква
  в 2 строки с плавающими лейблами вокруг, сетка карточек-цитат 3×2 с иконкой кавычек, именем и ролью.
  Упрощение: точные позиции плавающих лейблов не мерили пиксель-в-пиксель (референс — другой проект,
  число/длина реальных цитат клиента другие) — сделаны свободным облаком вокруг заголовка.
*/
import Reveal from "./Reveal";
import { reviews } from "@/lib/data";

function Quote({ item, i }: { item: (typeof reviews.items)[number]; i: number }) {
  return (
    <Reveal delay={(i % 3) * 0.06} className="h-full">
      <article className="flex h-full flex-col rounded-[var(--radius-card)] bg-cream-2 p-6 md:p-7">
        <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden className="text-accent">
          <path
            d="M0 20V11.6C0 4.6 4.3 0.8 11.2 0L12 3.6C7.8 4.7 6 7.3 6 11.2H11.2V20H0ZM16 20V11.6C16 4.6 20.3 0.8 27.2 0L28 3.6C23.8 4.7 22 7.3 22 11.2H27.2V20H16Z"
            fill="currentColor"
          />
        </svg>

        {item.video ? (
          <div className="mt-4">
            <video controls preload="none" className="w-full rounded-[calc(var(--radius-card)-8px)] bg-black">
              <source src="/reviews/video-review.mp4" />
            </video>
          </div>
        ) : (
          <p className="mt-4 flex-1 text-[15px] leading-[1.45] text-ink">{item.text}</p>
        )}

        <div className="mt-6">
          <p className="font-semibold text-ink">{item.name}</p>
          {item.role && <p className="mt-0.5 text-[13px] text-ink-2">{item.role}</p>}
        </div>
      </article>
    </Reveal>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-cream py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <div className="relative mx-auto max-w-[720px] text-center">
            <h2 className="h-serif text-[38px] leading-[0.98] md:text-[56px]">
              {reviews.title}
              <br />
              {reviews.titleLine2}
            </h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {reviews.floating.map((label, i) => (
                <span
                  key={label}
                  className="label rounded-full bg-accent-soft/70 px-3.5 py-1.5 text-ink"
                  style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (2 + i)}deg)` }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {reviews.items.map((item, i) => (
            <Quote key={item.name + i} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
