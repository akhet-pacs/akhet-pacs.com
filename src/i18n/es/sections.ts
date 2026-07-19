export const sections = {
  hero: {
    badge: "En construcción · fase 1 de 5",
    lines: ["Revelando", "lo que realmente", "importa."],
    lede: "Un visor DICOM nativo en Rust — rápido, preciso y auditable — construido commit a commit, rumbo a un PACS completo.",
    ctaPrimary: "Construir juntos",
    ctaSecondary: "Ver el visor",
    stats: [
      { value: "507", label: "commits" },
      { value: "204", label: "tests" },
      { value: "8", label: "crates Rust" },
      { value: "1/5", label: "fase del roadmap" },
    ],
  },
  status: {
    eyebrow: "Dónde está el proyecto",
    titleLines: ["Sin maquillaje:", "el estado real."],
    lede: "Akhet nació como un visor DICOM y está a mitad de la fase 1: el núcleo clínico — window/level, mediciones, multi-viewport, MPR — ya funciona sobre estudios reales de CT, MR, US, mamografía y angiografía.",
    honest:
      "Lo que falta es lo que menos aparece en capturas: el study browser, para que la sesión no empiece de cero, y los instaladores de Windows y macOS, para que una clínica pueda simplemente descargar y abrir. Es exactamente ahí donde el proyecto necesita gente.",
  },
  demo: {
    eyebrow: "Directo del visor · sin mockup",
    title: "Así está hoy.",
    lede: "Capturas reales de Akhet abriendo una muestra DICOM pública. Interfaz oscura, información clínica en las esquinas y las herramientas de medición a un atajo de distancia.",
    tablistLabel: "Herramientas de medición",
    altPrefix: "Akhet PACS con la herramienta",
    panHint: "Arrastrá la imagen hacia el costado para ver toda la interfaz.",
    shots: [
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
    title: "¿Trabajás con imágenes médicas?",
    lede: "Si sos de una clínica o centro de diagnóstico, escribinos contando qué modalidades usás. Nos pondremos en contacto en cuanto haya un build para tu sistema — y tu feedback se vuelve prioridad en el roadmap.",
    whatsappMessage: "¡Hola, Jônatas! Soy de una clínica y quiero conocer Akhet PACS.",
    btnWhatsapp: "Hablar por WhatsApp",
  },
} as const;
