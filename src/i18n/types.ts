export type Stat = { value: string; label: string };
export type IconItem = { icon: string; title: string; body: string };
export type TitledItem = { title: string; body: string };
export type Shot = { key: string; label: string; caption: string };

export type Phase = {
  index: string;
  name: string;
  status: "em-desenvolvimento" | "planejado";
  summary: string;
  items: string[];
};

export type Dict = {
  meta: { title: string; description: string };
  skipLink: string;
  nav: { agora: string; visualizador: string; roadmap: string; construir: string };
  hero: {
    badge: string;
    lines: [string, string, string];
    lede: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: Stat[];
  };
  status: {
    eyebrow: string;
    titleLines: [string, string];
    lede: string;
    honest: string;
  };
  capabilities: {
    eyebrow: string;
    titleLines: [string, string];
    lede: string;
    items: IconItem[];
  };
  demo: {
    eyebrow: string;
    title: string;
    lede: string;
    tablistLabel: string;
    altPrefix: string;
    panHint: string;
    shots: Shot[];
  };
  roadmap: {
    eyebrow: string;
    title: string;
    lede: string;
    statusLabels: Record<Phase["status"], string>;
    phases: Phase[];
  };
  principles: {
    eyebrow: string;
    titleLines: [string, string];
    lede: string;
    items: TitledItem[];
  };
  contribute: {
    eyebrow: string;
    title: string;
    lede: string;
    areas: IconItem[];
    ctaText: string;
    whatsappMessage: string;
    btnWhatsapp: string;
    btnEmail: string;
  };
  clinics: {
    eyebrow: string;
    title: string;
    lede: string;
    whatsappMessage: string;
    btnWhatsapp: string;
  };
  footer: {
    meaning: string;
    navLabel: string;
  };
};
