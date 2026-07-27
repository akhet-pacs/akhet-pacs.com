# Copy das fundadoras sem tom de cobaia — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remover do site toda frase que condicione o grátis vitalício das 10 clínicas fundadoras a testar, reportar, dar feedback ou fornecer dados, substituindo-a por linha direta e autoria sobre o produto.

**Architecture:** Todo o copy vive em `src/i18n/{pt,en,es}/*.ts` como objetos `as const` consumidos pelos componentes Astro — nenhum componente muda, só os dicionários. A trava contra regressão é um teste de vocabulário (`src/i18n/copy.test.ts`) que varre recursivamente cada dicionário e falha se encontrar qualquer termo banido. Cada tarefa habilita o guard para mais um idioma, então o teste falha antes da correção e passa depois.

**Tech Stack:** Astro 7, TypeScript, Vitest 3.

## Global Constraints

- Spec de referência: `docs/superpowers/specs/2026-07-27-copy-fundadoras-design.md`.
- Nenhuma menção a coleta de dados, feedback, teste, reporte de bug ou contrapartida em copy voltado a clínicas. A coleta é tratada no contrato, nunca no marketing.
- Não posicionar o produto como imaturo em headline ou lede — o que existe sustenta rotina clínica.
- Não mencionar curadoria de pedidos ("serve só para você ou para o produto") nesta fase.
- **Não muda:** "Fundadores · 10 vagas", "As 10 primeiras clínicas nunca pagam", a escada de preço, o teto, a fineprint, as estatísticas do hero, a seção de demo e a seção "Sem maquiagem: o estado real" (esta perde apenas a última frase).
- O pt é a referência de tom; en e es traduzem por equivalência, não ao pé da letra.
- Registro do es: `plans.ts` e `faq.ts` usam tuteo, `sections.ts` usa voseo. Manter o registro de cada arquivo — não uniformizar (fora de escopo).
- `perks` é tipado como `readonly string[]` em `src/i18n/types.ts:69`, então adicionar um quinto item não quebra tipos.

---

### Task 1: Guard de vocabulário + copy pt

**Files:**
- Create: `src/i18n/copy.test.ts`
- Modify: `src/i18n/pt/plans.ts:17,21,16` · `src/i18n/pt/sections.ts:5,21,71` · `src/i18n/pt/faq.ts:28-29` · `src/i18n/pt/roadmap.ts:81,101`

**Interfaces:**
- Consumes: `pt`, `en`, `es` de `src/i18n/{pt,en,es}/index.ts` (já existem).
- Produces: `src/i18n/copy.test.ts` com a constante `guarded` (lista de locales sob guard) e o mapa `banned` — as tarefas 2 e 3 apenas acrescentam um locale a `guarded`.

- [ ] **Step 1: Escrever o teste que falha**

Criar `src/i18n/copy.test.ts`:

```ts
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
const guarded: readonly Guarded[] = ["pt"];

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
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm run test -- src/i18n/copy.test.ts`
Expected: FAIL — seis testes `pt` falhando, cada um listando a frase encontrada (`em troca` em `plans.ts:21` e `roadmap.ts:81`, `feedback` em `faq.ts:29` e `sections.ts:71`, `reportar` em `plans.ts:17`, `precisa de gente` em `sections.ts:21`, `atrapalha` em `plans.ts:21` e `roadmap.ts:101`, `participar` em `faq.ts:28`).

- [ ] **Step 3: Corrigir `src/i18n/pt/plans.ts`**

`perksLabel` (linha 16), `perks` (linhas 17-18 e novo item) e `inReturn` (linha 21) passam a ser:

```ts
  perksLabel: "O que é seu como fundadora",
  perks: [
    "Grátis vitalício, sem cartão e sem prazo",
    "Todas as máquinas e toda a equipe, sem cobrar por estação",
    "Linha direta comigo — sem chamado, sem fila de suporte",
    "O que a sua rotina exige entra primeiro no roadmap",
    "O Akhet se ajusta à sua rotina — não a sua rotina ao Akhet",
  ],
  inReturn:
    "Linha direta com quem constrói: você pede o que a sua rotina exige e vê a mudança chegar — sem abrir chamado, sem fila de suporte.",
```

- [ ] **Step 4: Corrigir `src/i18n/pt/sections.ts`**

