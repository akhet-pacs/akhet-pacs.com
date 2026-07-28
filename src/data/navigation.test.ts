import { describe, expect, it } from "vitest";
import { buildNavigation } from "./navigation";
import { locales } from "../i18n";

describe("navegação", () => {
  for (const locale of locales) {
    it(`${locale} inclui o FAQ apontando para a âncora certa`, () => {
      const item = buildNavigation(locale).find((entry) => entry.href.endsWith("#faq"));
      expect(item).toBeDefined();
      expect(item?.label.length).toBeGreaterThan(0);
    });
  }
});
