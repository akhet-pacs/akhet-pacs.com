export type Stat = { value: string; label: string };
export type IconItem = { icon: string; title: string; body: string };
export type TitledItem = { title: string; body: string };
export type Shot = { key: string; label: string; caption: string };

export type Phase = {
  index: string;
  name: string;
  status: "em-desenvolvimento" | "planejado";
  summary: string;
  items: readonly string[];
};

export type Faq = { q: string; a: string };

export type Dict = {
  meta: { title: string; description: string };
  faq: readonly Faq[];
  skipLink: string;
  nav: { agora: string; visualizador: string; roadmap: string; planos: string; construir: string };
  hero: {
    badge: string;
    lines: readonly [string, string, string];
    lede: string;
    ctaPrimary: string;
    ctaSecondary: string;
    seatsNote: string;
    stats: readonly Stat[];
  };
  status: {
    eyebrow: string;
    titleLines: readonly [string, string];
    lede: string;
    honest: string;
  };
  capabilities: {
    eyebrow: string;
    titleLines: readonly [string, string];
    lede: string;
    items: readonly IconItem[];
  };
  demo: {
    eyebrow: string;
    title: string;
    lede: string;
    tablistLabel: string;
    altPrefix: string;
    panHint: string;
    shots: readonly Shot[];
  };
  roadmap: {
    eyebrow: string;
    title: string;
    lede: string;
    statusLabels: Record<Phase["status"], string>;
    phases: readonly Phase[];
  };
  plans: {
    eyebrow: string;
    titleLines: readonly [string, string];
    lede: string;
    rulerStart: string;
    rulerEnd: string;
    rulerAria: string;
    tierCurrentLabel: string;
    freeLabel: string;
    freeSub: string;
    perksLabel: string;
    perks: readonly string[];
    inReturn: string;
    slotsRemaining: string;
    cursorLabel: string;
    ctaText: string;
    nextTierNote: string;
    ceilingNote: string;
    fineprint: string;
    updatedAtLabel: string;
  };
  principles: {
    eyebrow: string;
    titleLines: readonly [string, string];
    lede: string;
    items: readonly TitledItem[];
  };
  contribute: {
    eyebrow: string;
    title: string;
    lede: string;
    areas: readonly IconItem[];
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
  menu: {
    open: string;
    close: string;
    language: string;
  };
};
