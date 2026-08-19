import { ShieldCheck, Award as AwardIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { InsurancePartner, Accreditation } from "@/types";

export function TrustBar({
  insurancePartners,
  accreditations,
}: {
  insurancePartners: InsurancePartner[];
  accreditations: Accreditation[];
}) {
  const items = [
    ...accreditations.map((a) => ({ id: a._id, name: a.name, icon: ShieldCheck })),
    ...insurancePartners.map((i) => ({ id: i._id, name: i.name, icon: AwardIcon })),
  ];

  if (!items.length) return null;

  const doubled = [...items, ...items];

  return (
    <section className="border-y border-brand-grey-200 bg-white py-10 dark:border-white/10 dark:bg-brand-teal-950">
      <Container className="mb-6 flex flex-col items-center gap-1 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-grey-400 dark:text-brand-grey-500">
          Accredited standards &amp; cashless insurance partners
        </p>
      </Container>
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-10">
          {doubled.map(({ id, name, icon: Icon }, index) => (
            <span
              key={`${id}-${index}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-grey-50 px-5 py-2.5 text-sm font-semibold text-brand-teal-800 dark:bg-brand-grey-900 dark:text-brand-teal-100"
            >
              <Icon className="h-4 w-4 text-brand-orange-500 dark:text-brand-orange-400" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
