# Seção Planos — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar ao site uma seção "Planos" que mostra o preço em escada (10 primeiros clientes grátis vitalício, +R$ 0,50 por licença a cada 10 clientes, teto de R$ 12,00) com uma régua graduada de vagas.

**Architecture:** Uma função pura em `src/data/pricing.ts` deriva as faixas a partir de uma config; um componente `PriceRuler.astro` desenha a régua recebendo faixas prontas por props; `Plans.astro` monta cabeçalho, régua e oferta. Copy nos três idiomas via `Dict` tipado.

**Tech Stack:** Astro 7, Tailwind v4, TypeScript strict, Vitest (novo neste projeto).

**Spec:** `docs/superpowers/specs/2026-07-20-secao-planos-design.md`
**Referência visual:** `superdesign/design_iterations/se__o__planos___pric_3.html`

## Global Constraints

- Branch de trabalho: `feat/secao-planos`. **Nunca commitar em `main`** — push em `main` dispara deploy automático no GitHub Pages.
- Limite de **200 linhas por arquivo**.
- **Nenhum valor de cor literal fora de `src/styles/base/tokens.css`.** Use `var(--accent)`, `var(--ink-faint)`, etc.
- Estilo de componente vive no `<style>` escopado do próprio `.astro`. Só sobe para `styles/components/` se for usado por mais de uma seção.
- Classes seguem BEM: `.ruler__tick`, `.plans__price`.
- Reusar as classes globais existentes: `.section`, `.shell`, `.section-header`, `.section-header--spaced`, `.eyebrow`, `.lede`, `.meta`, `.tabular`, `.btn`, `.btn--solid`, `.cluster`.
- Os três idiomas (`pt`, `en`, `es`) exibem valores em **R$**, sem conversão.
- Parâmetros de preço (do spec): `tierSize: 10`, `firstPaidPrice: 5.00`, `increment: 0.50`, `ceiling: 12.00`.

---

### Task 1: Lógica de preço (`deriveTiers`)

**Files:**
- Create: `src/data/pricing.ts`
- Create: `src/data/pricing.test.ts`
- Modify: `package.json` (adicionar Vitest e o script `test`)

**Interfaces:**
- Consumes: nada (primeira task)
- Produces:
  - `type PricingConfig = { tierSize: number; firstPaidPrice: number; increment: number; ceiling: number; clientsSold: number; updatedAt: string }`
  - `type TierState = "current" | "future"`
  - `type Tier = { index: number; from: number; to: number; price: number; state: TierState }`
  - `type PricingView = { tiers: Tier[]; currentTierIndex: number; slotsRemaining: number; tierSize: number; takenInTier: number; ceilingPrice: number; updatedAt: string }`
  - `const pricing: PricingConfig`
  - `function priceOf(config: PricingConfig, tierIndex: number): number`
  - `function deriveTiers(config: PricingConfig): PricingView`
  - `function formatPrice(value: number): string`

- [ ] **Step 1: Instalar o Vitest**

```bash
npm install -D vitest@^3
```

- [ ] **Step 2: Adicionar o script de teste**

Em `package.json`, dentro de `"scripts"`, acrescente a linha `"test"` (mantenha as demais):

```json
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "test": "vitest run"
  },
```

- [ ] **Step 3: Escrever os testes que falham**

Crie `src/data/pricing.test.ts` com exatamente este conteúdo:

```ts
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
  // Intl separa "R$" do valor com espa\u00e7o n\u00e3o-quebr\u00e1vel (U+00A0); normalizamos
  // antes de comparar para o teste n\u00e3o quebrar por um caractere invis\u00edvel.
  const normalize = (s: string) => s.replace(/\u00a0/g, " ");

  it("formata em reais no padr\u00e3o brasileiro", () => {
    expect(normalize(formatPrice(5.5))).toBe("R$ 5,50");
    expect(normalize(formatPrice(12))).toBe("R$ 12,00");
  });
});
```

- [ ] **Step 4: Rodar os testes e confirmar que falham**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./pricing"` (o arquivo ainda não existe).

- [ ] **Step 5: Implementar a lógica**

Crie `src/data/pricing.ts`:

```ts
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
  clientsSold: 7,
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

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatPrice(value: number): string {
  return brl.format(value);
}
```

- [ ] **Step 6: Rodar os testes e confirmar que passam**

