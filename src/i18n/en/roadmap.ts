export const roadmap = {
  roadmap: {
    eyebrow: "Roadmap · where this is going",
    title: "From viewer to complete PACS",
    lede: "Five phases, in order, documented with a study of six competitors. Each phase only starts when the previous one is in real use.",
    statusLabels: {
      "em-desenvolvimento": "In development",
      planejado: "Planned",
    },
    phases: [
      {
        index: "01",
        name: "DICOM Viewer",
        status: "em-desenvolvimento",
        summary: "The clinical core already works. The study browser and installers are missing.",
        items: [
          "Zoom, pan and window/level — done",
          "Measurements and annotations — done",
          "Multi-series and multi-viewport — done",
          "Triplanar MPR — in progress",
          "Study browser — next",
          "Windows and macOS installers — next",
        ],
      },
      {
        index: "02",
        name: "Mini PACS",
        status: "planejado",
        summary: "The study stops being a file and becomes a searchable archive.",
        items: [
          "Study import",
          "Organization by patient",
          "Search and study indexing",
          "Local storage",
          "Internal sharing",
        ],
      },
      {
        index: "03",
        name: "Complete PACS",
        status: "planejado",
        summary: "Akhet becomes a server: modalities send straight to it.",
        items: [
          "DICOM server",
          "Query/Retrieve and C-STORE",
          "Worklist and modality integration",
          "User management and auditing",
          "High availability",
        ],
      },
      {
        index: "04",
        name: "Clinical platform",
        status: "planejado",
        summary: "Integration with the rest of the hospital, from RIS to the browser.",
        items: [
          "RIS and HIS integration",
          "HL7 and FHIR",
          "Web viewer",
          "Desktop and mobile apps",
        ],
      },
      {
        index: "05",
        name: "Artificial intelligence",
        status: "planejado",
        summary: "Support for the radiologist on top of the base the previous phases built.",
        items: [
          "Diagnostic support",
          "Organ segmentation",
          "Change detection",
          "Clinical research tools",
        ],
      },
    ],
  },
  contribute: {
    eyebrow: "Build with us",
    title: "A PACS is not built alone.",
    lede: "I'm looking for people who want to build real medical software — in Rust, with clean architecture and tests over real studies. In return, you help shape an application you'll be proud of, from the foundation up.",
    areas: [
      {
        icon: "lucide:package",
        title: "Distribution and installers",
        body: "CI already compiles on Windows and macOS. What's missing is turning that into installers a clinic can download and use — today it's the project's biggest blocker.",
      },
      {
        icon: "lucide:database",
        title: "Study browser and local index",
        body: "The SQLite index exists and compiles. It needs to be wired to the interface so each session doesn't start from zero.",
      },
      {
        icon: "lucide:file-code-2",
        title: "DICOM domain",
        body: "Compressed transfer syntaxes, new modalities, SUV/PET, anonymization. If you know the standard, there's fertile ground here.",
      },
      {
        icon: "lucide:stethoscope",
        title: "Clinical eye",
        body: "Radiologists and technologists who test the viewer with real studies and say where the tool gets in the way instead of helping.",
      },
    ],
    ctaText:
      "Interested? Write about what you do well — Rust, DICOM or clinic routine — and where you'd like to start. Access to the project is arranged in that conversation.",
    whatsappMessage: "Hi Jônatas! I saw the Akhet PACS website and I want to build with you.",
    btnWhatsapp: "Message on WhatsApp",
    btnEmail: "Write an e-mail",
  },
} as const;
