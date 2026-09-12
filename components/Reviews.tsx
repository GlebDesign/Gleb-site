/*
  Блок 8 «Отзывы». Референс: docs/refs/block-08-reviews.png — берём композицию: заголовок-антиква
  в 2 строки с плавающими лейблами вокруг, сетка карточек-цитат 3×2 с иконкой кавычек, именем и ролью.
  Упрощение: точные позиции плавающих лейблов не мерили пиксель-в-пиксель (референс — другой проект,
  число/длина реальных цитат клиента другие) — сделаны свободным облаком вокруг заголовка.
*/
import Image from "next/image";
import Reveal from "./Reveal";
import { reviews } from "@/lib/data";

function Quote({ item, i }: { item: (typeof reviews.items)[number]; i: number }) {
  return (
    <Reveal delay={(i % 3) * 0.06} className="mb-4 block break-inside-avoid">
      {item.video ? (
        <video controls preload="none" className="w-full bg-black">
          <source src="/reviews/video-review.mp4" />
        </video>
      ) : item.image && item.imageWidth && item.imageHeight ? (
        // Просто фото скрина в его реальной пропорции — без общей рамки-карточки на все отзывы.
        <Image
          src={item.image}
          alt={`Отзыв: ${item.name}`}
          width={item.imageWidth}
          height={item.imageHeight}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-auto w-full"
        />
      ) : (
        <div className="rounded-[var(--radius-card)] bg-cream-2 p-6">
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden className="text-accent">
            <path
              d="M0 20V11.6C0 4.6 4.3 0.8 11.2 0L12 3.6C7.8 4.7 6 7.3 6 11.2H11.2V20H0ZM16 20V11.6C16 4.6 20.3 0.8 27.2 0L28 3.6C23.8 4.7 22 7.3 22 11.2H27.2V20H16Z"
              fill="currentColor"
            />
          </svg>
          <p className="mt-4 text-[15px] leading-[1.45] text-ink">{item.text}</p>
        </div>
      )}

      <div className="mt-3">
        <p className="font-semibold text-ink">{item.name}</p>
        {item.role && <p className="mt-0.5 text-[13px] text-ink-2">{item.role}</p>}
      </div>
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

        <div className="mt-12 columns-1 gap-4 sm:columns-2 md:mt-16 lg:columns-3">
          {reviews.items.map((item, i) => (
            <Quote key={item.name + i} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
