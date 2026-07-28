# SEO on-page: FAQ visível, categoria nos headings e vocabulário de busca — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Renderizar na landing o FAQ que hoje só existe no JSON-LD, colocar a categoria do produto no H1, e inserir três termos de busca ausentes — sem tocar no posicionamento da copy das fundadoras.

**Architecture:** Uma seção nova (`Faq.astro`) usando `<details>`/`<summary>` nativos, alimentada pelo mesmo `t.faq` que o `Layout.astro` já usa para o schema — tornando impossível a página divergir da marcação. As demais mudanças são edições pontuais nos dicionários i18n, cada uma travada por teste.

**Tech Stack:** Astro 7.1.1, TypeScript, Vitest 3.2.7, Container API do Astro (`experimental_AstroContainer`).

## Global Constraints

- **Idiomas:** toda mudança de copy vale para `pt`, `en` e `es`. Nenhum idioma fica para trás.
- **Vocabulário banido** (`src/i18n/copy.test.ts`, já existente) — nunca introduzir:
  - pt: "em troca", "feedback", "reportar", "precisa de gente", "atrapalha", "participar"
  - en: "in return", "feedback", "bug report", "needs people", "take part", "gets in the way"
  - es: "a cambio", "feedback", "reportar", "necesita gente", "participar", "estorba"
- **Copy das fundadoras é intocável.** Se um termo de busca só couber às custas do posicionamento (`docs/superpowers/specs/2026-07-27-copy-fundadoras-design.md`), o termo não entra.
- **Limites de SERP** já travados por teste: `meta.title` ≤ 60 caracteres, `meta.description` ≤ 160.
- **Sem JavaScript novo.** O repo só usa script no seletor de idioma e nas abas do Demo.
- **Verificação por exit code**, nunca por grep na saída: `npx vitest run`, `npx astro check`, `npm run build`.

---

### Task 1: Cabeçalho da seção de FAQ nos três idiomas

O array `t.faq` já existe e tem as oito perguntas. Falta o cabeçalho da seção (eyebrow e título) e o rótulo de navegação.

**Files:**
- Modify: `src/i18n/types.ts` (tipo `Dict`)
- Modify: `src/i18n/pt/faq.ts`, `src/i18n/en/faq.ts`, `src/i18n/es/faq.ts`
- Modify: `src/i18n/pt/chrome.ts`, `src/i18n/en/chrome.ts`, `src/i18n/es/chrome.ts`
- Test: `src/i18n/copy.test.ts`

**Interfaces:**
- Consumes: nada (primeira task)
- Produces: `Dict["faqSection"]` com `{ eyebrow: string; title: string }`; `Dict["nav"]["faq"]: string`

- [ ] **Step 1: Escrever o teste que falha**

Acrescentar ao final de `src/i18n/copy.test.ts`:

```ts
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
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npx vitest run`
Expected: FAIL — `Property 'faqSection' does not exist` / `Cannot read properties of undefined (reading 'faq')`

- [ ] **Step 3: Estender o tipo `Dict`**

Em `src/i18n/types.ts`, na linha do `nav`, acrescentar a chave `faq`, e logo abaixo de `faq: readonly Faq[];` acrescentar `faqSection`:

```ts
  faq: readonly Faq[];
  faqSection: { eyebrow: string; title: string };
  skipLink: string;
  nav: {
    agora: string;
    visualizador: string;
    roadmap: string;
    planos: string;
    construir: string;
    faq: string;
  };
```

- [ ] **Step 4: Adicionar o cabeçalho em português**

Em `src/i18n/pt/faq.ts`, dentro do objeto exportado, **antes** de `faq: [`:

```ts
export const faq = {
  faqSection: {
    eyebrow: "Perguntas frequentes",
    title: "O que as clínicas perguntam antes de entrar.",
  },
  faq: [
```

Em `src/i18n/pt/chrome.ts`, dentro de `nav`, após `construir`:

```ts
    construir: "Construir junto",
    faq: "Perguntas",
```

- [ ] **Step 5: Adicionar o cabeçalho em inglês**

