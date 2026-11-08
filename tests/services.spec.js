import { expect, test } from "@playwright/test";

const serviceSlugs = [
  "despido-arbitrario",
  "beneficios-sociales",
  "hostigamiento-laboral",
  "contratos-laborales",
  "asesoria-laboral-empresas",
  "inspecciones-sunafil"
];

test("services and FAQ are rendered from the published catalogue", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".service-card")).toHaveCount(5);
  await expect(page.locator(".faq-list__item")).toHaveCount(4);
  await page.locator(".faq-list__item").first().locator("summary").click();
  await expect(page.locator(".faq-list__item").first()).toHaveAttribute("open", "");
});

for (const slug of serviceSlugs) {
  test(`renders service detail for ${slug}`, async ({ page }) => {
    const response = await page.goto(`/servicios/${slug}/`);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.getByText("Alcance de la orientación inicial")).toBeVisible();
    await expect(page.getByRole("link", { name: "Volver a servicios" })).toBeVisible();
  });
}

test("reduced motion disables lengthy transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const duration = await page.locator(".button").first().evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(parseFloat(duration)).toBeLessThanOrEqual(0.01);
});
