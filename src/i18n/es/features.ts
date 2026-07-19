export const features = {
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
} as const;
