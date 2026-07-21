// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://akhetpacs.com",
  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    icon(),
    sitemap({
      i18n: {
        defaultLocale: "pt",
        locales: {
          pt: "pt-BR",
          en: "en",
          es: "es",
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});