import { expect, test } from "@playwright/test";

test("contact form explains required fields and does not send to a fictitious WhatsApp number", async ({ page }) => {
  await page.goto("/contacto/");
  const form = page.locator("[data-contact-form]");

  await form.getByRole("button", { name: "Preparar consulta segura" }).click();
  await expect(page.locator("[data-contact-status]")).toHaveText("Revise los campos obligatorios antes de continuar.");

  await page.locator("#contact-name").fill("Persona de prueba");
  await page.getByLabel("Trabajador/a").check();
  await page.locator("#contact-subject").fill("Consulta de prueba");
  await page.locator("#contact-description").fill("Mensaje de prueba sin datos personales sensibles.");
  await form.getByRole("button", { name: "Preparar consulta segura" }).click();

  await expect(page.locator("[data-contact-status]")).toContainText("Modo de demostración");
  await expect(page).toHaveURL(/\/contacto\/$/);
});

test("contact page links to the privacy draft and exposes an alternative channel", async ({ page }) => {
  await page.goto("/contacto/");
  await expect(page.getByRole("link", { name: "borrador de privacidad" })).toHaveAttribute("href", "/politica-de-privacidad/");
  await expect(page.locator("main").getByRole("link", { name: "contacto@estudio-ejemplo.invalid" })).toHaveAttribute("href", "mailto:contacto@estudio-ejemplo.invalid");
});
