export interface TierStyle {
  gradient: string;
  ring: string;
  chip: string;
  glow: string;
}

const tierStyles: Record<string, TierStyle> = {
  Bronze: {
    gradient: "from-[#B8712F] to-[#8A5323]",
    ring: "ring-[#B8712F]/30",
    chip: "bg-[#B8712F]/10 text-[#8A5323]",
    glow: "bg-[#B8712F]/25",
  },
  Silver: {
    gradient: "from-brand-grey-400 to-brand-grey-500",
    ring: "ring-brand-grey-300",
    chip: "bg-brand-grey-100 text-brand-grey-500",
    glow: "bg-brand-grey-300/40",
  },
  Gold: {
    gradient: "from-[#D9A62E] to-[#B8860B]",
    ring: "ring-[#D9A62E]/40",
    chip: "bg-[#D9A62E]/15 text-[#8A6407]",
    glow: "bg-[#D9A62E]/30",
  },
  Male: {
    gradient: "from-brand-teal-500 to-brand-teal-700",
    ring: "ring-brand-teal-300",
    chip: "bg-brand-teal-50 text-brand-teal-700",
    glow: "bg-brand-teal-400/25",
  },
  Female: {
    gradient: "from-brand-orange-500 to-brand-orange-600",
    ring: "ring-brand-orange-300",
    chip: "bg-brand-orange-50 text-brand-orange-700",
    glow: "bg-brand-orange-400/25",
  },
};

const defaultStyle: TierStyle = {
  gradient: "from-brand-teal-600 to-brand-teal-800",
  ring: "ring-brand-teal-300",
  chip: "bg-brand-teal-50 text-brand-teal-700",
  glow: "bg-brand-teal-400/25",
};

export function getTierStyle(tier?: string): TierStyle {
  if (!tier) return defaultStyle;
  return tierStyles[tier] ?? defaultStyle;
}
