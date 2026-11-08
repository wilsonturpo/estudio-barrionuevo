import { test } from "@playwright/test";

const reviewCases = [
  { name: "home-mobile", route: "/", viewport: { width: 390, height: 844 } },
  { name: "services-tablet", route: "/servicios/", viewport: { width: 768, height: 900 } },
  { name: "contact-desktop", route: "/contacto/", viewport: { width: 1440, height: 1000 } }
];

for (const review of reviewCases) {
  test(`captures ${review.name} for manual visual review`, async ({ page }) => {
    await page.setViewportSize(review.viewport);
    await page.goto(review.route);
    await page.screenshot({ path: `docs/audits/${review.name}.png`, fullPage: true });
  });
}
