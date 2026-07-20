export type PricingConfig = {
  tierSize: number;
  firstPaidPrice: number;
  increment: number;
  ceiling: number;
  clientsSold: number;
  updatedAt: string;
};

export type TierState = "current" | "future";

export type Tier = {
  index: number;
  from: number;
  to: number;
  price: number;
  state: TierState;
};

export type PricingView = {
  tiers: Tier[];
  currentTierIndex: number;
  slotsRemaining: number;
  tierSize: number;
  takenInTier: number;
  ceilingPrice: number;
  updatedAt: string;
};

const WINDOW_SIZE = 5;

/**
 * Atualize `clientsSold` e `updatedAt` a cada venda fechada.
 * A data aparece na página — um contador velho continua honesto se datado.
 */
export const pricing: PricingConfig = {
  tierSize: 10,
  firstPaidPrice: 5,
  increment: 0.5,
  ceiling: 12,
  clientsSold: 0,
  updatedAt: "2026-07-20",
};

export function priceOf(config: PricingConfig, tierIndex: number): number {
  if (tierIndex <= 0) return 0;
  const raw = config.firstPaidPrice + (tierIndex - 1) * config.increment;
  return Math.min(raw, config.ceiling);
}

export function deriveTiers(config: PricingConfig): PricingView {
  const currentTierIndex = Math.floor(config.clientsSold / config.tierSize);
  const takenInTier = config.clientsSold % config.tierSize;

  const tiers: Tier[] = Array.from({ length: WINDOW_SIZE }, (_, offset) => {
    const index = currentTierIndex + offset;
    return {
      index,
      from: index * config.tierSize + 1,
      to: (index + 1) * config.tierSize,
      price: priceOf(config, index),
      state: offset === 0 ? "current" : "future",
    };
  });

  return {
    tiers,
    currentTierIndex,
    slotsRemaining: config.tierSize - takenInTier,
    tierSize: config.tierSize,
    takenInTier,
    ceilingPrice: config.ceiling,
    updatedAt: config.updatedAt,
  };
}

export type TickState = "taken" | "open" | "future";

export type Tick = {
  isBoundary: boolean;
  state: TickState;
};

/** Um tick por vaga, cobrindo toda a janela de faixas visível na régua. */
export function buildTicks(view: PricingView): Tick[] {
  const total = view.tiers.length * view.tierSize;

  return Array.from({ length: total }, (_, i) => ({
    isBoundary: i > 0 && i % view.tierSize === 0,
    state: i < view.takenInTier ? "taken" : i < view.tierSize ? "open" : "future",
  }));
}

/** Posição horizontal do cursor, em %, centrada na primeira vaga livre. */
export function cursorPercent(view: PricingView): number {
  const total = view.tiers.length * view.tierSize;
  return ((view.takenInTier + 0.5) / total) * 100;
}

export type CursorAlign = "start" | "center" | "end";

/**
 * Como ancorar o rótulo do cursor. Centrado ele vazaria para fora da régua
 * quando a posição está colada numa das pontas — o que acontece justamente
 * no caso mais comum: nenhuma vaga vendida ainda.
 */
export function cursorAlign(view: PricingView): CursorAlign {
  const percent = cursorPercent(view);
  if (percent < 12) return "start";
  if (percent > 88) return "end";
  return "center";
}

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatPrice(value: number): string {
  return brl.format(value);
}
