export const sections = {
  hero: {
    badge: "Fundadores · 10 vagas abertas",
    lines: ["As 10 primeiras", "clínicas", "nunca pagam."],
    lede: "Um visualizador DICOM nativo em Rust virando um PACS completo. Quem chega no primeiro raio de luz usa de graça — para sempre.",
    ctaPrimary: "Quero ser uma das 10",
    ctaSecondary: "Ver o visualizador",
    seatsNote: "10 de 10 vagas · grátis vitalício",
    stats: [
      { value: "727", label: "commits" },
      { value: "1312", label: "testes" },
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
  demo: {
    eyebrow: "Direto do viewer · sem mockup",
    title: "É assim que ele está hoje.",
    lede: "Capturas reais do Akhet abrindo amostras DICOM públicas. Reconstrução multiplanar (MPR), renderização 3D do volume e as ferramentas de medição — tudo na mesma interface escura, com as informações clínicas nos cantos.",
    tablistLabel: "Recursos do visualizador",
    altPrefix: "Akhet PACS com",
    panHint: "Arraste a imagem para o lado para ver a interface inteira.",
    shots: [
      {
        key: "mpr",
        label: "MPR",
        caption: "Reconstrução multiplanar: os três planos ligados pelo cruzamento — navegue um e os outros acompanham.",
      },
      {
        key: "volume3d",
        label: "3D",
        caption: "Renderização de volume do estudo — osso e pele em profundidade, girável em tempo real.",
      },
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
  clinics: {
    eyebrow: "Para clínicas",
    title: "Trabalha com imagem médica?",
    lede: "Se você é de uma clínica ou centro de diagnóstico, escreva contando quais modalidades usa. Entramos em contato assim que houver uma build para o seu sistema — e o seu feedback vira prioridade no roadmap.",
    whatsappMessage: "Olá, Jônatas! Sou de uma clínica e quero conhecer o Akhet PACS.",
    btnWhatsapp: "Falar no WhatsApp",
  },
} as const;
