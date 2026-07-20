# Seção "Planos" — preço em escada com régua de vagas

**Data:** 2026-07-20
**Status:** aguardando revisão
**Variação visual aprovada:** `superdesign/design_iterations/se__o__planos___pric_3.html` ("A Régua")

---

## ⚠️ Valores definidos por mim, não pelo Jonatas

Estes quatro números não foram confirmados. Eu os escolhi para destravar o spec.
**Confira este quadro antes de qualquer outra coisa** — mudar qualquer linha aqui não
muda a arquitetura, só a constante em `src/data/pricing.ts`.

| Parâmetro | Valor adotado | Por quê |
|---|---|---|
| Preço da 1ª licença paga | R$ 5,00 | Âncora baixa o bastante para converter sem prova social ainda |
| Passo do aumento | +R$ 0,50 a cada **10** clientes | Escada legível; a cada cliente viraria rampa (o nº 60 pagaria R$ 30) |
| Unidade | por licença de usuário, **por mês** | Receita recorrente; pagamento único não sustenta suporte vitalício |
| Teto | R$ 12,00 (atingido no cliente ~150) | Sem teto o modelo se torna impagável e você perde clientes grandes |

Confirmado pelo Jonatas: **os 10 primeiros clientes têm acesso vitalício gratuito.**

---

## Objetivo

Vender licenças sem ter reputação de mercado ainda. A escassez faz o trabalho que a marca
ainda não faz: quem entra cedo paga menos e **continua** pagando menos. A seção precisa
comunicar isso sem parecer golpe de marketing — o público é clínico e desconfia de urgência
fabricada.

## Modelo de preço

Faixas de 10 clientes. A faixa 0 é gratuita e vitalícia; cada faixa seguinte custa
R$ 0,50 a mais por licença/mês que a anterior, até o teto.

```
Faixa 0   clientes 001–010   R$  0,00   grátis vitalício
Faixa 1   clientes 011–020   R$  5,00
Faixa 2   clientes 021–030   R$  5,50
Faixa 3   clientes 031–040   R$  6,00
...
Faixa 15+ clientes 151+      R$ 12,00   teto — a escada para aqui
```

**Grandfathering:** o preço da faixa em que o cliente entrou não muda enquanto a assinatura
estiver ativa. Aumentos valem só para novos clientes. Isso é a promessa central da seção —
se for quebrada, destrói exatamente a confiança que o modelo tenta construir.

### A lógica, formalizada

Uma função pura, sem estado, em `src/data/pricing.ts`:

```ts
export type PricingConfig = {
  tierSize: number;        // 10
  firstPaidPrice: number;  // 5.00
  increment: number;       // 0.50
  ceiling: number;         // 12.00
  clientsSold: number;     // editado à mão a cada venda
  updatedAt: string;       // "2026-07-20" — exibido na UI
};

export type Tier = {
  index: number;                              // 0 = fundadores
  from: number; to: number;                   // faixa de clientes
  price: number;                              // 0 na faixa 0
  state: "closed" | "current" | "future";
};
```

Regras:

- `priceOf(n)` — faixa 0 → `0`; faixa n ≥ 1 → `min(firstPaidPrice + (n-1) * increment, ceiling)`
- `currentTierIndex` = `floor(clientsSold / tierSize)`
- `slotsRemaining` = `tierSize - (clientsSold % tierSize)`
- `deriveTiers(config)` devolve uma **janela deslizante de 5 faixas** começando na atual —
  a régua nunca "acaba" nem mostra faixas mortas, e escala sozinha conforme as vendas andam.

Restrição assumida: o tamanho da faixa gratuita é igual ao das demais (10). Isso mantém
`currentTierIndex` como uma divisão simples. Se um dia a faixa 0 tiver tamanho diferente,
a aritmética precisa de um caso especial — está fora do escopo agora.

Casos de borda que a função precisa acertar, cobertos por testes:

