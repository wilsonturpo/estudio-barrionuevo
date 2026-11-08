import { expect, test } from "@playwright/test";

test("contact page keeps channels disabled until their publication", async ({ page }) => {
  await page.goto("/contacto/");

  await expect(page.getByRole("heading", { name: "Canales de contacto en actualización." })).toBeVisible();
  await expect(page.getByText("Esta página no solicita ni almacena información personal.")).toBeVisible();
  await expect(page.locator("[data-contact-form]")).toHaveCount(0);
});

test("contact page does not expose placeholder contact destinations", async ({ page }) => {
  await page.goto("/contacto/");
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator('a[href^="https://wa.me/"]')).toHaveCount(0);
});
