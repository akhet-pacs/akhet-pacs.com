import type { Dict } from "./types";

export const es: Dict = {
  meta: {
    title: "Akhet PACS — Revealing What Matters.",
    description:
      "Visor DICOM nativo escrito en Rust, evolucionando hacia un PACS completo para clínicas, hospitales y centros de diagnóstico por imágenes.",
  },
  skipLink: "Ir al contenido",
  nav: {
    agora: "Ahora",
    visualizador: "Visor",
    roadmap: "Roadmap",
    construir: "Construir juntos",
  },
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
  capabilities: {
    eyebrow: "Fase 1 · funcionando hoy",
    titleLines: ["Esto no es un mockup.", "Ya funciona."],
    lede: "Cada punto de abajo existe en el código, cubierto por tests que corren contra estudios DICOM reales en cada commit. Todo lo que viene después — mini PACS, servidor, integraciones — nace sobre esta base.",
    items: [
      {
        icon: "lucide:contrast",
        title: "Window/Level clínico",
        body: "Presets de partes blandas, hueso, pulmón, cerebro, hígado y mediastino. Píxeles mono en 32 bits — US de 16 bits en rango alto no desborda.",
      },
      {
        icon: "lucide:ruler",
        title: "Mediciones completas",
        body: "Regla, ángulo, ángulo de Cobb, desviación, elipse, flecha, polígono y lápiz — con valores en milímetros derivados de la geometría del propio estudio.",
      },
      {
        icon: "lucide:layout-grid",
        title: "Multi-viewport hasta 5×4",
        body: "Series agrupadas por geometría, arrastrar y soltar carpetas enteras, cine multiframe por viewport y líneas de referencia entre series.",
      },
      {
        icon: "lucide:axis-3d",
        title: "MPR triplanar",
        body: "Reconstrucción multiplanar en el espacio del paciente con crosshair sincronizado: hacer clic en un plano lleva los otros dos al mismo punto.",
      },
      {
        icon: "lucide:palette",
        title: "14 mapas de color",
        body: "LUTs por viewport renderizadas en la GPU, con tests de paridad CPU–GPU corriendo en el CI en cada commit.",
      },
      {
        icon: "lucide:keyboard",
        title: "~48 atajos de teclado",
        body: "Modelo de atajos inspirado en RadiAnt. Quien ya informa en otro visor no empieza de cero.",
      },
      {
        icon: "lucide:cpu",
        title: "Rust + GPU de punta a punta",
        body: "Decodificación vía dicom-rs y renderizado wgpu con shader y LUT en la GPU. Estudios grandes abren sin congelar la estación.",
      },
      {
        icon: "lucide:shield-check",
        title: "PHI protegido por construcción",
        body: "Ningún nombre, UID o ruta de paciente llega a un log o sesión grabada. Los propios tipos redactan datos sensibles en Debug.",
      },
      {
        icon: "lucide:test-tube-2",
        title: "Probado contra DICOM real",
        body: "204 tests sobre muestras reales de CT, MR, US, XA, mamografía, gammagrafía y endoscopia — incluidas series volumétricas.",
      },
    ],
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
  roadmap: {
    eyebrow: "Roadmap · hacia dónde va esto",
    title: "Del visor al PACS completo",
    lede: "Cinco fases, en orden, documentadas con un estudio de seis competidores. Cada fase solo empieza cuando la anterior está en uso real.",
    statusLabels: {
      "em-desenvolvimento": "En desarrollo",
      planejado: "Planificado",
    },
    phases: [
      {
        index: "01",
        name: "Visor DICOM",
        status: "em-desenvolvimento",
        summary: "El núcleo clínico ya funciona. Faltan el study browser y los instaladores.",
        items: [
          "Zoom, pan y window/level — listo",
          "Mediciones y anotaciones — listo",
          "Multi-serie y multi-viewport — listo",
          "MPR triplanar — en construcción",
          "Study browser — próximo",
          "Instaladores Windows y macOS — próximo",
        ],
      },
      {
        index: "02",
        name: "Mini PACS",
        status: "planejado",
        summary: "El estudio deja de ser un archivo y se convierte en un acervo consultable.",
        items: [
          "Importación de estudios",
          "Organización por paciente",
          "Búsqueda e indexación de estudios",
          "Almacenamiento local",
          "Compartición interna",
        ],
      },
      {
        index: "03",
        name: "PACS completo",
        status: "planejado",
        summary: "Akhet se vuelve servidor: las modalidades envían directo hacia él.",
        items: [
          "Servidor DICOM",
          "Query/Retrieve y C-STORE",
          "Worklist e integración con modalidades",
          "Gestión de usuarios y auditoría",
          "Alta disponibilidad",
        ],
      },
      {
        index: "04",
        name: "Plataforma clínica",
        status: "planejado",
        summary: "Integración con el resto del hospital, del RIS al navegador.",
        items: [
          "Integración con RIS y HIS",
          "HL7 y FHIR",
          "Visor web",
          "Aplicaciones de escritorio y móviles",
        ],
      },
      {
        index: "05",
        name: "Inteligencia artificial",
        status: "planejado",
        summary: "Apoyo al radiólogo sobre la base que construyeron las fases anteriores.",
        items: [
          "Apoyo al diagnóstico",
          "Segmentación de órganos",
          "Detección de cambios",
          "Herramientas para investigación clínica",
        ],
      },
    ],
  },
  principles: {
    eyebrow: "Ingeniería",
    titleLines: ["Software médico", "tomado en serio."],
    lede: "El software de imágenes médicas se usa durante años y carga datos de pacientes. Estas garantías no son promesas en un documento: las verifica el compilador y el CI en cada commit.",
    items: [
      {
        title: "Arquitectura impuesta por el compilador",
        body: "Capas hexagonales donde la regla de dependencia se verifica en build: el dominio no conoce la base de datos, la presentación no conoce la GPU.",
      },
      {
        title: "Disciplina auditable",
        body: "Máximo 200 líneas por archivo, tests separados del código, cero unwrap en producción — todo verificado por gates propios en el CI.",
      },
      {
        title: "Los datos del paciente son sagrados",
        body: "El PHI nunca toca un log, telemetría o grabación de sesión. No es una política escrita en un documento: el sistema de tipos lo impide.",
      },
      {
        title: "Reproducible por defecto",
        body: "Cada sesión puede grabarse y reejecutarse evento a evento contra el build actual. Un bug reportado es un bug reproducible.",
      },
    ],
  },
  contribute: {
    eyebrow: "Construir juntos",
    title: "Un PACS no se construye solo.",
    lede: "Busco gente que quiera construir software médico de verdad — en Rust, con arquitectura limpia y tests sobre estudios reales. A cambio, ayudás a moldear una aplicación de la que vas a estar orgulloso, desde los cimientos.",
    areas: [
      {
        icon: "lucide:package",
        title: "Distribución e instaladores",
        body: "El CI ya compila en Windows y macOS. Falta convertir eso en instaladores que una clínica descarga y usa — hoy es el mayor bloqueo del proyecto.",
      },
      {
        icon: "lucide:database",
        title: "Study browser e índice local",
        body: "El índice SQLite existe y compila. Falta conectarlo a la interfaz para que cada sesión no empiece de cero.",
      },
      {
        icon: "lucide:file-code-2",
        title: "Dominio DICOM",
        body: "Transfer syntaxes comprimidas, nuevas modalidades, SUV/PET, anonimización. Si conocés el estándar, hay terreno fértil aquí.",
      },
      {
        icon: "lucide:stethoscope",
        title: "Mirada clínica",
        body: "Radiólogos y técnicos que prueben el visor con estudios reales y digan dónde la herramienta estorba en vez de ayudar.",
      },
    ],
    ctaText:
      "¿Te interesa? Escribí contando qué hacés bien — Rust, DICOM o rutina de clínica — y por dónde te gustaría empezar. El acceso al proyecto se acuerda en esa conversación.",
    whatsappMessage: "¡Hola, Jônatas! Vi el sitio de Akhet PACS y quiero construir juntos.",
    btnWhatsapp: "Escribir por WhatsApp",
    btnEmail: "Escribir por correo",
  },
  clinics: {
    eyebrow: "Para clínicas",
    title: "¿Trabajás con imágenes médicas?",
    lede: "Si sos de una clínica o centro de diagnóstico, escribinos contando qué modalidades usás. Nos pondremos en contacto en cuanto haya un build para tu sistema — y tu feedback se vuelve prioridad en el roadmap.",
    whatsappMessage: "¡Hola, Jônatas! Soy de una clínica y quiero conocer Akhet PACS.",
    btnWhatsapp: "Hablar por WhatsApp",
  },
  footer: {
    meaning:
      "Akhet es la palabra egipcia para horizonte: el sol naciendo entre dos montañas. El nombre fue elegido por su significado — el punto donde la luz revela lo que estaba oscuro — y no tiene finalidad religiosa ni mitológica.",
    navLabel: "Secciones del sitio",
  },
};
