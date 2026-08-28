import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "24×7 Services",
  description: "The round-the-clock clinical, diagnostic, and critical care services available at Devaki Speciality Hospital.",
  path: "/patient-resources/24-7-services",
});

const services = [
  { label: "Emergency Casualty", icon: "emergencycall" },
  { label: "Pharmacy", icon: "pharmacy" },
  { label: "Ambulance with Mobile ICU & Ventilator", icon: "ambulance" },
  { label: "Advanced Computerised Laboratory", icon: "lab" },
  { label: "MRI Scan (1.5 Tesla)", icon: "mri" },
  { label: "CT Scan (256-Slice & 64-Slice)", icon: "tomo" },
  { label: "Digital X-Ray", icon: "xray" },
  { label: "ECG", icon: "ecg" },
  { label: "Digital C-Arm", icon: "c-arm" },
  { label: "Digital Mobile X-Ray", icon: "mobilexray" },
  { label: "Blood Bank", icon: "bloodbank" },
  { label: "Cath Lab", icon: "cathlab" },
  { label: "Emergency & Trauma Care", icon: "trauma" },
  { label: "Dialysis Unit", icon: "dialysi" },
  { label: "Modular Operation Theatre", icon: "endoscopy" },
  { label: "Intensive Care Unit (ICU)", icon: "icu1" },
  { label: "General Intensive Care Unit (GICU)", icon: "icu" },
  { label: "Cardiothoracic ICU (CTICU)", icon: "cardiothoracic" },
  { label: "Medical Intensive Care Unit (MICU)", icon: "micu" },
  { label: "Surgical Intensive Care Unit (SICU)", icon: "surgery" },
  { label: "Coronary Care Unit (CCU)", icon: "cicu" },
];

export default function TwentyFourSevenServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Care Services"
        title="24×7 services"
        description="From emergency casualty to critical care units, these services run around the clock, every day of the year."
      />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container>
          <StaggerGroup className="grid gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {services.map((service, index) => (
              <RevealOnScroll as="li" key={service.label} delay={index * 0.03} className="list-none">
                <Card className="flex h-full flex-col items-center gap-3 p-6 text-center transition-transform duration-300 hover:-translate-y-1">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal-50 p-2.5 dark:bg-white">
                    <Image
                      src={`/patient-care/services/${service.icon}.png`}
                      alt={service.label}
                      width={100}
                      height={100}
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <p className="text-sm font-semibold text-brand-teal-900 dark:text-white">{service.label}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
