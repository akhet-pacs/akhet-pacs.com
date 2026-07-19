export const sections = {
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
  clinics: {
    eyebrow: "For clinics",
    title: "Do you work with medical imaging?",
    lede: "If you're from a clinic or diagnostic center, write telling us which modalities you use. We'll get in touch as soon as there's a build for your system — and your feedback becomes a roadmap priority.",
    whatsappMessage: "Hi Jônatas! I'm from a clinic and I'd like to know Akhet PACS.",
    btnWhatsapp: "Talk on WhatsApp",
  },
} as const;
