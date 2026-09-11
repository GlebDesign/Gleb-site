/*
  Скриншот блока с dev-сервера для сверки с референсом.
    node scripts/shot.mjs <id|full> <out.png> [width=1440]
  Страница сначала прокручивается целиком (срабатывают появления по скроллу),
  затем снимается блок по id или вся страница (full).
*/
import { chromium } from "playwright";

const [, , id = "full", out = "shot.png", widthArg = "1440"] = process.argv;
const width = Number(widthArg);
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width, height: Math.round(width * 0.625) },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text().split("\n")[0]));
page.on("pageerror", (e) => errors.push(String(e).split("\n")[0]));
await page.goto("http://localhost:3001/", { waitUntil: "networkidle" });

// прогреть появления: прокрутить всю страницу шагами по половине экрана
const total = await page.evaluate(() => document.body.scrollHeight);
const step = Math.round(width * 0.3);
for (let y = 0; y < total; y += step) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(60);
}
await page.waitForTimeout(900);

if (id === "full") {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: out, fullPage: true });
} else {
  const el = page.locator(`#${id}`).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await el.screenshot({ path: out });
  const box = await el.boundingBox();
  console.log(`#${id}: ${Math.round(box.width)}x${Math.round(box.height)}`);
}
if (errors.length) console.log("CONSOLE ERRORS:\n" + [...new Set(errors)].join("\n"));
await browser.close();
console.log("saved " + out);