Em `src/i18n/en/faq.ts`:

```ts
export const faq = {
  faqSection: {
    eyebrow: "Frequently asked questions",
    title: "What clinics ask before joining.",
  },
  faq: [
```

Em `src/i18n/en/chrome.ts`, dentro de `nav`:

```ts
    construir: "Build with us",
    faq: "FAQ",
```

- [ ] **Step 6: Adicionar o cabeçalho em espanhol**

Em `src/i18n/es/faq.ts`:

```ts
export const faq = {
  faqSection: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que las clínicas preguntan antes de entrar.",
  },
  faq: [
```

Em `src/i18n/es/chrome.ts`, dentro de `nav`:

```ts
    construir: "Construir juntos",
    faq: "Preguntas",
```

Atenção: o espanhol bane "participar" — por isso "antes de entrar", nunca "antes de participar".

- [ ] **Step 7: Rodar testes e type-check**

Run: `npx vitest run && npx astro check`
Expected: PASS, e `0 errors` no check.

- [ ] **Step 8: Commit**

```bash
git add src/i18n/types.ts src/i18n/pt src/i18n/en src/i18n/es src/i18n/copy.test.ts
git commit -m "feat(i18n): cabecalho e rotulo de navegacao da secao de FAQ"
```

---

### Task 2: Componente `Faq.astro` com teste de paridade

**Files:**
- Create: `vitest.config.ts`
- Create: `src/sections/Faq.astro`
- Test: `src/sections/faq.test.ts`

**Interfaces:**
- Consumes: `Dict["faqSection"]`, `Dict["faq"]` (Task 1)
- Produces: componente `Faq.astro` sem props, renderizando `<section id="faq">`

- [ ] **Step 1: Configurar o Vitest para renderizar componentes Astro**

O projeto não tem `vitest.config.ts` — os testes atuais são de dado puro. A Container API exige o transform do Astro. Criar `vitest.config.ts` na raiz:

```ts
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 2: Escrever o teste que falha**

Criar `src/sections/faq.test.ts`:

```ts
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
```

- [ ] **Step 3: Rodar o teste e confirmar que falha**

Run: `npx vitest run src/sections/faq.test.ts`
Expected: FAIL — `Failed to resolve import "./Faq.astro"`

- [ ] **Step 4: Criar o componente**

Criar `src/sections/Faq.astro`. Segue o padrão de `Contribute.astro` (header com eyebrow/h2, `shell`, `<style>` escopado). Sem `<script>`: o colapso é nativo.

```astro
---
import { useDict } from "../i18n";

const t = useDict(Astro.currentLocale);
---

<section class="section" id="faq">
  <div class="shell faq">
    <header class="section-header">
      <p class="eyebrow">{t.faqSection.eyebrow}</p>
      <h2>{t.faqSection.title}</h2>
    </header>

    <div class="faq__list">
      {
        t.faq.map((item) => (
          <details class="faq__item">
            <summary class="faq__question">{item.q}</summary>
            <p class="faq__answer">{item.a}</p>
          </details>
        ))
      }
    </div>
  </div>
</section>

<style>
  .faq {
    display: grid;
    gap: clamp(2rem, 4vw, 3rem);
  }

  .faq__list {
    display: grid;
    border-top: 1px solid var(--rule-color);
  }

  .faq__item {
    border-bottom: 1px solid var(--rule-color);
  }

  .faq__question {
    padding: 1.15rem 0;
    cursor: pointer;
    font-family: var(--font-display);
    font-weight: 500;
    color: var(--ink);
    transition: color var(--duration-fast) var(--ease-out);
  }

  .faq__question:hover {
    color: var(--accent-bright);
  }

  .faq__answer {
    padding-bottom: 1.25rem;
    max-width: 68ch;
    color: var(--ink-soft);
    font-size: 1rem;
  }

  @media (max-width: 48rem) {
    .faq {
      gap: 1.5rem;
    }

    .faq__question {
      padding: 1rem 0;
    }
  }