Run: `npm test`
Expected: PASS — 12 testes passando.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json src/data/pricing.ts src/data/pricing.test.ts
git commit -m "feat(planos): lógica de faixas de preço com testes"
```

---

### Task 2: Copy nos três idiomas

**Files:**
- Modify: `src/i18n/types.ts` (acrescentar `plans` ao `Dict` e `planos` a `nav`)
- Create: `src/i18n/pt/plans.ts`
- Create: `src/i18n/en/plans.ts`
- Create: `src/i18n/es/plans.ts`
- Modify: `src/i18n/pt/index.ts`, `src/i18n/en/index.ts`, `src/i18n/es/index.ts`
- Modify: `src/i18n/pt/chrome.ts`, `src/i18n/en/chrome.ts`, `src/i18n/es/chrome.ts`

**Interfaces:**
- Consumes: nada da Task 1
- Produces: `Dict["plans"]` com as chaves `eyebrow`, `titleLines`, `lede`, `rulerStart`, `rulerEnd`, `rulerAria`, `tierCurrentLabel`, `freeLabel`, `freeSub`, `slotsRemaining`, `cursorLabel`, `ctaText`, `nextTierNote`, `ceilingNote`, `fineprint`, `updatedAtLabel`; e `Dict["nav"]["planos"]`.

Como o `Dict` é tipado, esquecer uma tradução vira erro de tipo em vez de bug em produção. É por isso que o tipo entra antes da copy.

- [ ] **Step 1: Acrescentar o tipo**

Em `src/i18n/types.ts`, altere o campo `nav` dentro de `Dict` para incluir `planos`:

```ts
  nav: { agora: string; visualizador: string; roadmap: string; planos: string; construir: string };
```

E acrescente este bloco ao `Dict` (logo depois de `roadmap`):

```ts
  plans: {
    eyebrow: string;
    titleLines: [string, string];
    lede: string;
    rulerStart: string;
    rulerEnd: string;
    rulerAria: string;
    tierCurrentLabel: string;
    freeLabel: string;
    freeSub: string;
    slotsRemaining: string;
    cursorLabel: string;
    ctaText: string;
    nextTierNote: string;
    ceilingNote: string;
    fineprint: string;
    updatedAtLabel: string;
  };
