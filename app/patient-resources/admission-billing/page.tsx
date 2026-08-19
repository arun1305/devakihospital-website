import type { Metadata } from "next";
import { ClipboardList, LogOut, Receipt } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admission, Discharge & Billing",
  description: "What to expect during admission, discharge, and billing at Devaki Speciality Hospital.",
  path: "/patient-resources/admission-billing",
});

const sections = [
  {
    icon: ClipboardList,
    title: "Admission",
    points: [
      "Carry a valid photo ID, referral letter (if any), and insurance card.",
      "Our admission desk verifies details and estimates costs before allotting a bed.",
      "Planned admissions can be pre-registered online or by phone to save time.",
    ],
  },
  {
    icon: LogOut,
    title: "Discharge",
    points: [
      "Your treating doctor authorises discharge once clinically ready.",
      "Discharge summary, prescriptions, and follow-up instructions are provided before you leave.",
      "Billing is finalised in parallel to avoid delays — typically within 2-3 hours of discharge order.",
    ],
  },
  {
    icon: Receipt,
    title: "Billing",
    points: [
      "Itemised bills are available on request at any point during your stay.",
      "Cashless insurance patients settle only the non-covered portion, if any.",
      "We accept cash, card, UPI, and net banking for out-of-pocket payments.",
    ],
  },
];

export default function AdmissionBillingPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Resources"
        title="Admission, discharge & billing"
        description="A transparent, guided process from the moment you're admitted to the moment you head home."
      />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container>
          <StaggerGroup className="grid gap-6 lg:grid-cols-3">
            {sections.map(({ icon: Icon, title, points }, index) => (
              <RevealOnScroll as="li" key={title} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col gap-4 p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700 dark:bg-brand-teal-800 dark:text-brand-teal-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="font-bold text-brand-teal-900 dark:text-white">{title}</h2>
                  <ul className="flex flex-col gap-2 text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">
                    {points.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
