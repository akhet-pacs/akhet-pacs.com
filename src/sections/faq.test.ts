import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Faq from "./Faq.astro";
import { pt } from "../i18n/pt/index";

/**
 * O FAQ vivia só no JSON-LD: o schema declarava perguntas que a página não
 * mostrava. Este teste garante que cada pergunta e cada resposta do dicionário
 * chega ao HTML renderizado.
 * Spec: docs/superpowers/specs/2026-07-28-copy-seo-onpage-design.md
 */
describe("seção de FAQ", () => {
  it("renderiza todas as perguntas e respostas do dicionário", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Faq);

    for (const item of pt.faq) {
      expect(html).toContain(item.q);
      expect(html).toContain(item.a);
    }
  });

  it("expõe a âncora #faq usada pela navegação", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Faq);

    expect(html).toContain('id="faq"');
  });
});
