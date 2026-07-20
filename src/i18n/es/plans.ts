export const plans = {
  eyebrow: "Planes",
  titleLines: ["Una regla.", " Y estás al principio de ella."] as [string, string],
  lede:
    "El precio por licencia sube R$ 0,50 cada diez clientes. Donde entres, ahí se queda tu precio — fijo, mientras dure la suscripción.",
  rulerStart: "Tramo actual",
  rulerEnd: "Próximos tramos",
  rulerAria:
    "Regla de precios: el tramo actual tiene {taken} de {size} plazas ocupadas; cada tramo siguiente cuesta R$ 0,50 más por licencia.",
  tierCurrentLabel: "Tramo abierto ahora · Fundadores",
  freeLabel: "Gratis",
  freeSub: "Acceso vitalicio, por licencia de usuario",
  slotsRemaining: "plazas restantes",
  cursorLabel: "{count} plazas hasta que suba el precio",
  ctaText: "Quiero una plaza",
  nextTierNote:
    "Cuando se ocupe la última plaza, este tramo se cierra y no vuelve a abrir. El siguiente empieza en {price} por licencia.",
  ceilingNote: "La escalera se detiene en {price} por licencia. No sube más allá de eso.",
  fineprint:
    "Valores por licencia de usuario, al mes, en reales brasileños. Los aumentos de tramo se aplican solo a clientes nuevos — quien ya se suscribió mantiene su precio de entrada.",
  updatedAtLabel: "Plazas verificadas el {date}",
} as const;
