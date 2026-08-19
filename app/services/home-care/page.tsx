import type { Metadata } from "next";
import { HeartPulse, Stethoscope, ClipboardCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Home Care Services",
  description: "Skilled nursing, physiotherapy, and post-treatment home care from Devaki Speciality Hospital.",
  path: "/services/home-care",
});

const features = [
  { icon: Stethoscope, title: "Skilled Nursing", description: "Wound care, injections, and vitals monitoring by qualified nurses at your home." },
  { icon: HeartPulse, title: "Post-Surgical Recovery", description: "Structured recovery support after discharge, coordinated with your treating doctor." },
  { icon: ClipboardCheck, title: "Physiotherapy at Home", description: "Rehabilitation sessions delivered by our physiotherapy team in your own space." },
];

export default function HomeCareServicePage() {
  return (
    <>
      <PageHero eyebrow="Patient Care" title="Home care services" description="Recovery doesn't have to mean staying in the hospital longer than necessary." />
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
            <Button href="/contact" size="lg">Request Home Care</Button>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
