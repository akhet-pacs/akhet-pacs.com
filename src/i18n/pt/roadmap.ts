export const roadmap = {
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
          "MPR triplanar — pronto",
          "Renderização 3D de volume — pronto",
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
} as const;
