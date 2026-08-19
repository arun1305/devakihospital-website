import { HeartPulse, Brain, Bone, UtensilsCrossed, Radiation, Baby, Stethoscope, type LucideIcon } from "lucide-react";

const departmentIconMap: Record<string, LucideIcon> = {
  cardiology: HeartPulse,
  neurology: Brain,
  orthopaedics: Bone,
  gastroenterology: UtensilsCrossed,
  oncology: Radiation,
  pediatrics: Baby,
};

export function getDepartmentIcon(slug: string): LucideIcon {
  return departmentIconMap[slug] ?? Stethoscope;
}
