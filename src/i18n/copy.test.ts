import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { pt } from "./pt/index";
import { en } from "./en/index";
import { es } from "./es/index";
import { locales } from "./index";

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

/**
 * O title e a description são a única superfície do site que aparece na SERP.
 * Sem "DICOM" e "PACS" nelas o site só é encontrado por quem já sabe o nome
 * da marca — que é justamente quem ainda não existe num domínio novo.
 */
describe("meta title e description carregam as palavras-chave", () => {
  for (const locale of locales) {
    const { title, description } = dicts[locale].meta;

    it(`${locale}: title cita DICOM e PACS`, () => {
      expect(title).toMatch(/DICOM/i);
      expect(title).toMatch(/PACS/i);
    });

    it(`${locale}: title cabe na SERP (<= 60 caracteres)`, () => {
      expect(title.length).toBeLessThanOrEqual(60);
    });

    it(`${locale}: description cita DICOM e PACS`, () => {
      expect(description).toMatch(/DICOM/i);
      expect(description).toMatch(/PACS/i);
    });

    it(`${locale}: description cabe na SERP (<= 160 caracteres)`, () => {
      expect(description.length).toBeLessThanOrEqual(160);
    });
  }
});

describe("llms.txt conta a mesma história", () => {
  const llms = readFileSync(new URL("../../public/llms.txt", import.meta.url), "utf8");

  for (const term of banned.en) {
    it(`não usa "${term}"`, () => {
      expect(llms.toLowerCase()).not.toContain(term);
    });
  }
});

describe("cabeçalho da seção de FAQ", () => {
  for (const locale of locales) {
    it(`${locale} tem eyebrow e título da seção`, () => {
      const { eyebrow, title } = dicts[locale].faqSection;
      expect(eyebrow.length).toBeGreaterThan(0);
      expect(title.length).toBeGreaterThan(0);
    });

    it(`${locale} tem rótulo de navegação para o FAQ`, () => {
      expect(dicts[locale].nav.faq.length).toBeGreaterThan(0);
    });
  }
});