</style>
```

Nota de acessibilidade: `<details>`/`<summary>` já são focáveis por teclado e anunciados como expansíveis por leitores de tela. Não adicionar `role`, `aria-expanded` nem `tabindex` — sobrescrever a semântica nativa piora.

- [ ] **Step 5: Rodar o teste e confirmar que passa**

Run: `npx vitest run src/sections/faq.test.ts`
Expected: PASS (2 testes)

Se a Container API falhar por motivo de ambiente, **pare e reporte** — não apague o teste em silêncio. O spec prevê o fallback (a proteção já é estrutural, já que página e schema leem o mesmo `t.faq`), mas abandonar o teste é decisão a comunicar.

- [ ] **Step 6: Rodar a suíte inteira**

Run: `npx vitest run`
Expected: PASS, incluindo os testes de copy já existentes.

- [ ] **Step 7: Commit**

```bash
git add vitest.config.ts src/sections/Faq.astro src/sections/faq.test.ts
git commit -m "feat(faq): renderiza na pagina o FAQ que so existia no JSON-LD"
```

---

### Task 3: Ligar a seção à landing e à navegação

**Files:**
- Modify: `src/components/Landing.astro`
- Modify: `src/data/navigation.ts`
- Test: `src/data/navigation.test.ts` (criar)

**Interfaces:**
- Consumes: `Faq.astro` (Task 2), `Dict["nav"]["faq"]` (Task 1)
- Produces: âncora `#faq` na navegação de todos os idiomas

- [ ] **Step 1: Escrever o teste que falha**

Criar `src/data/navigation.test.ts`:

```ts
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
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npx vitest run src/data/navigation.test.ts`
Expected: FAIL — `expected undefined not to be undefined`

- [ ] **Step 3: Acrescentar o item de navegação**

Em `src/data/navigation.ts`, dentro do array retornado, após o item `construir`:

```ts
    { label: t.nav.construir, href: `${base}#construir` },
    { label: t.nav.faq, href: `${base}#faq` },
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npx vitest run src/data/navigation.test.ts`
Expected: PASS (3 testes)

- [ ] **Step 5: Inserir a seção na landing**

Em `src/components/Landing.astro`, adicionar o import junto aos outros e o componente entre `<Contribute />` e `<CallToAction />`:

```astro
import Faq from "../sections/Faq.astro";
```

```astro
    <Contribute />
    <Faq />
    <CallToAction />
```

- [ ] **Step 6: Verificar que o FAQ chegou ao HTML das três páginas**

Run:
```bash
npm run build && node -e "
const fs=require('fs');
const alvo={'dist/index.html':'O que é o Akhet PACS?','dist/en/index.html':'What is Akhet PACS?','dist/es/index.html':'¿Qué es Akhet PACS?'};
let ok=true;
for(const [f,q] of Object.entries(alvo)){
  const semScript=fs.readFileSync(f,'utf8').replace(/<script[^>]*>[\s\S]*?<\/script>/g,' ');
  const achou=semScript.includes(q);
  console.log(f, achou?'OK':'FALTOU', JSON.stringify(q));
  if(!achou) ok=false;
}
process.exit(ok?0:1);
"
```
Expected: três linhas `OK` e exit code 0.

Se o texto exato da primeira pergunta em `en`/`es` for diferente do usado acima, leia o valor real em `src/i18n/en/faq.ts` e `src/i18n/es/faq.ts` e ajuste o comando — o que importa é confirmar que a pergunta aparece **fora** de `<script>`.

- [ ] **Step 7: Commit**

```bash
git add src/components/Landing.astro src/data/navigation.ts src/data/navigation.test.ts
git commit -m "feat(landing): adiciona a secao de FAQ antes do CTA final"
```

---

### Task 4: Categoria do produto no H1

**Files:**
- Modify: `src/i18n/pt/sections.ts`, `src/i18n/en/sections.ts`, `src/i18n/es/sections.ts`
- Test: `src/i18n/copy.test.ts`

**Interfaces:**
- Consumes: nada
- Produces: `hero.lines` continua sendo `readonly [string, string, string]` — a terceira linha segue sendo a destacada (`hero__line--accent` em `src/sections/Hero.astro:27`)

- [ ] **Step 1: Escrever o teste que falha**

Acrescentar ao final de `src/i18n/copy.test.ts`:

```ts
/**
 * O H1 é o sinal on-page mais forte depois do <title>. Antes desta regra ele
 * dizia só "As 10 primeiras clínicas nunca pagam" — promessa comercial sem
 * nenhuma palavra da categoria do produto.
 */
