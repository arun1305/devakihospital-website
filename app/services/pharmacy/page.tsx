import type { Metadata } from "next";
import { Pill, Clock3, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Pharmacy",
  description: "In-house pharmacy at Devaki Speciality Hospital, open 24/7 for inpatients and outpatients.",
  path: "/services/pharmacy",
});

const features = [
  { icon: Pill, title: "Full Formulary", description: "Prescription medication, specialty drugs, and OTC essentials stocked on-site." },
  { icon: Clock3, title: "Open 24/7", description: "Our main pharmacy operates round the clock for inpatients and emergency prescriptions." },
  { icon: Truck, title: "Home Delivery", description: "Discharge medication and refills can be delivered to your home on request." },
];

export default function PharmacyServicePage() {
  return (
    <>
      <PageHero eyebrow="Patient Care" title="Pharmacy" description={`Reach our pharmacy directly at ${siteConfig.appointmentNumber} for stock or prescription queries.`} />
      <section className="bg-white py-20">
        <Container>
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
        </Container>
      </section>
    </>
  );
}
