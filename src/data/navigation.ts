import { localePath, useDict, type Locale } from "../i18n";

export type NavItem = { label: string; href: string };

export function buildNavigation(locale: Locale): NavItem[] {
  const t = useDict(locale);
  const base = localePath(locale);

  return [
    { label: t.nav.agora, href: `${base}#agora` },
    { label: t.nav.visualizador, href: `${base}#visualizador` },
    { label: t.nav.roadmap, href: `${base}#roadmap` },
    { label: t.nav.planos, href: `${base}#planos` },
    { label: t.nav.construir, href: `${base}#construir` },
  ];
}
