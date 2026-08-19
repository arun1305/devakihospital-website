import type { Metadata } from "next";
import { Compass, Building2, Stethoscope, BedDouble, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Virtual Tour",
  description: "Take a virtual walkthrough of Devaki Speciality Hospital's facilities, wards, and departments.",
  path: "/gallery/virtual-tour",
});

const stops = [
  { icon: Building2, title: "Main Lobby & Reception", description: "Our welcoming entrance, registration desks, and patient waiting lounges." },
  { icon: Stethoscope, title: "Cath Lab & Operation Theatres", description: "State-of-the-art surgical and interventional suites." },
  { icon: BedDouble, title: "Patient Wards & ICU", description: "Private rooms, general wards, and critical care units designed for comfort and safety." },
];

export default function VirtualTourPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Virtual tour"
        description="Explore Devaki Speciality Hospital's facilities from wherever you are."
      />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-14">
          <RevealOnScroll className="relative flex aspect-video items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-teal-700 via-brand-teal-800 to-brand-teal-900">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(242,121,27,0.25),transparent_50%)]" />
            <div className="relative flex flex-col items-center gap-4 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                <PlayCircle className="h-9 w-9 text-white" />
              </span>
              <p className="font-semibold text-white">Our full video walkthrough is coming soon</p>
              <p className="max-w-sm text-sm text-white/70">
                In the meantime, browse our photo gallery or schedule an in-person visit — our patient care team
                is happy to show you around.
              </p>
            </div>
          </RevealOnScroll>

          <StaggerGroup className="grid gap-6 sm:grid-cols-3">
            {stops.map(({ icon: Icon, title, description }, index) => (
              <RevealOnScroll as="li" key={title} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col gap-3 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700 dark:bg-brand-teal-900 dark:text-brand-teal-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-bold text-brand-teal-900 dark:text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{description}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>

          <RevealOnScroll className="flex flex-col items-center gap-4 rounded-3xl bg-brand-grey-50 p-10 text-center dark:bg-brand-grey-900">
            <Compass className="h-8 w-8 text-brand-orange-500 dark:text-brand-orange-400" />
            <h2 className="text-lg font-bold text-brand-teal-900 dark:text-white">Prefer to see it in person?</h2>
            <p className="max-w-md text-sm text-brand-grey-500 dark:text-brand-grey-400">
              Schedule a guided tour of our facility ahead of a planned procedure or admission.
            </p>
            <Button href="/contact">Request a Tour</Button>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
