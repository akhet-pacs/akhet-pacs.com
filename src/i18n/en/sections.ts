export const sections = {
  hero: {
    badge: "Founders · 10 seats open",
    lines: ["The first 10", "clinics", "never pay."],
    lede: "A native DICOM viewer on its way to a complete PACS. Those who arrive at first light use it free — forever.",
    ctaPrimary: "Claim a founder seat",
    ctaSecondary: "See the viewer",
    seatsNote: "10 of 10 seats · free for life",
    stats: [
      { value: "727", label: "commits" },
      { value: "1312", label: "tests" },
      { value: "8", label: "modules" },
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
    lede: "Real captures of Akhet opening public DICOM samples. Multiplanar reconstruction (MPR), 3D volume rendering and the measurement tools — all in the same dark interface, with clinical information in the corners.",
    tablistLabel: "Viewer features",
    altPrefix: "Akhet PACS with",
    panHint: "Drag the image sideways to see the whole interface.",
    shots: [
      {
        key: "mpr",
        label: "MPR",
        caption: "Multiplanar reconstruction: the three planes linked by the crosshair — move one and the others follow.",
      },
      {
        key: "volume3d",
        label: "3D",
        caption: "Volume rendering of the study — bone and skin in depth, rotatable in real time.",
      },
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
