import { describe, expect, it } from "vitest";
import { pt } from "./pt/index";
import { en } from "./en/index";
import { es } from "./es/index";

const dicts = { pt, en, es } as const;

type Guarded = keyof typeof dicts;

/**
 * Vocabulário que faz a clínica fundadora se ler como cobaia: contrapartida
 * declarada, trabalho de QA, coleta de dados, produto anunciado como incompleto.
 * Spec: docs/superpowers/specs/2026-07-27-copy-fundadoras-design.md
 */
const banned: Record<Guarded, readonly string[]> = {
  pt: ["em troca", "feedback", "reportar", "precisa de gente", "atrapalha", "participar"],
  en: ["in return", "feedback", "bug report", "needs people", "take part", "gets in the way"],
  es: ["a cambio", "feedback", "reportar", "necesita gente", "participar", "estorba"],
};

/** Locales já limpos. Cada tarefa do plano acrescenta um. */
const guarded: readonly Guarded[] = ["pt", "en", "es"];

function allStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) allStrings(item, out);
  else if (value && typeof value === "object")
    for (const item of Object.values(value)) allStrings(item, out);
  return out;
}

describe("copy das fundadoras", () => {
  for (const locale of guarded) {
    for (const term of banned[locale]) {
      it(`${locale} não usa "${term}"`, () => {
        const hits = allStrings(dicts[locale]).filter((text) =>
          text.toLowerCase().includes(term),
        );
        expect(hits).toEqual([]);
      });
    }
  }
});
