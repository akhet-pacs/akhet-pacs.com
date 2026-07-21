export const roadmap = {
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
          "MPR triplanar — listo",
          "Renderizado 3D de volumen — listo",
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
} as const;
