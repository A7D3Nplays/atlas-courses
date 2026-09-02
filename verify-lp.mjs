import { chromium } from 'playwright-core';

const base = process.env.SITE_BASE || 'http://localhost:4173';
const hash = process.env.SITE_BASE ? '/#' : '';
const out = 'C:/Users/A7D3N/Documents/kimi/tasks/2026-09-02/21-27-29-2150b37b/atlas-courses/verify-shots';
const errors = [];

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('console', (m) => { if (m.type() === 'error') errors.push(`[console] ${m.text()}`); });
page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`));

// Landing page renders
await page.goto(`${base}${hash}/lp/typography-masters`, { waitUntil: 'networkidle' });
console.log('h1:', await page.locator('h1').first().textContent());

// Trailer play/pause
await page.getByRole('button', { name: 'Play course trailer' }).click();
await page.waitForTimeout(2500);
await page.getByRole('button', { name: 'Pause course trailer' }).click();
console.log('trailer play/pause ok, time:', await page.locator('.font-mono').filter({ hasText: /^\d{2}:\d{2}$/ }).first().textContent());

// Curriculum accordion: chapter 2 opens
await page.getByRole('button', { name: /The Grid as Negotiation/ }).click();
await page.waitForTimeout(400);

// FAQ accordion
await page.getByRole('button', { name: /How long do I have access/ }).click();
await page.waitForTimeout(400);

// Enroll -> cart drawer opens -> checkout link visible
await page.getByRole('button', { name: /Enroll —/ }).click();
await page.waitForTimeout(800);
console.log('drawer checkout link visible:', await page.getByRole('link', { name: 'Checkout', exact: true }).isVisible());

await page.screenshot({ path: `${out}/06-landing-top.png` });
await page.screenshot({ path: `${out}/06-landing-full.png`, fullPage: true });

await browser.close();
if (errors.length) {
  console.log('ERRORS:'); errors.forEach((e) => console.log(' ', e));
  process.exit(1);
}
console.log('LANDING PAGE CHECKS PASSED — no console/page errors');
