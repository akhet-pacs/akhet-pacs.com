export const sections = {
  hero: {
    badge: "Fundadores · {count} plazas abiertas",
    lines: ["Las 10 primeras", "clínicas", "nunca pagan."],
    lede: "Un visor DICOM nativo, funcionando sobre estudios reales, en camino a un PACS completo. Quien llega con la primera luz lo usa gratis — para siempre.",
    ctaPrimary: "Quiero una de las 10",
    ctaSecondary: "Ver el visor",
    seatsNote: "{count} plazas · gratis de por vida",
    stats: [
      { value: "727", label: "commits" },
      { value: "1312", label: "tests" },
      { value: "8", label: "módulos" },
      { value: "1/5", label: "fase del roadmap" },
    ],
  },
  status: {
    eyebrow: "Dónde está el proyecto",
    titleLines: ["Lo que ya funciona,", "y lo que viene ahora."],
    lede: "Akhet nació como un visor DICOM y está a mitad de la fase 1: el núcleo clínico — window/level, mediciones, multi-viewport, MPR — ya funciona sobre estudios reales de CT, MR, US, mamografía y angiografía.",
    honest:
      "Lo que falta es lo que menos aparece en capturas: el study browser, para que la sesión no empiece de cero, y los instaladores de Windows y macOS, para que una clínica pueda simplemente descargar y abrir. Es la fase en la que entran las primeras clínicas — y es su rutina la que define el orden de lo que viene después.",
  },
  demo: {
    eyebrow: "Directo del visor · capturas reales",
    title: "Así está hoy.",
    lede: "Capturas reales de Akhet abriendo muestras DICOM públicas. Reconstrucción multiplanar (MPR), renderizado 3D del volumen y las herramientas de medición — todo en la misma interfaz oscura, con la información clínica en las esquinas.",
    tablistLabel: "Funciones del visor",
    altPrefix: "Akhet PACS con",
    panHint: "Arrastra la imagen hacia el costado para ver toda la interfaz.",
    shots: [
      {
        key: "mpr",
        label: "MPR",
        caption: "Reconstrucción multiplanar: los tres planos ligados por la cruz — mueves uno y los demás acompañan.",
      },
      {
        key: "volume3d",
        label: "3D",
        caption: "Renderizado de volumen del estudio — hueso y piel en profundidad, rotable en tiempo real.",
      },
      {
        key: "cobb",
        label: "Ángulo de Cobb",
        caption: "Ángulo de Cobb sobre la columna — la medición que los ortopedistas usan para la escoliosis.",
      },
      {
        key: "angle",
        label: "Ángulo",
        caption: "Ángulo libre entre dos segmentos, con el valor anclado al vértice.",
      },
      {
        key: "ellipse",
        label: "Elipse",
        caption: "ROI elíptica para estadísticas de región sobre el corte.",
      },
      {
        key: "polygon",
        label: "Polígono",
        caption: "Polígono cerrado para contornear estructuras irregulares.",
      },
      {
        key: "pencil",
        label: "Lápiz",
        caption: "Trazo libre para anotar directamente sobre la imagen.",
      },
    ],
  },
  clinics: {
    eyebrow: "Para clínicas",
    title: "¿Trabajas con imágenes médicas?",
    lede: "Si eres de una clínica o centro de diagnóstico, escríbenos contando qué modalidades usas. Nos pondremos en contacto en cuanto haya un build para tu sistema — y tu rutina entra en la fila de lo que se construye a continuación.",
    whatsappMessage: "¡Hola, Jônatas! Soy de una clínica y quiero conocer Akhet PACS.",
    btnWhatsapp: "Hablar por WhatsApp",
  },
} as const;
