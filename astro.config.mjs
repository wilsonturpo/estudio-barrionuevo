import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const base = process.env.BASE_PATH || "/";
const site = process.env.SITE_URL;

export default defineConfig({
  base,
  integrations: site ? [sitemap()] : [],
  output: "static",
  site,
  trailingSlash: "always"
});
