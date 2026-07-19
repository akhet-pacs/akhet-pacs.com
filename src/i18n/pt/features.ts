export const features = {
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
} as const;
