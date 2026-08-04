import type { Dict } from "./types";
import { pt } from "./pt/index";
import { en } from "./en/index";
import { es } from "./es/index";

export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];

const dicts: Record<Locale, Dict> = { pt, en, es };

export const localeNames: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

/**
 * Tag BCP 47 do idioma — serve ao `lang` do documento, ao `hreflang` e ao
 * `Intl`. Só o português carrega região: pt-PT formata datas de outro jeito,
 * enquanto en e es ficam abertos para não estreitar o alvo do hreflang.
 */
export const localeTags: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

/** A mesma tag no formato que o Open Graph exige. */
export const ogLocales: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
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

/** Caminho de cada idioma, para quem precisa do mapa inteiro (redirecionamento). */
export function localePaths(): Record<Locale, string> {
  return Object.fromEntries(locales.map((code) => [code, localePath(code)])) as Record<
    Locale,
    string
  >;
}

export { interpolate, formatDate } from "./format";
