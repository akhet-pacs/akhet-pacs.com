import type { Dict } from "./types";
import { pt } from "./pt";
import { en } from "./en";
import { es } from "./es";

export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];

const dicts: Record<Locale, Dict> = { pt, en, es };

export const localeNames: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

export function resolveLocale(value: string | undefined): Locale {
  return (locales as readonly string[]).includes(value ?? "") ? (value as Locale) : "pt";
}

export function useDict(value: string | undefined): Dict {
  return dicts[resolveLocale(value)];
}

export function localePath(locale: Locale): string {
  return locale === "pt" ? "/" : `/${locale}/`;
}
