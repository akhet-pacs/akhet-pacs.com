# akhet-pacs.com

Site comercial do [Akhet PACS](https://github.com/akhet-pacs/Akhet-PACS), construído com Astro e Tailwind v4.

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview  # serve o build
```

## Estrutura

```
src/
├── assets/            SVGs específicos do produto (glifo Akhet, corte sintético)
├── components/        Componentes reutilizáveis de UI
├── data/              Conteúdo e copy do site, tipados
├── layouts/           Documento HTML e metadados
├── pages/             Rotas
├── sections/          Blocos de uma página, montados em pages/
└── styles/
    ├── global.css     Entrada única — só imports, na ordem de cascata
    ├── base/          tokens, reset, tipografia, acessibilidade
    ├── utilities/     classes de layout e texto usadas entre seções
    └── components/    classes de componentes globais (botão, régua)
```

### Convenções de CSS

- Tokens de cor, tipografia e espaçamento vivem em `styles/base/tokens.css`. Nenhum valor de cor
  literal fora desse arquivo.
- O tema é dark por padrão — `--surface`, `--surface-raised` e `--surface-deep` são os três níveis
  de fundo; `--ink`, `--ink-soft` e `--ink-faint` os três níveis de texto.
- Estilo que pertence a um componente fica no bloco `<style>` do próprio `.astro`, com escopo.
  Só sobe para `styles/components/` quando é usado por mais de uma seção.
- Nomes de classe seguem BEM (`.viewer__canvas`, `.btn--solid`) para evitar colisão de
  especificidade entre seções.

### Ícones

Ícones vêm do [astro-icon](https://www.astroicon.dev/) com os conjuntos `lucide` e `simple-icons`:

```astro
import { Icon } from "astro-icon/components";
<Icon name="lucide:ruler" />
```

SVGs próprios do produto ficam em `src/assets/` e são importados como componente.

### Conteúdo

Copy, roadmap e listas de recursos ficam em `src/data/site.ts`. As seções em `src/sections/` só
cuidam de estrutura e estilo.
