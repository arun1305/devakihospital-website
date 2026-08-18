import type { Metadata } from "next";
import { Clock, Users, ShieldAlert, Baby } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Visitor Guidelines",
  description: "Visiting hours, ward etiquette, and safety guidelines for patients and visitors at Devaki Speciality Hospital.",
  path: "/patient-resources/visitor-guidelines",
});

const guidelines = [
  {
    icon: Clock,
    title: "Visiting Hours",
    description: "General wards: 4:00 PM – 6:00 PM daily. ICU: 15-minute slots at 11:00 AM and 5:00 PM, immediate family only.",
  },
  {
    icon: Users,
    title: "Number of Visitors",
    description: "A maximum of two visitors per patient at a time to maintain a calm recovery environment for all patients.",
  },
  {
    icon: Baby,
    title: "Children Under 12",
    description: "Discouraged in wards and ICU areas to reduce infection risk, unless specifically approved by the treating physician.",
  },
  {
    icon: ShieldAlert,
    title: "Infection Control",
    description: "Please use hand sanitiser stations before entering any ward, and follow mask guidance where posted.",
  },
];

export default function VisitorGuidelinesPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Resources"
        title="Visitor guidelines"
        description="A few simple guidelines that help us keep every patient's recovery environment calm, safe, and hygienic."
      />
      <section className="bg-white py-20">
        <Container>
          <StaggerGroup className="grid gap-6 sm:grid-cols-2">
            {guidelines.map(({ icon: Icon, title, description }, index) => (
              <RevealOnScroll as="li" key={title} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col gap-3 p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="font-bold text-brand-teal-900">{title}</h2>
                  <p className="text-sm leading-relaxed text-brand-grey-500">{description}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
