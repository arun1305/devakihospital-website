import type { Metadata } from "next";
import { Video, Smartphone, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Telemedicine",
  description: "Video consultations with Devaki Speciality Hospital specialists from anywhere.",
  path: "/services/telemedicine",
});

const features = [
  { icon: Video, title: "Video Consultations", description: "Meet your specialist over a secure video call for follow-ups and non-emergency concerns." },
  { icon: Smartphone, title: "Any Device", description: "Join from your phone, tablet, or computer — no special app installation required." },
  { icon: FileText, title: "e-Prescriptions", description: "Receive prescriptions and follow-up instructions digitally right after your consultation." },
];

export default function TelemedicineServicePage() {
  return (
    <>
      <PageHero eyebrow="Patient Care" title="Telemedicine" description="Specialist consultations without the commute — ideal for follow-ups and second opinions." />
      <section className="bg-white py-20">
        <Container className="flex flex-col gap-12">
          <StaggerGroup className="grid gap-6 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, index) => (
              <RevealOnScroll as="li" key={title} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col gap-4 p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="font-bold text-brand-teal-900">{title}</h2>
                  <p className="text-sm leading-relaxed text-brand-grey-500">{description}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
          <RevealOnScroll className="flex justify-center">
            <Button href="/appointment" size="lg">Book a Video Consultation</Button>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