`hero.lede` (linha 5):

```ts
    lede: "Um visualizador DICOM nativo, rodando sobre exames reais, a caminho de um PACS completo. Quem chega no primeiro raio de luz usa de graça — para sempre.",
```

`status.honest` (linha 21) — só a última frase muda:

```ts
    honest:
      "O que falta é o que menos aparece em screenshot: o study browser, para a sessão não começar do zero, e os instaladores de Windows e macOS, para uma clínica conseguir simplesmente baixar e abrir. É a fase em que as primeiras clínicas entram — e é a rotina delas que define a ordem do que vem depois.",
```

`clinics.lede` (linha 71):

```ts
    lede: "Se você é de uma clínica ou centro de diagnóstico, escreva contando quais modalidades usa. Entramos em contato assim que houver uma build para o seu sistema — e a sua rotina entra na fila do que é construído em seguida.",
```

- [ ] **Step 5: Corrigir `src/i18n/pt/faq.ts`**

Pergunta e resposta da clínica (linhas 28-29):

```ts
      q: "Sou de uma clínica. Como entro?",
      a: "Fale no WhatsApp contando quais modalidades você usa. Entramos em contato assim que houver uma build para o seu sistema, e a sua rotina entra na fila do que é construído em seguida.",
```

- [ ] **Step 6: Corrigir `src/i18n/pt/roadmap.ts`**

`contribute.lede` (linha 81) — remover a transação, manter a frase:

```ts
    lede: "Procuro gente que queira construir software médico de verdade — em Rust, com arquitetura limpa e testes sobre exames reais. Você ajuda a moldar uma aplicação da qual vai se orgulhar, desde a fundação.",
```

`contribute.areas`, card "Olhar clínico" (linha 101):

```ts
        body: "Radiologistas e técnicos que queiram desenhar, sobre exames reais, a ferramenta que eles próprios usariam todo dia.",
```

- [ ] **Step 7: Rodar os testes e confirmar que passam**

Run: `npm run test`
Expected: PASS — os seis testes `pt` verdes e `src/data/pricing.test.ts` intacto.

- [ ] **Step 8: Checar tipos e build**

Run: `npx astro check && npm run build`
Expected: exit code 0, sem erros de tipo. (Conferir pelo exit code, não por grep na saída.)

- [ ] **Step 9: Commit**

```bash
git add src/i18n/copy.test.ts src/i18n/pt/plans.ts src/i18n/pt/sections.ts src/i18n/pt/faq.ts src/i18n/pt/roadmap.ts
git commit -m "feat(copy): tira o tom de cobaia do copy pt das fundadoras

Guard de vocabulario em src/i18n/copy.test.ts, habilitado para pt."
```

---

### Task 2: Copy en

**Files:**
- Modify: `src/i18n/copy.test.ts` (constante `guarded`) · `src/i18n/en/plans.ts:16,17,21` · `src/i18n/en/sections.ts:5,21,71` · `src/i18n/en/faq.ts:28-29` · `src/i18n/en/roadmap.ts:81,101`

**Interfaces:**
- Consumes: `guarded` e `banned` de `src/i18n/copy.test.ts` (Task 1).
- Produces: nada novo — só habilita `en` no guard existente.

- [ ] **Step 1: Habilitar o guard para en**

Em `src/i18n/copy.test.ts`:

```ts
/** Locales já limpos. Cada tarefa do plano acrescenta um. */
const guarded: readonly Guarded[] = ["pt", "en"];
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm run test -- src/i18n/copy.test.ts`
Expected: FAIL — seis testes `en` falhando; os seis `pt` continuam passando.

- [ ] **Step 3: Corrigir `src/i18n/en/plans.ts`**

```ts
  perksLabel: "What is yours as a founder",
  perks: [
    "Free for life — no card, no deadline",
    "Every machine and the whole team, no per-seat charge",
    "A direct line to me — no tickets, no support queue",
    "What your practice needs goes to the front of the roadmap",
    "Akhet adapts to your workflow — not your workflow to Akhet",
  ],
  inReturn:
    "A direct line to the person building it: you ask for what your practice needs and watch the change land — no tickets, no support queue.",
```

- [ ] **Step 4: Corrigir `src/i18n/en/sections.ts`**

`hero.lede` (linha 5):

