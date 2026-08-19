import type { Metadata } from "next";
import { Plane, FileText, Languages, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "International Patients",
  description: "Treatment planning, visa assistance, and travel coordination for international patients at Devaki Speciality Hospital.",
  path: "/services/international-patients",
});

const services = [
  { icon: FileText, title: "Treatment Planning", description: "A dedicated coordinator prepares a cost estimate and treatment plan before you travel." },
  { icon: Plane, title: "Visa & Travel Support", description: "Assistance with medical visa invitation letters, airport pickup, and local accommodation." },
  { icon: Languages, title: "Interpreter Services", description: "On-request interpreters to ensure clear communication with your care team." },
  { icon: HeartHandshake, title: "Dedicated Case Manager", description: "One point of contact throughout your treatment journey, from arrival to follow-up." },
];

export default function InternationalPatientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Care"
        title="International patients"
        description="From your first enquiry to your journey home, our International Patients desk coordinates every detail of your care."
      />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <StaggerGroup className="grid gap-6 sm:grid-cols-2">
            {services.map(({ icon: Icon, title, description }, index) => (
              <RevealOnScroll as="li" key={title} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col gap-3 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700 dark:bg-brand-teal-900/40 dark:text-brand-teal-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="font-bold text-brand-teal-900 dark:text-white">{title}</h2>
                  <p className="text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{description}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
          <RevealOnScroll delay={0.1}>
            <EnquiryForm
              type="international"
              title="Request a treatment estimate"
              messagePlaceholder="Tell us about your condition, preferred treatment dates, and any questions you have"
              successMessage="Our International Patients desk will contact you within one business day with a treatment plan and cost estimate."
            />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
