import type { Metadata } from "next";
import { PhoneCall, Siren, Clock, Ambulance } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Emergency & Ambulance Services",
  description: "24/7 emergency care and rapid-response ambulance services at Devaki Speciality Hospital.",
  path: "/services/emergency",
});

const features = [
  {
    icon: Clock,
    title: "24×7 Emergency Department",
    description: "Fully staffed round the clock with emergency physicians, trauma surgeons, and critical care specialists.",
  },
  {
    icon: Ambulance,
    title: "Rapid-Response Ambulances",
    description: "GPS-tracked, ICU-equipped ambulances dispatched within minutes across the city.",
  },
  {
    icon: Siren,
    title: "Trauma & Critical Care",
    description: "Dedicated resuscitation bays, trauma OT access, and a Level II critical care unit for the most urgent cases.",
  },
];

export default function EmergencyServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Care"
        title="Emergency & ambulance services"
        description="When every minute counts, our emergency team is ready — 24 hours a day, every day of the year."
      />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-14">
          <RevealOnScroll className="flex flex-col items-center gap-4 rounded-3xl bg-red-50 p-8 text-center dark:bg-red-950/40">
            <Siren className="h-8 w-8 text-red-600 dark:text-red-400" />
            <p className="text-lg font-bold text-red-700 dark:text-red-300">Medical Emergency? Call now.</p>
            <Button href={`tel:${siteConfig.emergencyNumber}`} variant="secondary" size="lg" icon={<PhoneCall className="h-5 w-5" />}>
              {siteConfig.emergencyNumber}
            </Button>
          </RevealOnScroll>

          <StaggerGroup className="grid gap-6 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, index) => (
              <RevealOnScroll as="li" key={title} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col gap-4 p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-700 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="font-bold text-brand-teal-900 dark:text-white">{title}</h2>
                  <p className="text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{description}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