```

- [ ] **Step 2: Confirmar que o type check falha**

Run: `npx astro check`
Expected: FAIL — erros em `src/i18n/pt/index.ts`, `en/index.ts` e `es/index.ts` dizendo que falta a propriedade `plans` no tipo `Dict`.

- [ ] **Step 3: Escrever a copy em português**

Crie `src/i18n/pt/plans.ts`:

```ts
export const plans = {
  eyebrow: "Planos",
  titleLines: ["Uma régua.", " E você está no começo dela."] as [string, string],
  lede:
    "O preço por licença sobe R$ 0,50 a cada dez clientes. Onde você entrar, ali seu preço fica — travado, enquanto a assinatura durar.",
  rulerStart: "Faixa atual",
  rulerEnd: "Próximas faixas",
  rulerAria:
    "Régua de preços: a faixa atual tem {taken} de {size} vagas ocupadas; as faixas seguintes custam mais R$ 0,50 por licença cada.",
  tierCurrentLabel: "Faixa aberta agora · Fundadores",
  freeLabel: "Grátis",
  freeSub: "Acesso vitalício, por licença de usuário",
  slotsRemaining: "vagas restantes",
  cursorLabel: "{count} vagas até o preço subir",
  ctaText: "Quero uma das vagas",
  nextTierNote:
    "Quando a última vaga for preenchida, esta faixa fecha e não reabre. A próxima começa em {price} por licença.",
  ceilingNote: "A escada para em {price} por licença. Acima disso o preço não sobe mais.",
  fineprint:
    "Valores por licença de usuário, por mês. Reajustes de faixa valem somente para novos clientes — quem já assinou mantém o preço de entrada.",
  updatedAtLabel: "Vagas conferidas em {date}",
} as const;
```

- [ ] **Step 4: Escrever a copy em inglês**

Crie `src/i18n/en/plans.ts`:

```ts
export const plans = {
  eyebrow: "Pricing",
  titleLines: ["A ruler.", " And you're at the start of it."] as [string, string],
  lede:
    "The price per licence goes up R$ 0.50 every ten customers. Wherever you join, that's where your price stays — locked, for as long as your subscription runs.",
  rulerStart: "Current tier",
  rulerEnd: "Next tiers",
  rulerAria:
    "Pricing ruler: the current tier has {taken} of {size} seats taken; each following tier costs R$ 0.50 more per licence.",
  tierCurrentLabel: "Open now · Founders",
  freeLabel: "Free",
  freeSub: "Lifetime access, per user licence",
  slotsRemaining: "seats left",
  cursorLabel: "{count} seats until the price rises",
  ctaText: "Claim a seat",
  nextTierNote:
    "When the last seat is taken, this tier closes and does not reopen. The next one starts at {price} per licence.",
  ceilingNote: "The ladder stops at {price} per licence. It does not rise beyond that.",
  fineprint:
    "Prices are per user licence, per month, in Brazilian reais. Tier increases apply only to new customers — if you have already subscribed, you keep your entry price.",
  updatedAtLabel: "Seats verified on {date}",
} as const;
```

- [ ] **Step 5: Escrever a copy em espanhol**

Crie `src/i18n/es/plans.ts`:

```ts
export const plans = {
  eyebrow: "Planes",
  titleLines: ["Una regla.", " Y estás al principio de ella."] as [string, string],
  lede:
    "El precio por licencia sube R$ 0,50 cada diez clientes. Donde entres, ahí se queda tu precio — fijo, mientras dure la suscripción.",
  rulerStart: "Tramo actual",
  rulerEnd: "Próximos tramos",
  rulerAria:
    "Regla de precios: el tramo actual tiene {taken} de {size} plazas ocupadas; cada tramo siguiente cuesta R$ 0,50 más por licencia.",
  tierCurrentLabel: "Tramo abierto ahora · Fundadores",
  freeLabel: "Gratis",
  freeSub: "Acceso vitalicio, por licencia de usuario",
  slotsRemaining: "plazas restantes",
  cursorLabel: "{count} plazas hasta que suba el precio",
  ctaText: "Quiero una plaza",
  nextTierNote:
    "Cuando se ocupe la última plaza, este tramo se cierra y no vuelve a abrir. El siguiente empieza en {price} por licencia.",
  ceilingNote: "La escalera se detiene en {price} por licencia. No sube más allá de eso.",
  fineprint:
    "Valores por licencia de usuario, al mes, en reales brasileños. Los aumentos de tramo se aplican solo a clientes nuevos — quien ya se suscribió mantiene su precio de entrada.",
  updatedAtLabel: "Plazas verificadas el {date}",
} as const;
```

- [ ] **Step 6: Acrescentar o item de menu nos três `chrome.ts`**

Em `src/i18n/pt/chrome.ts`, dentro de `nav`, entre `roadmap` e `construir`:

```ts
    planos: "Planos",
```

Em `src/i18n/en/chrome.ts`, no mesmo lugar:

```ts
    planos: "Pricing",
```

Em `src/i18n/es/chrome.ts`, no mesmo lugar:

```ts
    planos: "Planes",
```

- [ ] **Step 7: Ligar os dicionários**

Em `src/i18n/pt/index.ts`, acrescente o import e a propagação:

```ts
import type { Dict } from "../types";
import { chrome } from "./chrome";
import { sections } from "./sections";
import { features } from "./features";
import { roadmap } from "./roadmap";
import { plans } from "./plans";

export const pt: Dict = { ...chrome, ...sections, ...features, ...roadmap, plans };
```

Faça a mesma alteração em `src/i18n/en/index.ts` (variável `en`) e `src/i18n/es/index.ts` (variável `es`), trocando apenas o nome da constante exportada.

- [ ] **Step 8: Confirmar que o type check passa**

Run: `npx astro check`
Expected: PASS — 0 errors.

- [ ] **Step 9: Commit**

```bash
git add src/i18n
git commit -m "feat(planos): copy da seção Planos em pt, en e es"
```

---

### Task 3: Componente da régua

**Files:**
- Create: `src/components/PriceRuler.astro`

**Interfaces:**
- Consumes: `type PricingView`, `type Tier`, `formatPrice` de `src/data/pricing.ts` (Task 1); `Dict["plans"]` (Task 2)
- Produces: componente `<PriceRuler view={...} t={...} />` com `Props = { view: PricingView; t: Dict["plans"] }`

A régua desenha `tiers.length * tierSize` ticks (5 × 10 = 50). Ela não calcula preço nenhum — recebe tudo pronto. É o que a mantém abaixo de 200 linhas e testável de olho.

- [ ] **Step 1: Criar o componente**

Crie `src/components/PriceRuler.astro`:

```astro
---
import { formatPrice, type PricingView } from "../data/pricing";
import type { Dict } from "../i18n/types";

