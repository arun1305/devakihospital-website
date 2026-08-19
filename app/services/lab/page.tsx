import type { Metadata } from "next";
import { FlaskConical, Clock, FileCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Laboratory Services",
  description: "NABL-accredited diagnostic laboratory services at Devaki Speciality Hospital, with fast digital reporting.",
  path: "/services/lab",
});

const features = [
  { icon: FlaskConical, title: "Comprehensive Testing", description: "Pathology, biochemistry, microbiology, and molecular diagnostics under one roof." },
  { icon: Clock, title: "Fast Turnaround", description: "Routine results within hours; critical results flagged and communicated immediately." },
  { icon: FileCheck, title: "Digital Reports", description: "Access your lab reports securely online as soon as they're ready." },
];

export default function LabServicePage() {
  return (
    <>
      <PageHero eyebrow="Patient Care" title="Laboratory services" description="Accurate, accredited diagnostics — because every treatment decision starts with the right data." />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-12">
          <StaggerGroup className="grid gap-6 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, index) => (
              <RevealOnScroll as="li" key={title} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col gap-4 p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700 dark:bg-brand-teal-900/40 dark:text-brand-teal-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="font-bold text-brand-teal-900 dark:text-white">{title}</h2>
                  <p className="text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{description}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
          <RevealOnScroll className="flex justify-center">
            <Button href="/appointment" size="lg">Book a Lab Test</Button>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
