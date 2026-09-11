import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const viewport: Viewport = {
  themeColor: "#f6f5f2",
  viewportFit: "cover",
};

/* Единый шрифт всего сайта — Playfair Display (по правке клиента). */
const serif = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif-display",
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
    <html lang="ru" className={serif.variable}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
