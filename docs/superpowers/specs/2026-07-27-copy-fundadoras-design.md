# Copy das clínicas fundadoras: de cobaia a dona do produto

Data: 2026-07-27
Status: aprovado, aguardando plano de implementação

## Problema

O copy atual das "10 primeiras clínicas" vende o grátis vitalício como **pagamento por
trabalho de QA**. Três frases carregam isso:

- `plans.inReturn`: "Em troca: usar em rotina real e me dizer, sem filtro, onde a
  ferramenta atrapalha." — contrato de teste explícito, e ainda pressupõe que a
  ferramenta atrapalha.
- `sections.status.honest`: "É exatamente aí que o projeto precisa de gente." — a
  clínica entra como recurso do projeto, não como cliente.
- `faq` ("Como faço para participar?"): "o seu feedback vira prioridade no roadmap" —
  a contrapartida do grátis é o feedback.

O efeito é que a clínica se lê como cobaia de um produto imaturo.

## Eixo da correção

Trocar a natureza da reciprocidade:

| De | Para |
| --- | --- |
| Grátis **em troca de** teste e feedback | Grátis **por ter chegado primeiro** |
| "Seu feedback importa" (ela dá) | "Você pede e sai rápido" (ela recebe) |
| Usuária que valida o produto | Dona que molda o produto |
| Proximidade como obrigação dela | Proximidade como conveniência dela |

Duas travas:

1. **A vaga não tem contrapartida no site.** É reconhecimento de quem entrou primeiro.
   Qualquer "em troca" reintroduz o problema.
2. **O site não menciona coleta de dados, sugestões ou feedback.** A coleta existe e é
   real, mas é tratada **no contrato**, não no marketing. As mudanças abaixo removem
   toda menção, então site e contrato ficam consistentes por construção.

O produto **não** é posicionado como imaturo. O que já existe sustenta rotina clínica.

Curadoria de pedidos ("serve só para esse cliente ou serve para o produto?") **não**
aparece nesta fase — hoje todo pedido é bem-vindo. Vira assunto quando houver cobrança.

## Mudanças (pt)

### 1. `src/i18n/pt/plans.ts` — `inReturn`

- **Antes:** "Em troca: usar em rotina real e me dizer, sem filtro, onde a ferramenta
  atrapalha."
- **Depois:** "Linha direta com quem constrói: você pede o que a sua rotina exige e vê a
  mudança chegar — sem abrir chamado, sem fila de suporte."

### 2. `src/i18n/pt/plans.ts` — `perks`

- "Linha direta comigo para pedir e reportar" → "Linha direta comigo — sem chamado, sem
  fila de suporte" ("reportar" é vocabulário de QA)
- "Sua rotina e seus exames viram prioridade no roadmap" → "O que a sua rotina exige
  entra primeiro no roadmap" ("viram prioridade" premia o esforço dela; "entra primeiro"
  entrega resultado)
- **Novo perk:** "O Akhet se ajusta à sua rotina — não a sua rotina ao Akhet."

### 3. `src/i18n/pt/plans.ts` — `perksLabel`

- **Antes:** "O que a fundadora recebe" (cortesia concedida)
- **Depois:** "O que é seu como fundadora" (posse)

### 4. `src/i18n/pt/sections.ts` — `status.honest`

- **Antes:** "... É exatamente aí que o projeto precisa de gente."
- **Depois:** "... É a fase em que as primeiras clínicas entram — e é a rotina delas que
  define a ordem do que vem depois."

O resto do parágrafo (study browser, instaladores) permanece.

### 5. `src/i18n/pt/faq.ts` — pergunta da clínica

- Pergunta: "Sou de uma clínica. Como faço para participar?" → "Sou de uma clínica. Como
  entro?" ("participar" é palavra de programa de testes)
- Resposta: remover "e o seu feedback vira prioridade no roadmap"; usar "e a sua rotina
  entra na fila do que é construído em seguida".

### 6. `src/i18n/pt/sections.ts` — `hero.lede`

- **Antes:** "Um visualizador DICOM nativo virando um PACS completo."
- **Depois:** "Um visualizador DICOM nativo, rodando sobre exames reais, a caminho de um
  PACS completo."

Não anunciar incompletude na primeira linha da página.

## Fora de escopo (não muda)

- "Fundadores · 10 vagas" e "As 10 primeiras clínicas nunca pagam"
- A escada de preço, o teto e a fineprint
- A seção "Sem maquiagem: o estado real" — é ativo de credibilidade; perde apenas a
  frase que convocava gente
- As estatísticas do hero e a seção de demo

## Localização

`en` e `es` recebem as mesmas seis mudanças, com o mesmo eixo — traduzidas por
equivalência de tom, não ao pé da letra. O pt é a referência.

## Critério de sucesso

Lendo a página inteira, uma clínica não encontra nenhuma frase que condicione o preço a
testar, reportar, dar feedback ou fornecer dados. O que ela encontra é: entrou primeiro,
não paga, fala direto com quem constrói e o que ela pede molda o produto.