interface Props {
  view: PricingView;
  t: Dict["plans"];
}

const { view, t } = Astro.props;

const totalTicks = view.tiers.length * view.tierSize;
const ticks = Array.from({ length: totalTicks }, (_, i) => ({
  isBoundary: i > 0 && i % view.tierSize === 0,
  state: i < view.takenInTier ? "taken" : i < view.tierSize ? "open" : "future",
}));

const cursorPercent = ((view.takenInTier + 0.5) / totalTicks) * 100;
const ariaLabel = t.rulerAria
  .replace("{taken}", String(view.takenInTier))
  .replace("{size}", String(view.tierSize));
const cursorLabel = t.cursorLabel.replace("{count}", String(view.slotsRemaining));
---

<div class="ruler">
  <p class="ruler__caption meta">
    <span>{t.rulerStart}</span>
    <span>{t.rulerEnd}</span>
  </p>

  <ol class="ruler__marks">
    {
      view.tiers.map((tier) => (
        <li class="mark" data-state={tier.state}>
          <span class="mark__price tabular">
            {tier.price === 0 ? t.freeLabel : formatPrice(tier.price)}
          </span>
          <span class="mark__range tabular">{tier.from}—{tier.to}</span>
        </li>
      ))
    }
  </ol>

  <div class="ruler__track" role="img" aria-label={ariaLabel}>
    {ticks.map((tick) => <span class="ruler__tick" data-state={tick.state} data-boundary={tick.isBoundary ? "" : undefined} />)}
  </div>

  <div class="ruler__cursor">
    <div class="ruler__pin" style={`left: ${cursorPercent}%`}>
      <span class="ruler__arrow" aria-hidden="true"></span>
      <span class="ruler__label">{cursorLabel}</span>
    </div>
  </div>
</div>

<style>
  .ruler__caption {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .ruler__marks {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: end;
    gap: 1px;
    margin: 0 0 0.75rem;
    padding: 0;
    list-style: none;
  }

  .mark {
    position: relative;
    padding-bottom: 1rem;
    text-align: center;
  }

  .mark::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 1px;
    height: 0.625rem;
    background: var(--rule-strong);
  }

  .mark__price {
    display: block;
    font-size: 1rem;
    color: var(--ink-faint);
  }

  .mark__range {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.625rem;
    letter-spacing: 0.1em;
    color: var(--ink-faint);
    opacity: 0.7;
  }

  .mark[data-state="current"] .mark__price {
    font-size: 1.375rem;
    color: var(--accent-bright);
  }

  .mark[data-state="current"] .mark__range {
    color: var(--accent);
    opacity: 1;
  }

  .mark[data-state="current"]::after {
    height: 1rem;
    background: var(--accent);
  }

  .ruler__track {
    display: grid;
    grid-template-columns: repeat(50, 1fr);
    gap: 2px;
    height: 5rem;
    padding-block: 0.75rem;
    border-block: 1px solid var(--rule-strong);
  }

  .ruler__tick {
    position: relative;
    background: color-mix(in srgb, var(--ink) 8%, transparent);
  }

  .ruler__tick[data-state="taken"] {
    background: var(--accent);
  }

  .ruler__tick[data-state="open"] {
    background: color-mix(in srgb, var(--ink) 16%, transparent);
  }

  .ruler__tick[data-boundary] {
    margin-left: 0.5rem;
  }

  .ruler__tick[data-boundary]::before {
    content: "";
    position: absolute;
    top: -0.75rem;
    bottom: -0.75rem;
    left: -0.3rem;
    width: 1px;
    background: var(--rule-strong);
  }

  .ruler__cursor {
    position: relative;
    height: 2.5rem;
    margin-top: 0.5rem;
  }

  .ruler__pin {
    position: absolute;
    transform: translateX(-50%);
    text-align: center;
  }

  .ruler__arrow {
    display: block;
    width: 0;
    height: 0;
    margin: 0 auto 0.5rem;
    border-inline: 6px solid transparent;
    border-bottom: 8px solid var(--accent);
  }

  .ruler__label {
    font-family: var(--font-mono);
    font-size: var(--text-eyebrow);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    white-space: nowrap;
  }

  @media (max-width: 48rem) {
    .ruler__marks {
      grid-template-columns: repeat(3, 1fr);
    }

    .mark:nth-child(n + 4) {
      display: none;
    }

    .ruler__track {
      grid-template-columns: repeat(30, 1fr);
    }

    .ruler__tick:nth-child(n + 31) {
      display: none;
    }

    .ruler__label {
      font-size: 0.625rem;
    }
  }
