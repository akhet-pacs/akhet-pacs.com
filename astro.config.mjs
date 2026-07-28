// @ts-check
import { defineConfig, fontProviders } from "astro/config";
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
  // As fontes são baixadas no build e servidas pelo próprio domínio. Vindas do
  // Google Fonts elas custavam ~550ms de FCP/LCP em 4G: o CSS de terceiro
  // bloqueia a renderização e só então dispara o download do .woff2 no gstatic.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Archivo",
      cssVariable: "--font-archivo",
      weights: [500, 700, 800],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
    },
    {
      provider: fontProviders.google(),
      name: "IBM Plex Mono",
      cssVariable: "--font-ibm-plex-mono",
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
    },
    {
      provider: fontProviders.google(),
      name: "Source Serif 4",
      cssVariable: "--font-source-serif",
      weights: ["400 600"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
    },
  ],
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