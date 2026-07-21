export const features = {
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
        title: "Native + GPU end to end",
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
} as const;