</style>
```

- [ ] **Step 2: Verificar tipos**

Run: `npx astro check`
Expected: PASS — 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/PriceRuler.astro
git commit -m "feat(planos): componente da régua de preços"
```

---

### Task 4: Seção Planos e montagem na página

**Files:**
- Create: `src/sections/Plans.astro`
- Modify: `src/components/Landing.astro`
- Modify: `src/data/navigation.ts:12-13`

**Interfaces:**
- Consumes: `deriveTiers`, `pricing`, `formatPrice`, `type Tier` de `src/data/pricing.ts`; `PriceRuler` (Task 3); `Dict["plans"]` e `Dict["nav"]["planos"]` (Task 2); `site.whatsapp` de `src/data/site.ts`
- Produces: `<Plans />`, âncora `#planos`

O CTA aponta para o WhatsApp já usado no resto do site. Não há checkout — está fora de escopo por decisão do spec.

- [ ] **Step 1: Criar a seção**

Crie `src/sections/Plans.astro`:

```astro
---
import PriceRuler from "../components/PriceRuler.astro";
import { deriveTiers, formatPrice, pricing } from "../data/pricing";
import { site } from "../data/site";
import { useDict } from "../i18n";

const t = useDict(Astro.currentLocale).plans;
const view = deriveTiers(pricing);

const currentTier = view.tiers[0];
const nextTier = view.tiers[1];
const isFree = currentTier.price === 0;

const nextTierNote = t.nextTierNote.replace("{price}", formatPrice(nextTier.price));
const ceilingNote = t.ceilingNote.replace("{price}", formatPrice(view.ceilingPrice));
const updatedAt = t.updatedAtLabel.replace(
  "{date}",
  new Date(`${view.updatedAt}T00:00:00`).toLocaleDateString("pt-BR"),
);
const whatsappHref = `${site.whatsapp}?text=${encodeURIComponent(t.ctaText)}`;
---

<section class="section" id="planos">
  <div class="shell">
    <header class="section-header section-header--spaced">
      <p class="eyebrow">{t.eyebrow}</p>
      <h2>{t.titleLines[0]}<span class="plans__muted">{t.titleLines[1]}</span></h2>
      <p class="lede">{t.lede}</p>
    </header>

    <PriceRuler view={view} t={t} />

    <div class="plans__offer">
      <div>
        <p class="plans__tag meta">{t.tierCurrentLabel}</p>
        <p class="plans__price">
          {isFree ? t.freeLabel : formatPrice(currentTier.price)}
          <small>{t.freeSub}</small>
        </p>
        <a class="btn btn--solid" href={whatsappHref} rel="noopener noreferrer" target="_blank">
          {t.ctaText}
        </a>
      </div>
      <div class="plans__remaining">
        <b class="tabular">{String(view.slotsRemaining).padStart(2, "0")}</b>
        <span class="meta">{t.slotsRemaining}</span>
        <p>{nextTierNote}</p>
        <p class="plans__ceiling meta">{ceilingNote}</p>
      </div>
    </div>

    <p class="plans__fineprint">
      {t.fineprint}
      <span class="plans__updated meta">{updatedAt}</span>
    </p>
  </div>
</section>

<style>
  .plans__muted {
    color: var(--ink-faint);
  }

  .plans__offer {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
    gap: clamp(1.5rem, 4vw, 3.5rem);
    align-items: center;
    margin-top: 4.5rem;
    padding: clamp(1.75rem, 4vw, 3rem);
    border: 1px solid var(--rule-strong);
    background: var(--surface-raised);
  }

  .plans__tag {
    margin-bottom: 1rem;
    color: var(--accent);
  }

  .plans__price {
    margin: 0 0 2rem;
    font-family: var(--font-display);
    font-size: clamp(2.75rem, 8vw, 4.5rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.035em;
    color: var(--accent-bright);
  }

  .plans__price small {
    display: block;
    margin-top: 1rem;
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    font-weight: 400;
    letter-spacing: 0.08em;
    color: var(--ink-soft);
  }

  .plans__remaining {
    padding-left: clamp(1.25rem, 3vw, 2.5rem);
    border-left: 1px solid var(--rule-color);
  }

  .plans__remaining b {
    display: block;
    font-size: clamp(3rem, 9vw, 4.5rem);
    font-weight: 500;
    line-height: 1;
    color: var(--ink);
  }

  .plans__remaining span {
    display: block;
    margin-top: 0.5rem;
  }

  .plans__remaining p {
    margin: 1.25rem 0 0;
    color: var(--ink-soft);
  }

  .plans__ceiling {
    color: var(--ink-faint);
  }

  .plans__fineprint {
    max-width: 64ch;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--rule-color);
    color: var(--ink-faint);
  }

  .plans__updated {
    display: block;
    margin-top: 0.75rem;
  }

  @media (max-width: 60rem) {
    .plans__offer {
      grid-template-columns: minmax(0, 1fr);
    }

    .plans__remaining {
      padding-top: 1.75rem;
      padding-left: 0;
      border-top: 1px solid var(--rule-color);
      border-left: 0;
    }
  }
</style>
```