describe("H1 carrega a categoria do produto", () => {
  for (const locale of locales) {
    it(`${locale} cita DICOM no hero`, () => {
      expect(dicts[locale].hero.lines.join(" ")).toMatch(/DICOM/i);
    });

    it(`${locale} mantém as três linhas do hero`, () => {
      expect(dicts[locale].hero.lines).toHaveLength(3);
    });
  }
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npx vitest run`
Expected: FAIL nos três `cita DICOM no hero`.

- [ ] **Step 3: Reescrever as linhas do hero**

A categoria entra na primeira linha; o clímax destacado (`nunca pagam.`) fica intocado.

`src/i18n/pt/sections.ts`:
```ts
    lines: ["Visualizador DICOM para clínicas.", "As 10 primeiras", "nunca pagam."],
```

`src/i18n/en/sections.ts`:
```ts
    lines: ["DICOM viewer for clinics.", "The first 10", "never pay."],
```

`src/i18n/es/sections.ts`:
```ts
    lines: ["Visor DICOM para clínicas.", "Las 10 primeras", "nunca pagan."],
```

- [ ] **Step 4: Rodar testes e type-check**

Run: `npx vitest run && npx astro check`
Expected: PASS e `0 errors`. O `astro check` importa aqui: `lines` é uma tupla de exatamente três posições.

- [ ] **Step 5: Capturar o hero para validação visual do usuário**

A primeira linha ficou bem mais longa que a anterior e o hero usa tipografia grande. Rodar o preview e capturar em telas larga e estreita:

```bash
npm run build && npm run preview -- --port 4321
```

Capturar `http://localhost:4321/` em 1440×900 e em 390×844. **Não decidir sozinho se ficou bom** — a validação visual é do usuário. Se ele reprovar, o fallback previsto no spec é encurtar a primeira linha para `Visualizador DICOM.` / `DICOM viewer.` / `Visor DICOM.`, mantendo o teste passando.

- [ ] **Step 6: Commit**

```bash
git add src/i18n/pt/sections.ts src/i18n/en/sections.ts src/i18n/es/sections.ts src/i18n/copy.test.ts
git commit -m "feat(seo): coloca a categoria do produto no H1"
```

---

### Task 5: H2 do Demo e os três termos de busca ausentes

Medição da home em português (texto visível, fora de `<script>`): `"sistema PACS"` 0, `"laudo"` 0, `"estação de trabalho"` 0.

**Files:**
- Modify: `src/i18n/pt/sections.ts`, `src/i18n/en/sections.ts`, `src/i18n/es/sections.ts`
- Modify: `src/i18n/pt/faq.ts`, `src/i18n/en/faq.ts`, `src/i18n/es/faq.ts`
- Modify: `src/i18n/pt/plans.ts`, `src/i18n/es/plans.ts`
- Test: `src/i18n/copy.test.ts`

**Interfaces:**
- Consumes: nada
- Produces: nada consumido por tasks posteriores

- [ ] **Step 1: Escrever o teste que falha**

Acrescentar ao final de `src/i18n/copy.test.ts`:

```ts
/**
 * Termos que a clínica digita e que a página não usava em lugar nenhum.
 * Não é densidade: é uma ocorrência natural de cada forma buscada.
 */
const exigidos: Record<Guarded, readonly string[]> = {
  pt: ["sistema pacs", "laudo", "estação de trabalho"],
  en: ["pacs system", "workstation"],
  es: ["sistema pacs", "informe", "estación de trabajo"],
};

describe("vocabulário de busca", () => {
  for (const locale of guarded) {
    for (const term of exigidos[locale]) {
      it(`${locale} usa "${term}"`, () => {
        const hits = allStrings(dicts[locale]).filter((text) =>
          text.toLowerCase().includes(term),
        );
        expect(hits.length).toBeGreaterThan(0);
      });
    }
  }
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npx vitest run`
Expected: FAIL nos termos ainda ausentes.

- [ ] **Step 3: Inserir "sistema PACS" na primeira resposta do FAQ**

Em `src/i18n/pt/faq.ts`, primeira resposta — trocar "um PACS completo" por "um sistema PACS completo":

```ts
      a: "O Akhet é um visualizador DICOM nativo, de alto desempenho, que está evoluindo para um sistema PACS completo para clínicas, hospitais e centros de diagnóstico por imagem.",
```

Em `src/i18n/en/faq.ts`, mesma resposta — usar "a complete PACS system".
Em `src/i18n/es/faq.ts`, mesma resposta — usar "un sistema PACS completo".

- [ ] **Step 4: Inserir "laudo" no CTA final**

Em `src/i18n/pt/sections.ts`, dentro de `clinics.lede`, trocar "a sua rotina entra na fila" por "a sua rotina de laudo entra na fila":

```ts
    lede: "Se você é de uma clínica ou centro de diagnóstico, escreva contando quais modalidades usa. Entramos em contato assim que houver uma build para o seu sistema — e a sua rotina de laudo entra na fila do que é construído em seguida.",
```

Em `src/i18n/es/sections.ts`, o equivalente é "su rutina de informe" (em espanhol clínico, o laudo é o *informe*).
Em `src/i18n/en/sections.ts`, nenhuma mudança: o termo inglês equivalente é "reporting", já coberto pelo vocabulário existente, e `exigidos.en` não o pede.

- [ ] **Step 5: Inserir "estação de trabalho"**

Em `src/i18n/pt/plans.ts:16`, trocar "sem cobrar por estação" por "sem cobrar por estação de trabalho".
Em `src/i18n/es/plans.ts:16`, trocar "sin cobro por estación" por "sin cobro por estación de trabajo".
Em inglês nada muda: `plans.ts` já usa "workstation".

- [ ] **Step 6: Nomear o H2 do Demo**

`src/i18n/pt/sections.ts`, `demo.title`:
```ts
    title: "É assim que o visualizador DICOM está hoje.",
```

`src/i18n/en/sections.ts`, `demo.title`:
```ts
    title: "This is how the DICOM viewer looks today.",
```

`src/i18n/es/sections.ts`, `demo.title`:
```ts
    title: "Así está hoy el visor DICOM.",
```

- [ ] **Step 7: Rodar a suíte inteira**

Run: `npx vitest run && npx astro check`
Expected: PASS e `0 errors`. Os testes de vocabulário banido precisam continuar verdes — nenhuma dessas frases pode ter introduzido "em troca", "feedback", "participar" e afins.

- [ ] **Step 8: Commit**

```bash
git add src/i18n src/i18n/copy.test.ts
git commit -m "feat(seo): cobre os termos de busca ausentes na copy"
```

---

### Task 6: Verificação final e medição do antes/depois

**Files:**
- Nenhum arquivo de produção. Só verificação.

**Interfaces:**
- Consumes: tudo das tasks 1 a 5
- Produces: relatório para o usuário

- [ ] **Step 1: Suíte completa e build**

Run: `npx vitest run && npx astro check && npm run build`
Expected: todos os testes passando, `0 errors`, `3 page(s) built`.

- [ ] **Step 2: Medir a cobertura de termos depois da mudança**

Run:
```bash
python3 - <<'EOF'
import re, html
src = open('dist/index.html', encoding='utf8').read()
body = src.split('<body',1)[1]
body = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', body, flags=re.S)
txt = re.sub(r'\s+',' ', html.unescape(re.sub(r'<[^>]+>',' ', body)))
print("palavras visíveis:", len(txt.split()), "(antes: 1467)")
antes = {"PACS":8,"DICOM":10,"clínica":14,"sistema PACS":0,"laudo":0,
         "estação de trabalho":0,"tomografia":0,"ressonância":0,"mamografia":2}
for termo, n in antes.items():
    print(f"  {termo:<22} {len(re.findall(re.escape(termo), txt, re.I)):>3}  (antes: {n})")
EOF
```

Expected: `sistema PACS`, `laudo`, `estação de trabalho`, `tomografia` e `ressonância` saem de 0; o total de palavras sobe com o FAQ renderizado.

- [ ] **Step 3: Confirmar que o schema continua batendo com a página**

Run:
```bash
node -e "
const fs=require('fs');
const src=fs.readFileSync('dist/index.html','utf8');
const ld=JSON.parse(src.match(/<script type=\"application\/ld\+json\"[^>]*>([\s\S]*?)<\/script>/)[1]);
const faq=ld['@graph'].find(n=>n['@type']==='FAQPage');
const semScript=src.replace(/<script[^>]*>[\s\S]*?<\/script>/g,' ');
const faltando=faq.mainEntity.filter(q=>!semScript.includes(q.name));
console.log('perguntas no schema:', faq.mainEntity.length);
console.log('ausentes da pagina visivel:', faltando.length);
process.exit(faltando.length===0?0:1);
"
```
Expected: `ausentes da pagina visivel: 0` e exit code 0. Este é o defeito que originou o spec — aqui ele é medido como corrigido.

- [ ] **Step 4: Capturas para validação visual do usuário**

Rodar `npm run preview -- --port 4321` e capturar `/`, `/en/` e `/es/` em 1440×900 e 390×844, com atenção ao hero (linha longa) e à seção de FAQ.

Enviar ao usuário e **aguardar aprovação visual dele** antes de considerar a tarefa concluída. Não julgar sozinho se o layout ficou bom.

- [ ] **Step 5: Relatar honestamente**

Reportar ao usuário: testes (número exato), medição antes/depois dos termos, resultado da checagem de paridade schema↔página, e o que **não** foi feito — contraste do `--ink-faint`, render delay do LCP, e o fato de que nada disso coloca o site na primeira página de "software PACS para clínicas".

---

## Auto-revisão

**Cobertura do spec:**

| Requisito do spec | Task |
| --- | --- |
| FAQ em seção própria, colapsável, antes do CTA | 2 e 3 |
| `t.faq` como fonte única de página e schema | 2 (componente) e 6 Step 3 (verificação) |
| `<details>`/`<summary>` sem JavaScript | 2 Step 4 |
| Item de navegação para `#faq` | 3 |
| H1 com categoria, três linhas, clímax preservado | 4 |
| Fallback do H1 se quebrar em tela estreita | 4 Step 5 |
| H2 do Demo | 5 Step 6 |
| "sistema PACS", "laudo", "estação de trabalho" | 5 Steps 3-5 |
| en/es: intenção traduzida, sem keyword local | 5 (termos adaptados: *informe*, *workstation*) |
| Teste de cobertura de vocabulário | 5 Step 1 |
| Teste de categoria no H1 | 4 Step 1 |
| Teste de paridade FAQ ↔ página | 2 Step 2 |
| Fallback do teste de paridade, comunicado | 2 Step 5 |
| Copy das fundadoras intocada | Global Constraints + 5 Step 7 |

Sem lacunas.

**Placeholders:** nenhum "TBD"/"TODO"/"similar à Task N". Todo passo de código traz o código.

**Consistência de tipos:** `faqSection` é `{ eyebrow, title }` na Task 1 e é consumido com esses dois nomes na Task 2. `nav.faq` é declarado na Task 1 e usado na Task 3. `hero.lines` continua tupla de 3 na Task 4, como `Hero.astro:25-27` exige.

**Uma ressalva registrada:** a Task 5 assume que a primeira resposta do FAQ em `en` e `es` tem estrutura equivalente à portuguesa. Se o texto divergir, o implementador deve ler o valor real antes de editar — o objetivo é a presença do termo, não a frase literal deste plano.
