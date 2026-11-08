import { expect, test } from "@playwright/test";

const routes = ["/", "/nosotros/", "/servicios/", "/contacto/", "/politica-de-privacidad/"];

test.describe("primary navigation", () => {
  for (const route of routes) {
    test(`loads ${route} without page errors`, async ({ page }) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(route);

      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("main")).toBeVisible();
      expect(errors).toEqual([]);
    });
  }

  test("desktop navigation reaches each public section", async ({ page }) => {
    await page.goto("/");

    for (const link of ["Nosotros", "Servicios", "Contacto", "Inicio"]) {
      await page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: link }).click();
      await expect(page.locator("main h1")).toBeVisible();
    }
  });

  test("mobile menu opens, closes with Escape and has no focus trap", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 760 });
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Menú" });

    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Servicios" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(menuButton).toBeFocused();
  });

  test("essential navigation remains usable without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");

    await expect(page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Servicios" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await context.close();
  });
});