- [ ] **Step 2: Montar a seção na página**

Em `src/components/Landing.astro`, acrescente o import junto aos outros:

```astro
import Plans from "../sections/Plans.astro";
```

E coloque a seção entre `<Roadmap />` e `<Principles />`:

```astro
    <Roadmap />
    <Plans />
    <Principles />
```

- [ ] **Step 3: Acrescentar o item no menu**

Em `src/data/navigation.ts`, insira entre a linha do `roadmap` e a do `construir`:

```ts
    { label: t.nav.planos, href: `${base}#planos` },
```

- [ ] **Step 4: Verificar tipos e build**

Run: `npx astro check && npm run build`
Expected: PASS — 0 errors, build concluído com as 3 páginas geradas.

- [ ] **Step 5: Rodar os testes de novo**

Run: `npm test`
Expected: PASS — 12 testes.

- [ ] **Step 6: Commit**

```bash
git add src/sections/Plans.astro src/components/Landing.astro src/data/navigation.ts
git commit -m "feat(planos): seção Planos montada na landing"
```

---

### Task 5: Validação visual com o Jonatas

**Files:** nenhum (etapa de verificação)

**Interfaces:**
- Consumes: tudo das tasks 1–4
- Produces: aprovação para merge

Esta task **não pode ser pulada nem automatizada**. O Jonatas pediu explicitamente para validar o layout antes de qualquer coisa chegar em `main`, e push em `main` publica no ar.

- [ ] **Step 1: Subir o dev server**

Run: `npx astro dev --background`
Expected: servidor em `http://localhost:4321`

- [ ] **Step 2: Conferir as três rotas**

Abrir e verificar que a seção aparece, os números batem (7 ocupadas, 3 restantes, faixa atual grátis) e a régua está alinhada:
- `http://localhost:4321/#planos`
- `http://localhost:4321/en/#planos`
- `http://localhost:4321/es/#planos`

- [ ] **Step 3: Conferir o mobile**

Reduzir a janela abaixo de 768px e confirmar: a régua cai para 3 marcadores e 30 ticks, o cartão da oferta vira uma coluna só, e o rótulo do cursor não estoura a largura da tela.

- [ ] **Step 4: Pedir a validação do Jonatas**

Passar a URL local e **aguardar o OK explícito**. Não fazer merge nem push antes disso.

- [ ] **Step 5: Derrubar o servidor da galeria de mockups**

```bash
pkill -f "http.server 4399"
```

---

## Notas de verificação final

Antes de considerar o trabalho pronto, os três comandos precisam passar de fato — rode e leia a saída, não presuma:

```bash
npm test          # 12 testes
npx astro check   # 0 errors
npm run build     # 3 páginas
```

O merge para `main` só acontece depois do OK do Jonatas na Task 5.