- `clientsSold = 0` → faixa 0, 10 vagas restantes
- `clientsSold = 10` → faixa 1 vira a atual, a faixa gratuita fecha
- `clientsSold` múltiplo exato de 10 → 10 vagas restantes, nunca 0
- preço acima do teto → trava em R$ 12,00
- faixa 0 é a única com `price === 0` (a UI decide entre "Grátis" e um valor por isso)

## Arquitetura

| Arquivo | Responsabilidade |
|---|---|
| `src/data/pricing.ts` | Config + `deriveTiers()`. Sem JSX, sem copy, testável isolado. |
| `src/data/pricing.test.ts` | Casos de borda acima. |
| `src/components/PriceRuler.astro` | Só a régua: ticks, marcadores de preço, cursor. Recebe `tiers` e `slotsRemaining` por props. |
| `src/sections/Plans.astro` | Cabeçalho, régua, cartão da oferta, letra miúda. |
| `src/i18n/{pt,en,es}/plans.ts` | Copy nos três idiomas. |
| `src/i18n/types.ts` | Novo bloco `plans` no `Dict`. |
| `src/components/Landing.astro` | Monta `<Plans />` entre `<Roadmap />` e `<Principles />`. |
| `src/data/navigation.ts` + `i18n/*/chrome.ts` | Item "Planos" no menu. |

A régua sai como componente próprio porque tem lógica de renderização densa (50 ticks,
divisores de faixa, posição do cursor) que deixaria `Plans.astro` acima do limite de 200
linhas do projeto. Ela não sabe nada sobre preço — recebe faixas prontas.

Posição na página: depois do Roadmap. O visitante vê o que existe e para onde vai antes de
ver o preço — a ordem honesta, dado que o produto ainda está em construção.

## Números que a UI mostra

- Faixa atual, seu preço e **vagas restantes** (número grande, mono)
- As 4 faixas seguintes com seus preços, na régua
- Preço do teto, para o visitante ver que a escada tem fim
- Data da última atualização do contador

## Honestidade do contador

`clientsSold` é uma constante editada à mão a cada venda. Para dez clientes isso é adequado
e não vale a complexidade de um backend.

O risco é real: **um contador desatualizado transforma a escassez em mentira.** Mitigação —
a UI exibe `updatedAt` ("vagas conferidas em 20/07/2026"). Isso converte uma afirmação
absoluta numa afirmação datada, que continua verdadeira mesmo se ficar velha. É a diferença
entre errar e enganar.

Não haverá contagem regressiva falsa, nem "última vaga!", nem vagas que reaparecem.

## i18n

Os três idiomas mostram valores em **R$**, sem conversão — a operação é brasileira e um
preço convertido em tempo de build ficaria errado no dia seguinte. As traduções cobrem só
a copy.

O `Dict` ganha `plans` com: `eyebrow`, `titleLines`, `lede`, `rulerLabel`, `tierLabel`,
`freeLabel`, `slotsRemaining`, `ctaText`, `ceilingNote`, `fineprint`, `updatedAtLabel`.
Por ser tipado, esquecer uma tradução vira erro de tipo — não bug em produção.

## Acessibilidade

- A régua é `role="img"` com `aria-label` descrevendo o estado em texto corrido
- Estado dos ticks nunca depende só de cor: a faixa atual tem cursor, seta e rótulo textual
- Contraste conferido: gold `#d79a3c` sobre abyss `#05090f` passa em AA para texto grande
- CTA com área de toque ≥ 48px
- Sem animação de preenchimento (ou respeitando `prefers-reduced-motion`, já tratado em `base/motion.css`)

## Fora de escopo

Checkout, pagamento, autenticação, contagem automática de clientes, cupons, comparação de
planos por recursos. A seção termina no CTA, que leva ao WhatsApp já existente em
`src/data/site.ts` — o mesmo canal de contato do resto do site.

## Verificação

1. `npx astro check` — sem erros de tipo (garante os três dicionários completos)
2. Testes de `deriveTiers` passando
3. `astro dev --background`, Jonatas valida o layout em desktop e mobile, nos 3 idiomas
4. Só então commit e push — **push em `main` dispara deploy automático no GitHub Pages**
