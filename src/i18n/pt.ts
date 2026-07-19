import type { Dict } from "./types";

export const pt: Dict = {
  meta: {
    title: "Akhet PACS — Revealing What Matters.",
    description:
      "Visualizador DICOM nativo em Rust, evoluindo para um PACS completo para clínicas, hospitais e centros de diagnóstico.",
  },
  skipLink: "Ir para o conteúdo",
  nav: {
    agora: "Agora",
    visualizador: "Visualizador",
    roadmap: "Roadmap",
    construir: "Construir junto",
  },
  hero: {
    badge: "Em construção · fase 1 de 5",
    lines: ["Revelando", "o que realmente", "importa."],
    lede: "Um visualizador DICOM nativo em Rust — rápido, preciso e auditável — sendo construído commit a commit, rumo a um PACS completo.",
    ctaPrimary: "Construir junto",
    ctaSecondary: "Ver o visualizador",
    stats: [
      { value: "507", label: "commits" },
      { value: "204", label: "testes" },
      { value: "8", label: "crates Rust" },
      { value: "1/5", label: "fase do roadmap" },
    ],
  },
  status: {
    eyebrow: "Onde o projeto está",
    titleLines: ["Sem maquiagem:", "o estado real."],
    lede: "O Akhet nasceu como um visualizador DICOM e está no meio da fase 1: o núcleo clínico — window/level, medições, multi-viewport, MPR — já funciona sobre exames reais de CT, MR, US, mamografia e angiografia.",
    honest:
      "O que falta é o que menos aparece em screenshot: o study browser, para a sessão não começar do zero, e os instaladores de Windows e macOS, para uma clínica conseguir simplesmente baixar e abrir. É exatamente aí que o projeto precisa de gente.",
  },
  capabilities: {
    eyebrow: "Fase 1 · funcionando hoje",
    titleLines: ["Isto não é mockup.", "Já roda."],
    lede: "Cada item abaixo existe no código, coberto por testes que rodam contra exames DICOM reais a cada commit. Tudo o que vem depois — mini PACS, servidor, integrações — nasce sobre esta base.",
    items: [
      {
        icon: "lucide:contrast",
        title: "Window/Level clínico",
        body: "Presets de partes moles, osso, pulmão, cérebro, fígado e mediastino. Pixels mono em 32 bits — US de 16 bits em faixa alta não estoura.",
      },
      {
        icon: "lucide:ruler",
        title: "Medições completas",
        body: "Régua, ângulo, ângulo de Cobb, desvio, elipse, seta, polígono e lápis — com valores em milímetros vindos da geometria do próprio exame.",
      },
      {
        icon: "lucide:layout-grid",
        title: "Multi-viewport até 5×4",
        body: "Séries agrupadas por geometria, arrastar e soltar pastas inteiras, cine multiframe por viewport e linhas de referência entre séries.",
      },
      {
        icon: "lucide:axis-3d",
        title: "MPR triplanar",
        body: "Reconstrução multiplanar no espaço do paciente com crosshair sincronizado: clicar num plano leva os outros dois ao mesmo ponto.",
      },
      {
        icon: "lucide:palette",
        title: "14 mapas de cor",
        body: "LUTs por viewport renderizadas na GPU, com testes de paridade CPU–GPU rodando no CI a cada commit.",
      },
      {
        icon: "lucide:keyboard",
        title: "~48 atalhos de teclado",
        body: "Modelo de atalhos inspirado no RadiAnt. Quem já lauda em outro viewer não recomeça do zero.",
      },
      {
        icon: "lucide:cpu",
        title: "Rust + GPU de ponta a ponta",
        body: "Decodificação via dicom-rs e renderização wgpu com shader e LUT na GPU. Estudos grandes abrem sem travar a estação.",
      },
      {
        icon: "lucide:shield-check",
        title: "PHI protegido por construção",
        body: "Nenhum nome, UID ou caminho de paciente chega a log ou sessão gravada. Os próprios tipos redigem dados sensíveis no Debug.",
      },
      {
        icon: "lucide:test-tube-2",
        title: "Testado contra DICOM real",
        body: "204 testes sobre amostras reais de CT, MR, US, XA, mamografia, cintilografia e endoscopia — inclusive séries volumétricas.",
      },
    ],
  },
  demo: {
    eyebrow: "Direto do viewer · sem mockup",
    title: "É assim que ele está hoje.",
    lede: "Capturas reais do Akhet abrindo uma amostra DICOM pública. Interface escura, informações clínicas nos cantos e as ferramentas de medição a um atalho de distância.",
    tablistLabel: "Ferramentas de medição",
    altPrefix: "Akhet PACS com a ferramenta",
    panHint: "Arraste a imagem para o lado para ver a interface inteira.",
    shots: [
      {
        key: "cobb",
        label: "Ângulo de Cobb",
        caption: "Ângulo de Cobb sobre coluna — a medição que ortopedistas usam para escoliose.",
      },
      {
        key: "angle",
        label: "Ângulo",
        caption: "Ângulo livre entre dois segmentos, com o valor ancorado ao vértice.",
      },
      {
        key: "ellipse",
        label: "Elipse",
        caption: "ROI elíptica para estatísticas de região sobre o corte.",
      },
      {
        key: "polygon",
        label: "Polígono",
        caption: "Polígono fechado para contornar estruturas de forma irregular.",
      },
      {
        key: "pencil",
        label: "Lápis",
        caption: "Traço livre para anotar direto sobre a imagem.",
      },
    ],
  },
  roadmap: {
    eyebrow: "Roadmap · onde isto vai chegar",
    title: "Do visualizador ao PACS completo",
    lede: "Cinco fases, em ordem, documentadas com estudo de seis concorrentes. Cada fase só começa quando a anterior está em uso de verdade.",
    statusLabels: {
      "em-desenvolvimento": "Em desenvolvimento",
      planejado: "Planejado",
    },
    phases: [
      {
        index: "01",
        name: "Visualizador DICOM",
        status: "em-desenvolvimento",
        summary: "O núcleo clínico já funciona. Faltam o study browser e os instaladores.",
        items: [
          "Zoom, pan e window/level — pronto",
          "Medições e anotações — pronto",
          "Multi-série e multi-viewport — pronto",
          "MPR triplanar — em construção",
          "Study browser — próximo",
          "Instaladores Windows e macOS — próximo",
        ],
      },
      {
        index: "02",
        name: "Mini PACS",
        status: "planejado",
        summary: "O exame deixa de ser um arquivo e vira um acervo pesquisável.",
        items: [
          "Importação de exames",
          "Organização por paciente",
          "Busca e indexação de estudos",
          "Armazenamento local",
          "Compartilhamento interno",
        ],
      },
      {
        index: "03",
        name: "PACS completo",
        status: "planejado",
        summary: "O Akhet vira servidor: as modalidades enviam direto para ele.",
        items: [
          "Servidor DICOM",
          "Query/Retrieve e C-STORE",
          "Worklist e integração com modalidades",
          "Controle de usuários e auditoria",
          "Alta disponibilidade",
        ],
      },
      {
        index: "04",
        name: "Plataforma clínica",
        status: "planejado",
        summary: "Integração com o resto do hospital, do RIS ao navegador.",
        items: [
          "Integração com RIS e HIS",
          "HL7 e FHIR",
          "Visualizador web",
          "Aplicativos desktop e mobile",
        ],
      },
      {
        index: "05",
        name: "Inteligência artificial",
        status: "planejado",
        summary: "Apoio ao radiologista sobre a base que as fases anteriores construíram.",
        items: [
          "Apoio ao diagnóstico",
          "Segmentação de órgãos",
          "Detecção de alterações",
          "Ferramentas para pesquisa clínica",
        ],
      },
    ],
  },
  principles: {
    eyebrow: "Engenharia",
    titleLines: ["Software médico", "levado a sério."],
    lede: "Software de imagem médica é usado por anos e carrega dados de pacientes. Estas garantias não são promessa de documento: são verificadas pelo compilador e pelo CI a cada commit.",
    items: [
      {
        title: "Arquitetura imposta pelo compilador",
        body: "Camadas hexagonais em que a regra de dependência é verificada em build: o domínio não conhece banco, a apresentação não conhece GPU.",
      },
      {
        title: "Disciplina que dá para auditar",
        body: "Máximo de 200 linhas por arquivo, testes separados do código, zero unwrap em produção — tudo verificado por gates próprios no CI.",
      },
      {
        title: "Dados de paciente são sagrados",
        body: "PHI nunca toca log, telemetria ou gravação de sessão. Não é política escrita num documento: é o sistema de tipos que impede.",
      },
      {
        title: "Reprodutível por padrão",
        body: "Cada sessão pode ser gravada e reexecutada evento a evento contra o build atual. Bug reportado é bug reproduzível.",
      },
    ],
  },
  contribute: {
    eyebrow: "Construir junto",
    title: "Um PACS não se constrói sozinho.",
    lede: "Procuro gente que queira construir software médico de verdade — em Rust, com arquitetura limpa e testes sobre exames reais. Em troca, você ajuda a moldar uma aplicação da qual vai se orgulhar, desde a fundação.",
    areas: [
      {
        icon: "lucide:package",
        title: "Distribuição e instaladores",
        body: "O CI já compila em Windows e macOS. Falta transformar isso em instaladores que uma clínica baixa e usa — hoje é o maior bloqueio do projeto.",
      },
      {
        icon: "lucide:database",
        title: "Study browser e índice local",
        body: "O índice SQLite existe e compila. Falta ligá-lo à interface para que cada sessão não comece do zero.",
      },
      {
        icon: "lucide:file-code-2",
        title: "Domínio DICOM",
        body: "Transfer syntaxes comprimidas, novas modalidades, SUV/PET, anonimização. Se você conhece o padrão, tem chão fértil aqui.",
      },
      {
        icon: "lucide:stethoscope",
        title: "Olhar clínico",
        body: "Radiologistas e técnicos que testem o viewer com exames reais e digam onde a ferramenta atrapalha em vez de ajudar.",
      },
    ],
    ctaText:
      "Interessou? Escreva contando o que você faz bem — Rust, DICOM ou rotina de clínica — e por onde gostaria de começar. O acesso ao projeto é combinado nessa conversa.",
    whatsappMessage: "Olá, Jônatas! Vi o site do Akhet PACS e quero construir junto.",
    btnWhatsapp: "Chamar no WhatsApp",
    btnEmail: "Escrever por e-mail",
  },
  clinics: {
    eyebrow: "Para clínicas",
    title: "Trabalha com imagem médica?",
    lede: "Se você é de uma clínica ou centro de diagnóstico, escreva contando quais modalidades usa. Entramos em contato assim que houver uma build para o seu sistema — e o seu feedback vira prioridade no roadmap.",
    whatsappMessage: "Olá, Jônatas! Sou de uma clínica e quero conhecer o Akhet PACS.",
    btnWhatsapp: "Falar no WhatsApp",
  },
  footer: {
    meaning:
      "Akhet é a palavra egípcia para horizonte: o sol nascendo entre duas montanhas. O nome foi escolhido pelo significado — o ponto em que a luz revela o que estava escuro — e não tem finalidade religiosa ou mitológica.",
    navLabel: "Seções do site",
  },
  menu: {
    open: "Abrir menu",
    close: "Fechar menu",
    language: "Idioma",
  },
};
