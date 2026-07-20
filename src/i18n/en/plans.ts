export const plans = {
  eyebrow: "Founders · 10 seats",
  titleLines: ["The first 10 clinics", " never pay."] as [string, string],
  lede:
    "One subscription covers the whole clinic — every workstation, the whole team. The first ten never pay: they reserve their seat now and lock in free-for-life for when the installers are ready. After them, each tier of ten customers rises R$ 0.50 a month.",
  rulerStart: "Current tier",
  rulerEnd: "Next tiers",
  rulerAria:
    "Seat ruler: of the {size} founder seats, {taken} are already taken; after the ten, each tier costs R$ 0.50 more per month.",
  tierCurrentLabel: "Founder seat · open",
  freeLabel: "Free",
  freeSub: "Forever — the whole clinic, every workstation included.",
  perksLabel: "What a founder gets",
  perks: [
    "Free for life — no card, no deadline",
    "Every machine and the whole team, no per-seat charge",
    "A direct line to me for requests and bug reports",
    "Your workflow and your studies prioritised on the roadmap",
  ],
  inReturn:
    "In return: use it in real practice and tell me, unfiltered, where it gets in the way.",
  slotsRemaining: "founder seats left",
  cursorLabel: "{count} seats before pricing begins",
  ctaText: "Claim a founder seat",
  nextTierNote:
    "Once the ten are taken, this tier closes and does not reopen. After that, each customer pays {price} per month.",
  ceilingNote: "The price rises R$ 0.50 per tier up to {price}, then stops — still below an imported viewer.",
  fineprint:
    "One subscription per clinic or professional, per month, covers unlimited machines and users, in Brazilian reais. The price of the tier you join never changes while your subscription runs — increases apply only to new customers.",
  updatedAtLabel: "Seats verified on {date}",
} as const;
