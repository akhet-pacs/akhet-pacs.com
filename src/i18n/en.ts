import type { Dict } from "./types";

export const en: Dict = {
  meta: {
    title: "Akhet PACS — Revealing What Matters.",
    description:
      "Native DICOM viewer written in Rust, evolving into a complete PACS for clinics, hospitals and diagnostic imaging centers.",
  },
  skipLink: "Skip to content",
  nav: {
    agora: "Now",
    visualizador: "Viewer",
    roadmap: "Roadmap",
    construir: "Build with us",
  },
  hero: {
    badge: "Under construction · phase 1 of 5",
    lines: ["Revealing", "what really", "matters."],
    lede: "A native DICOM viewer in Rust — fast, precise and auditable — being built commit by commit, on its way to a complete PACS.",
    ctaPrimary: "Build with us",
    ctaSecondary: "See the viewer",
    stats: [
      { value: "507", label: "commits" },
      { value: "204", label: "tests" },
      { value: "8", label: "Rust crates" },
      { value: "1/5", label: "roadmap phase" },
    ],
  },
  status: {
    eyebrow: "Where the project stands",
    titleLines: ["No makeup:", "the real state."],
    lede: "Akhet started as a DICOM viewer and is halfway through phase 1: the clinical core — window/level, measurements, multi-viewport, MPR — already works on real CT, MR, US, mammography and angiography studies.",
    honest:
      "What's missing is what shows up least in screenshots: the study browser, so a session doesn't start from zero, and the Windows and macOS installers, so a clinic can simply download and open it. That is exactly where this project needs people.",
  },
  capabilities: {
    eyebrow: "Phase 1 · working today",
    titleLines: ["This is not a mockup.", "It already runs."],
    lede: "Every item below exists in the code, covered by tests that run against real DICOM studies on every commit. Everything that comes next — mini PACS, server, integrations — is built on this base.",
    items: [
      {
        icon: "lucide:contrast",
        title: "Clinical Window/Level",
        body: "Presets for soft tissue, bone, lung, brain, liver and mediastinum. Mono pixels stored in 32 bits — high-range 16-bit US never overflows.",
      },
      {
        icon: "lucide:ruler",
        title: "Full measurement suite",
        body: "Ruler, angle, Cobb angle, deviation, ellipse, arrow, polygon and pencil — with millimeter values derived from the study's own geometry.",
      },
      {
        icon: "lucide:layout-grid",
        title: "Multi-viewport up to 5×4",
        body: "Series grouped by geometry, drag-and-drop of whole folders, per-viewport multiframe cine and cross-series reference lines.",
      },
      {
        icon: "lucide:axis-3d",
        title: "Triplanar MPR",
        body: "Multiplanar reconstruction in patient space with a synchronized crosshair: clicking one plane takes the other two to the same point.",
      },
      {
        icon: "lucide:palette",
        title: "14 color maps",
        body: "Per-viewport LUTs rendered on the GPU, with CPU–GPU parity tests running in CI on every commit.",
      },
      {
        icon: "lucide:keyboard",
        title: "~48 keyboard shortcuts",
        body: "Shortcut model inspired by RadiAnt. If you already report on another viewer, you don't start from scratch.",
      },
      {
        icon: "lucide:cpu",
        title: "Rust + GPU end to end",
        body: "Decoding via dicom-rs and wgpu rendering with shader and LUT on the GPU. Large studies open without freezing the workstation.",
      },
      {
        icon: "lucide:shield-check",
        title: "PHI protected by construction",
        body: "No patient name, UID or file path ever reaches a log or recorded session. The types themselves redact sensitive data in Debug.",
      },
      {
        icon: "lucide:test-tube-2",
        title: "Tested against real DICOM",
        body: "204 tests over real samples of CT, MR, US, XA, mammography, scintigraphy and endoscopy — including volumetric series.",
      },
    ],
  },
  demo: {
    eyebrow: "Straight from the viewer · no mockup",
    title: "This is how it looks today.",
    lede: "Real captures of Akhet opening a public DICOM sample. Dark interface, clinical information in the corners and the measurement tools one shortcut away.",
    tablistLabel: "Measurement tools",
    altPrefix: "Akhet PACS with the tool",
    panHint: "Drag the image sideways to see the whole interface.",
    shots: [
      {
        key: "cobb",
        label: "Cobb angle",
        caption: "Cobb angle over the spine — the measurement orthopedists use for scoliosis.",
      },
      {
        key: "angle",
        label: "Angle",
        caption: "Free angle between two segments, with the value anchored to the vertex.",
      },
      {
        key: "ellipse",
        label: "Ellipse",
        caption: "Elliptical ROI for region statistics over the slice.",
      },
      {
        key: "polygon",
        label: "Polygon",
        caption: "Closed polygon to outline irregular structures.",
      },
      {
        key: "pencil",
        label: "Pencil",
        caption: "Freehand stroke to annotate directly on the image.",
      },
    ],
  },
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
  principles: {
    eyebrow: "Engineering",
    titleLines: ["Medical software", "taken seriously."],
    lede: "Medical imaging software is used for years and carries patient data. These guarantees are not promises in a document: they are verified by the compiler and by CI on every commit.",
    items: [
      {
        title: "Architecture enforced by the compiler",
        body: "Hexagonal layers where the dependency rule is checked at build time: the domain knows no database, the presentation knows no GPU.",
      },
      {
        title: "Discipline you can audit",
        body: "At most 200 lines per file, tests separated from code, zero unwrap in production — all verified by custom CI gates.",
      },
      {
        title: "Patient data is sacred",
        body: "PHI never touches a log, telemetry or session recording. It's not a policy written in a document: the type system prevents it.",
      },
      {
        title: "Reproducible by default",
        body: "Every session can be recorded and replayed event by event against the current build. A reported bug is a reproducible bug.",
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
  clinics: {
    eyebrow: "For clinics",
    title: "Do you work with medical imaging?",
    lede: "If you're from a clinic or diagnostic center, write telling us which modalities you use. We'll get in touch as soon as there's a build for your system — and your feedback becomes a roadmap priority.",
    whatsappMessage: "Hi Jônatas! I'm from a clinic and I'd like to know Akhet PACS.",
    btnWhatsapp: "Talk on WhatsApp",
  },
  footer: {
    meaning:
      "Akhet is the Egyptian word for horizon: the sun rising between two mountains. The name was chosen for its meaning — the point where light reveals what was dark — and has no religious or mythological purpose.",
    navLabel: "Site sections",
  },
  menu: {
    open: "Open menu",
    close: "Close menu",
    language: "Language",
  },
};