```ts
    lede: "A native DICOM viewer running on real studies, on its way to a complete PACS. Those who arrive at first light use it free — forever.",
```

`status.honest` (linha 21):

```ts
    honest:
      "What's missing is what shows up least in screenshots: the study browser, so a session doesn't start from zero, and the Windows and macOS installers, so a clinic can simply download and open it. This is the phase the first clinics join — and their practice sets the order of what comes next.",
```

`clinics.lede` (linha 71):

```ts
    lede: "If you're from a clinic or diagnostic center, write telling us which modalities you use. We'll get in touch as soon as there's a build for your system — and your practice goes into the queue of what gets built next.",
```

- [ ] **Step 5: Corrigir `src/i18n/en/faq.ts`**

```ts
      q: "I run a clinic. How do I join?",
      a: "Message us on WhatsApp telling us which modalities you use. We reach out as soon as there is a build for your system, and your practice goes into the queue of what gets built next.",
```

- [ ] **Step 6: Corrigir `src/i18n/en/roadmap.ts`**

`contribute.lede` (linha 81):

```ts
    lede: "I'm looking for people who want to build real medical software — in Rust, with clean architecture and tests over real studies. You help shape an application you'll be proud of, from the foundation up.",
```

Card "Clinical eye" (linha 101):

```ts
        body: "Radiologists and technologists who want to shape, over real studies, the tool they'd want to use every day.",
```

- [ ] **Step 7: Rodar os testes e confirmar que passam**

Run: `npm run test`
Expected: PASS — doze testes de copy (pt + en) verdes.

- [ ] **Step 8: Checar tipos e build**

Run: `npx astro check && npm run build`
Expected: exit code 0.

- [ ] **Step 9: Commit**

```bash
git add src/i18n/copy.test.ts src/i18n/en/plans.ts src/i18n/en/sections.ts src/i18n/en/faq.ts src/i18n/en/roadmap.ts
git commit -m "feat(copy): tira o tom de cobaia do copy en das fundadoras"
```

---

### Task 3: Copy es

**Files:**
- Modify: `src/i18n/copy.test.ts` (constante `guarded`) · `src/i18n/es/plans.ts:16,17,21` · `src/i18n/es/sections.ts:5,21,71` · `src/i18n/es/faq.ts:28-29` · `src/i18n/es/roadmap.ts:81,101`

**Interfaces:**
- Consumes: `guarded` e `banned` de `src/i18n/copy.test.ts` (Task 1).
- Produces: nada novo — completa o guard nos três locales.

Registro: `plans.ts` e `faq.ts` em tuteo, `sections.ts` em voseo. Manter como está em cada arquivo.

- [ ] **Step 1: Habilitar o guard para es**

Em `src/i18n/copy.test.ts`:

```ts
/** Locales já limpos. Cada tarefa do plano acrescenta um. */
const guarded: readonly Guarded[] = ["pt", "en", "es"];
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm run test -- src/i18n/copy.test.ts`
Expected: FAIL — seis testes `es` falhando; os doze de pt e en continuam passando.

- [ ] **Step 3: Corrigir `src/i18n/es/plans.ts`** (tuteo)

```ts
  perksLabel: "Lo que es tuyo como fundadora",
  perks: [
    "Gratis de por vida, sin tarjeta y sin plazo",
    "Todas las máquinas y todo el equipo, sin cobro por estación",
    "Línea directa conmigo — sin tickets, sin cola de soporte",
    "Lo que tu rutina exige entra primero en el roadmap",
    "Akhet se ajusta a tu rutina — no tu rutina a Akhet",
  ],
  inReturn:
    "Línea directa con quien lo construye: pides lo que tu rutina exige y ves el cambio llegar — sin abrir tickets, sin cola de soporte.",
```

- [ ] **Step 4: Corrigir `src/i18n/es/sections.ts`** (voseo no `clinics.lede`)

`hero.lede` (linha 5):

```ts
    lede: "Un visor DICOM nativo, funcionando sobre estudios reales, en camino a un PACS completo. Quien llega con la primera luz lo usa gratis — para siempre.",
```

`status.honest` (linha 21):

```ts
    honest:
      "Lo que falta es lo que menos aparece en capturas: el study browser, para que la sesión no empiece de cero, y los instaladores de Windows y macOS, para que una clínica pueda simplemente descargar y abrir. Es la fase en la que entran las primeras clínicas — y es su rutina la que define el orden de lo que viene después.",
```

