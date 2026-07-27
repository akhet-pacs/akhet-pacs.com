export const plans = {
  eyebrow: "Fundadores · 10 plazas",
  titleLines: ["Las 10 primeras clínicas", " nunca pagan."] as [string, string],
  lede:
    "Una suscripción cubre toda la clínica — cada estación, todo el equipo. Las diez primeras nunca pagan: reservan su plaza ahora y fijan el gratis de por vida para cuando los instaladores estén listos. Después de ellas, cada tramo de diez clientes sube R$ 0,50 al mes.",
  rulerStart: "Tramo actual",
  rulerEnd: "Próximos tramos",
  rulerAria:
    "Regla de plazas: de las {size} plazas de fundadora, {taken} ya están ocupadas; después de las diez, cada tramo cuesta R$ 0,50 más al mes.",
  tierCurrentLabel: "Plaza de fundadora · abierta",
  freeLabel: "Gratis",
  freeSub: "Para siempre — toda la clínica, cada estación incluida.",
  perksLabel: "Lo que es tuyo como fundadora",
  perks: [
    "Gratis de por vida, sin tarjeta y sin plazo",
    "Todas las máquinas y todo el equipo, sin cobro por estación",
    "Línea directa conmigo — sin tickets, sin cola de soporte",
    "Lo que tu rutina exige entra primero en el roadmap",
    "Akhet se ajusta a tu rutina — no tu rutina a Akhet",
  ],
  inReturn:
    "Línea directa con quien lo construye: pides lo que tu rutina exige y ves el cambio llegar — sin abrir tickets, sin cola de soporte.",
  slotsRemaining: "plazas de fundadora",
  cursorLabel: "{count} plazas antes de que empiece el precio",
  ctaText: "Quiero una de las 10",
  nextTierNote:
    "Ocupadas las diez, este tramo se cierra y no vuelve a abrir. A partir de ahí, cada cliente paga {price} al mes.",
  ceilingNote: "El precio sube R$ 0,50 por tramo hasta {price} y ahí se detiene — aún por debajo de un visor importado.",
  fineprint:
    "Una suscripción por clínica o profesional, al mes, cubre máquinas y usuarios ilimitados, en reales brasileños. El precio del tramo en el que entres no cambia mientras dure la suscripción — los aumentos se aplican solo a clientes nuevos.",
  updatedAtLabel: "Plazas verificadas el {date}",
} as const;
