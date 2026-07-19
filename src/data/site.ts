export const site = {
  name: "Akhet PACS",
  tagline: "Revealing What Matters.",
  description:
    "Visualizador DICOM nativo em Rust, construído em aberto, evoluindo para um PACS completo para clínicas, hospitais e centros de diagnóstico.",
  repository: "https://github.com/akhet-pacs/Akhet-PACS",
  contact: "contato@akhet-pacs.com",
} as const;

export const navigation = [
  { label: "Agora", href: "#agora" },
  { label: "Visualizador", href: "#visualizador" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Construir junto", href: "#construir" },
] as const;

export const heroStats = [
  { value: "507", label: "commits" },
  { value: "204", label: "testes" },
  { value: "8", label: "crates Rust" },
  { value: "1/5", label: "fase do roadmap" },
] as const;

export type Capability = {
  icon: string;
  title: string;
  body: string;
};

export const capabilities: Capability[] = [
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
];

export type Phase = {
  index: string;
  name: string;
  status: "em-desenvolvimento" | "planejado";
  summary: string;
  items: string[];
};

export const roadmap: Phase[] = [
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
];

export type ContributionArea = {
  icon: string;
  title: string;
  body: string;
};

export const contributionAreas: ContributionArea[] = [
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
];

export type Principle = {
  title: string;
  body: string;
};

export const principles: Principle[] = [
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
];
