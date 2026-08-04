/**
 * Interpolação dos marcadores `{nome}` que as strings dos dicionários trazem.
 * Sem um ponto único, cada seção reinventava o `String.replace` — e a que
 * esquecesse ficava exibindo o marcador cru para o visitante.
 */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/**
 * Data ISO (`AAAA-MM-DD`) no formato do idioma da página. O `T00:00:00` evita
 * que a data seja lida como UTC e volte um dia no fuso do visitante.
 */
export function formatDate(iso: string, localeTag: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(localeTag);
}
