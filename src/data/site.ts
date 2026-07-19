export const site = {
  name: "Akhet PACS",
  tagline: "Revealing What Matters.",
  description:
    "Visualizador DICOM moderno para clínicas, hospitais e centros de diagnóstico, em evolução para um PACS completo.",
  repository: "https://github.com/akhet-pacs/Akhet-PACS",
  contact: "contato@akhet-pacs.com",
} as const;

export const navigation = [
  { label: "Visualizador", href: "#visualizador" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Princípios", href: "#principios" },
] as const;

export type Capability = {
  icon: string;
  title: string;
  body: string;
};

export const capabilities: Capability[] = [
  {
    icon: "lucide:contrast",
    title: "Window/Level em tempo real",
    body: "Ajuste largura e centro da janela sem recarregar a série. Presets para tórax, abdome, osso e cérebro.",
  },
  {
    icon: "lucide:zoom-in",
    title: "Zoom e pan sem perda",
    body: "Navegue pela imagem em resolução total. O pixel exibido continua sendo o pixel do exame.",
  },
  {
    icon: "lucide:ruler",
    title: "Medições e anotações",
    body: "Distância, ângulo, ROI e texto livre sobre a imagem, com valores em milímetros a partir do próprio DICOM.",
  },
  {
    icon: "lucide:layers",
    title: "Múltiplas séries",
    body: "Abra estudos com várias séries lado a lado e alterne entre elas sem perder o estado de cada viewport.",
  },
  {
    icon: "lucide:gauge",
    title: "Desempenho em Rust",
    body: "Decodificação e renderização escritas em Rust, para abrir estudos grandes sem travar a estação.",
  },
  {
    icon: "lucide:monitor-down",
    title: "Multiplataforma",
    body: "Aplicativo nativo com artefatos para Windows, macOS e Linux, baixáveis a cada versão.",
  },
];

export type Phase = {
  index: string;
  name: string;
  status: "em-desenvolvimento" | "planejado";
  items: string[];
};

export const roadmap: Phase[] = [
  {
    index: "01",
    name: "Visualizador DICOM",
    status: "em-desenvolvimento",
    items: [
      "Leitura de arquivos DICOM",
      "Zoom, pan e window/level",
      "Medições e anotações",
      "Suporte a múltiplas séries",
      "Builds para Windows, macOS e Linux",
    ],
  },
  {
    index: "02",
    name: "Mini PACS",
    status: "planejado",
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
    items: [
      "Apoio ao diagnóstico",
      "Segmentação de órgãos",
      "Detecção de alterações",
      "Ferramentas para pesquisa clínica",
    ],
  },
];

export type Principle = {
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    title: "Desempenho",
    body: "Estudos grandes abrem rápido. A interface responde durante a leitura, não depois dela.",
  },
  {
    title: "Simplicidade",
    body: "Cada ferramenta faz uma coisa. Quem opera o exame não precisa aprender o software antes.",
  },
  {
    title: "Segurança",
    body: "Dados de paciente permanecem sob controle da instituição, com trilha de auditoria desde a fase 3.",
  },
  {
    title: "Escalabilidade",
    body: "A mesma base atende uma clínica com uma modalidade e um hospital com dezenas.",
  },
];
