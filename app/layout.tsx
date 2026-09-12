import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const viewport: Viewport = {
  themeColor: "#f6f5f2",
  viewportFit: "cover",
};

/* Заголовки — Playfair Display. Наборный текст (всё остальное) — Inter Tight (правка клиента). */
const serif = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif-display",
});

const interTight = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "Глеб Жидель — разработка сайтов полного цикла",
  description:
    "Помогаю бизнесу выживать и расти, не увеличивая бюджет на рекламу. Сайты для привлечения платёжеспособных клиентов: 49 000 ₽, 7 дней, оплата после результата.",
  openGraph: {
    title: "Глеб Жидель — разработка сайтов полного цикла",
    description:
      "Сайты для привлечения платёжеспособных клиентов. 49 000 ₽ · 7 дней · оплата после получения результата.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${serif.variable} ${interTight.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
