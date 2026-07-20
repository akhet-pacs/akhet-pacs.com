import { describe, expect, it } from "vitest";
import { deriveTiers, formatPrice, priceOf, type PricingConfig } from "./pricing";

const base: PricingConfig = {
  tierSize: 10,
  firstPaidPrice: 5,
  increment: 0.5,
  ceiling: 12,
  clientsSold: 7,
  updatedAt: "2026-07-20",
};

describe("priceOf", () => {
  it("a faixa dos fundadores é gratuita", () => {
    expect(priceOf(base, 0)).toBe(0);
  });

  it("a primeira faixa paga usa o preço inicial", () => {
    expect(priceOf(base, 1)).toBe(5);
  });

  it("cada faixa seguinte soma o incremento", () => {
    expect(priceOf(base, 2)).toBe(5.5);
    expect(priceOf(base, 3)).toBe(6);
  });

  it("trava no teto e nunca passa dele", () => {
    expect(priceOf(base, 15)).toBe(12);
    expect(priceOf(base, 16)).toBe(12);
    expect(priceOf(base, 400)).toBe(12);
  });
});

describe("deriveTiers", () => {
  it("com 7 vendidos, restam 3 vagas na faixa dos fundadores", () => {
    const view = deriveTiers(base);
    expect(view.currentTierIndex).toBe(0);
    expect(view.slotsRemaining).toBe(3);
    expect(view.takenInTier).toBe(7);
  });

  it("sem nenhum cliente, a faixa inteira está livre", () => {
    const view = deriveTiers({ ...base, clientsSold: 0 });
    expect(view.currentTierIndex).toBe(0);
    expect(view.slotsRemaining).toBe(10);
    expect(view.takenInTier).toBe(0);
  });

  it("no múltiplo exato da faixa, abre a próxima com todas as vagas livres", () => {
    const view = deriveTiers({ ...base, clientsSold: 10 });
    expect(view.currentTierIndex).toBe(1);
    expect(view.slotsRemaining).toBe(10);
    expect(view.takenInTier).toBe(0);
  });

  it("devolve uma janela de 5 faixas começando na atual", () => {
    const view = deriveTiers({ ...base, clientsSold: 25 });
    expect(view.tiers).toHaveLength(5);
    expect(view.tiers[0].index).toBe(2);
    expect(view.tiers[4].index).toBe(6);
  });

  it("só a primeira faixa da janela é a atual", () => {
    const view = deriveTiers(base);
    expect(view.tiers[0].state).toBe("current");
    expect(view.tiers.slice(1).every((t) => t.state === "future")).toBe(true);
  });

  it("a faixa n cobre os clientes de n*10+1 a (n+1)*10", () => {
    const view = deriveTiers(base);
    expect(view.tiers[0].from).toBe(1);
    expect(view.tiers[0].to).toBe(10);
    expect(view.tiers[1].from).toBe(11);
    expect(view.tiers[1].to).toBe(20);
  });

  it("expõe o teto para a UI mostrar onde a escada para", () => {
    expect(deriveTiers(base).ceilingPrice).toBe(12);
  });
});

describe("formatPrice", () => {
  // Intl separa "R$" do valor com espaço não-quebrável (U+00A0); normalizamos
  // antes de comparar para o teste não quebrar por um caractere invisível.
  const normalize = (s: string) => s.replace(/ /g, " ");

  it("formata em reais no padrão brasileiro", () => {
    expect(normalize(formatPrice(5.5))).toBe("R$ 5,50");
    expect(normalize(formatPrice(12))).toBe("R$ 12,00");
  });
});
