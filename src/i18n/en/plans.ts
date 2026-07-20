export const plans = {
  eyebrow: "Pricing",
  titleLines: ["A ruler.", " And you're at the start of it."] as [string, string],
  lede:
    "The price per licence goes up R$ 0.50 every ten customers. Wherever you join, that's where your price stays — locked, for as long as your subscription runs.",
  rulerStart: "Current tier",
  rulerEnd: "Next tiers",
  rulerAria:
    "Pricing ruler: the current tier has {taken} of {size} seats taken; each following tier costs R$ 0.50 more per licence.",
  tierCurrentLabel: "Open now · Founders",
  freeLabel: "Free",
  freeSub: "Lifetime access, per user licence",
  slotsRemaining: "seats left",
  cursorLabel: "{count} seats until the price rises",
  ctaText: "Claim a seat",
  nextTierNote:
    "When the last seat is taken, this tier closes and does not reopen. The next one starts at {price} per licence.",
  ceilingNote: "The ladder stops at {price} per licence. It does not rise beyond that.",
  fineprint:
    "Prices are per user licence, per month, in Brazilian reais. Tier increases apply only to new customers — if you have already subscribed, you keep your entry price.",
  updatedAtLabel: "Seats verified on {date}",
} as const;