`clinics.lede` (linha 71):

```ts
    lede: "Si sos de una clínica o centro de diagnóstico, escribinos contando qué modalidades usás. Nos pondremos en contacto en cuanto haya un build para tu sistema — y tu rutina entra en la fila de lo que se construye a continuación.",
```

- [ ] **Step 5: Corrigir `src/i18n/es/faq.ts`** (tuteo)

```ts
      q: "Tengo una clínica. ¿Cómo entro?",
      a: "Escríbenos por WhatsApp contando qué modalidades usas. Te contactamos en cuanto haya una build para tu sistema, y tu rutina entra en la fila de lo que se construye a continuación.",
```

- [ ] **Step 6: Corrigir `src/i18n/es/roadmap.ts`** (voseo, como o arquivo já usa)

`contribute.lede` (linha 81):

```ts
    lede: "Busco gente que quiera construir software médico de verdad — en Rust, con arquitectura limpia y tests sobre estudios reales. Ayudás a moldear una aplicación de la que vas a estar orgulloso, desde los cimientos.",
```

Card "Mirada clínica" (linha 101):

```ts
        body: "Radiólogos y técnicos que quieran diseñar, sobre estudios reales, la herramienta que ellos mismos usarían a diario.",
```

- [ ] **Step 7: Rodar os testes e confirmar que passam**

Run: `npm run test`
Expected: PASS — os dezoito testes de copy verdes.

- [ ] **Step 8: Checar tipos e build**

Run: `npx astro check && npm run build`
Expected: exit code 0.

- [ ] **Step 9: Commit**

```bash
git add src/i18n/copy.test.ts src/i18n/es/plans.ts src/i18n/es/sections.ts src/i18n/es/faq.ts src/i18n/es/roadmap.ts
git commit -m "feat(copy): tira o tom de cobaia do copy es das fundadoras"
```

---

### Task 4: `public/llms.txt`

É o arquivo que agentes de IA leem sobre o produto. Se ele mantiver a versão antiga, um assistente vai descrever o Akhet com o enquadramento que acabamos de remover.

**Files:**
- Modify: `public/llms.txt:22-23`
- Test: `src/i18n/copy.test.ts` (novo bloco `describe`)

**Interfaces:**
- Consumes: nada das tarefas anteriores além do arquivo de teste.
- Produces: nada — última tarefa.

- [ ] **Step 1: Escrever o teste que falha**

Acrescentar ao final de `src/i18n/copy.test.ts`, e completar o import do topo para `import { readFileSync } from "node:fs";`:

```ts
describe("llms.txt conta a mesma história", () => {
  const llms = readFileSync(new URL("../../public/llms.txt", import.meta.url), "utf8");

  for (const term of banned.en) {
    it(`não usa "${term}"`, () => {
      expect(llms.toLowerCase()).not.toContain(term);
    });
  }
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm run test -- src/i18n/copy.test.ts`
Expected: FAIL — o caso `não usa "feedback"` falha por causa de `public/llms.txt:23`. Os outros cinco passam.

- [ ] **Step 3: Corrigir `public/llms.txt`**

Na seção "Founders offer (be one of the first 10)", o terceiro item passa a ser:

```
- To claim a seat, a clinic reaches out and tells us which modalities it uses;
  what its practice needs then goes to the front of the roadmap.
```

- [ ] **Step 4: Rodar os testes e confirmar que passam**

Run: `npm run test`
Expected: PASS — todos os testes de copy e `pricing.test.ts` verdes.

- [ ] **Step 5: Verificação final do critério de sucesso**

Run: `npx astro check && npm run build`
Expected: exit code 0.

Depois, conferir o HTML gerado — o guard cobre os dicionários, este passo cobre a página renderizada:

```bash
grep -ric "feedback\|em troca\|in return\|a cambio\|reportar\|participar" dist/index.html dist/en/index.html dist/es/index.html dist/llms.txt
```

Expected: `0` em todos os arquivos.

- [ ] **Step 6: Commit**

```bash
git add public/llms.txt src/i18n/copy.test.ts
git commit -m "feat(copy): alinha llms.txt ao novo posicionamento das fundadoras"
```
