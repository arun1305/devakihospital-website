"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Microscope, Users2, Timer, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    icon: Microscope,
    title: "Precision Diagnostics",
    description:
      "Advanced imaging and lab technology give our specialists a clearer clinical picture, faster — so treatment starts sooner.",
  },
  {
    icon: Users2,
    title: "Multidisciplinary Teams",
    description:
      "Complex cases are reviewed by consultants across specialities, not a single opinion, before a treatment plan is finalised.",
  },
  {
    icon: HeartHandshake,
    title: "Patient-First Culture",
    description:
      "From transparent billing to dedicated care coordinators, every touchpoint is designed around patient dignity and clarity.",
  },
  {
    icon: Timer,
    title: "Round-the-Clock Emergency",
    description: "A fully staffed emergency department and rapid-response ambulance network, available every hour of the year.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-20 lg:py-28 dark:bg-brand-teal-950">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Why Devaki"
          title="Care built around outcomes, not just appointments"
          description="Every department is designed around one question: what gives this patient the best possible outcome, delivered with dignity?"
        />

        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, description }, index) => (
            <RevealOnScroll as="li" key={title} delay={index * 0.05} className="list-none">
              <Card className="group h-full p-7 dark:bg-brand-teal-900 dark:ring-1 dark:ring-white/10">
                <motion.span
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-700 text-white shadow-brand-soft"
                >
                  <Icon className="h-6 w-6" />
                </motion.span>
                <h3 className="mb-2 text-lg font-bold text-brand-teal-900 dark:text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{description}</p>
              </Card>
            </RevealOnScroll>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
