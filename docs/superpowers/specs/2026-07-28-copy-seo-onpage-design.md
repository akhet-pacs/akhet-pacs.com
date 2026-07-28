# SEO on-page: FAQ visível, categoria nos headings e vocabulário de busca

Data: 2026-07-28
Status: aprovado, aguardando plano de implementação

## Problema

O site tem uma landing por idioma e nada mais. Nas buscas que uma clínica faria antes
de conhecer o produto — "visualizador DICOM grátis", "software PACS para clínicas" — o
akhetpacs.com não aparece na primeira página. Nas buscas de marca ("Akhet PACS") aparece
em primeiro, o que não adquire ninguém: quem busca a marca já sabe que ela existe.

O gargalo principal é autoridade e volume de conteúdo, e isso não se resolve por edição
de texto. Mas a medição da página revelou três defeitos on-page reais, e é isso que este
spec corrige.

### O FAQ existe, mas ninguém o vê

`src/i18n/*/faq.ts` tem oito perguntas e respostas, traduzidas nos três idiomas. Elas
alimentam o `FAQPage` do JSON-LD em `Layout.astro` — e nada mais. Nenhuma delas é
renderizada na página:

```
'O que é o Akhet PACS?'   no HTML todo: 1 | fora de <script>: 0
'tomografia'              no HTML todo: 1 | fora de <script>: 0
'ressonância'             no HTML todo: 1 | fora de <script>: 0
'Window/level'            no HTML todo: 1 | fora de <script>: 0
```

Duas consequências. O Google exige que dados estruturados reflitam conteúdo visível na
página, e marcação de FAQ sem o FAQ à vista é exatamente o caso que a diretriz proíbe.
E, mais concretamente: é conteúdo pronto, denso nos termos que faltam à página, que não
rende nada.

### O H1 não diz o que o produto é

```
<h1> As 10 primeiras clínicas nunca pagam.
```

O H1 é o sinal on-page mais forte depois do `<title>`. O atual carrega a promessa
comercial e nenhuma palavra da categoria. Dos nove H2, dois citam PACS e nenhum cita
DICOM.

### O corpo do texto **não** é o problema

Medição da home em português, texto visível:

| termo | ocorrências |
| --- | --- |
| clínica | 14 |
| DICOM | 10 |
| visualizador | 9 |
| exame | 9 |
| PACS | 8 |

São 1.467 palavras visíveis. A cobertura de termos é razoável, e reescrever o corpo para
aumentar densidade renderia pouco a um custo alto: essa copy é resultado do spec
`2026-07-27-copy-fundadoras-design.md`, afinada para que a clínica não se leia como
cobaia. As edições de corpo aqui são pontuais e guiadas por lacuna medida.

## Decisões

| Questão | Decisão |
| --- | --- |
| Blog ou páginas novas? | Fora de escopo. Só a landing existente. |
| Onde entra o FAQ? | Seção própria, colapsável, antes do CTA final. |
| Abordagem da revisão | Guiada por lacuna medida, não reescrita cega. |
| en/es | Traduzir a intenção; sem pesquisa de keyword local. |
| Copy das fundadoras | Intocável. Nenhum termo entra às custas dela. |

## Arquitetura

Nenhuma rota nova. Três arquivos tocados e um criado:

```
src/sections/Faq.astro          NOVO — <details>/<summary>, sem JavaScript
src/components/Landing.astro    <Faq /> entre <Contribute /> e <CallToAction />
src/data/navigation.ts          item "FAQ" apontando para #faq
src/i18n/*/{faq,sections,chrome}.ts   headings e inserções pontuais
```

`src/i18n/*/faq.ts` passa a ser **fonte única** da página visível e do JSON-LD. Hoje só o
schema consome; depois, ambos leem o mesmo array. A divergência entre marcação e página
— o defeito que originou este spec — fica impossível por construção.

A seção usa `<details>`/`<summary>` nativos: colapso sem JavaScript, teclado e leitor de
tela sem ARIA manual, e o texto das respostas presente no HTML mesmo com o item fechado.
Segue o padrão do repo, que só usa script no seletor de idioma e nas abas do Demo.

## Headings

O H1 é montado em três linhas, a terceira com destaque visual
(`hero__line--accent`). A estrutura é preservada:

| | linha 1 | linha 2 | linha 3 (destaque) |
| --- | --- | --- | --- |
| antes | As 10 primeiras | clínicas | nunca pagam. |
| depois | Visualizador DICOM para clínicas. | As 10 primeiras | nunca pagam. |

Em inglês, `DICOM viewer for clinics.`; em espanhol, `Visor DICOM para clínicas.`

Risco conhecido: a primeira linha fica bem mais longa que a atual e o hero usa tipografia
grande, então pode quebrar mal em telas estreitas. A validação visual é do usuário. Se
ficar ruim, o fallback é encurtar para `Visualizador DICOM.`

Um único H2 muda:

```
"É assim que ele está hoje."  →  "É assim que o visualizador DICOM está hoje."
```

`"Trabalha com imagem médica?"` fica — é a única pergunta direta que a landing faz ao
leitor, e trocá-la por palavra-chave sacrificaria conversão. `"Um PACS não se constrói
sozinho."` e `"Do visualizador ao PACS completo"` já carregam categoria.

## Vocabulário

Com o FAQ renderizado, `tomografia`, `ressonância`, `ultrassom`, `mamografia` e
`angiografia` deixam de valer zero sem que se escreva uma linha — as respostas já os
contêm.

Sobra pouco para o corpo. Termos que a clínica digita e que a página não usa em lugar
nenhum:

| termo | ocorrências hoje | observação |
| --- | --- | --- |
| "sistema PACS" | 0 | a busca é por *sistema*; o site sempre diz "PACS" sozinho |
| "laudo" | 0 | o site usa só o verbo ("lauda", 1x); o substantivo é a forma buscada |
| "estação de trabalho" | 0 | "estação" aparece 2x, sempre como "estações incluídas" |

São inserções pontuais em frases existentes, não parágrafos novos.

Em en/es, garantir que os termos de categoria estejam corretos e naturais no idioma
(`DICOM viewer`, `PACS software for clinics`, `visor DICOM`, `software PACS para
clínicas`), sem forçar densidade. Não há operação comercial nesses mercados, então
pesquisa de keyword local seria otimizar no vazio.

## Testes

Três testes novos em `src/i18n/copy.test.ts`, no estilo dos que já guardam a copy:

1. **Cobertura de vocabulário** — cada idioma contém os termos de categoria (`DICOM`,
   `PACS`, modalidades) em algum ponto do dicionário. É o teste de termos banidos ao
   contrário: em vez de proibir, exige.
2. **Categoria no H1** — `hero.lines` cita DICOM nos três idiomas. Impede que uma futura
   melhoria do hero apague sem querer o único sinal de categoria do heading principal.
3. **Paridade FAQ ↔ página** — renderiza `Faq.astro` pela Container API do Astro e
   verifica que cada pergunta e cada resposta do dicionário aparece no HTML.

O teste 3 exige configuração de Vitest que o projeto não tem, e pode custar mais do que
vale. Se custar, o fallback é aceitá-lo como redundante: página e JSON-LD passam a ler o
mesmo `t.faq`, então a divergência já é impossível por construção. A decisão de abandonar
o teste 3, se ocorrer, deve ser comunicada — não silenciada.

Os testes existentes continuam valendo sem exceção. Nenhuma inserção de palavra-chave
pode introduzir vocabulário banido nem reintroduzir tom de contrapartida. **Se um termo
só couber às custas disso, ele não entra.**

## Fora de escopo

- Blog, guias, páginas de conteúdo novas
- Backlinks e prospecção
- Contraste do token `--ink-faint` (18 elementos abaixo de 4.5:1) — real, mas é decisão
  de design, não de SEO
- Render delay de ~2,4 s no LCP — a landing entrega as 7 screenshots no HTML e esconde 6
  por CSS; investigação separada

## O que este spec não promete

Nenhuma dessas mudanças coloca o site na primeira página de "software PACS para
clínicas". Contra Pixeon e MV, com um domínio de dias e zero backlinks, edição de texto
não resolve. O ganho realista é cauda longa, coerência entre o `<title>` publicado e o
conteúdo da página, e a correção de um defeito de dados estruturados. O gargalo continua
sendo conteúdo e autoridade.
