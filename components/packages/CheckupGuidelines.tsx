import { Phone, Clock, Droplets, Shirt, FileText, Pill, AlertCircle, Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { siteConfig } from "@/lib/site-config";

const guidelines = [
  {
    icon: Phone,
    title: "Pre-register by phone",
    description: `Call our coordinator at ${siteConfig.appointmentNumber} to schedule your checkup and confirm fasting instructions.`,
  },
  {
    icon: Clock,
    title: "Fast for 10 hours",
    description: "Come on an empty stomach — please fast for at least 10 hours before your appointment.",
  },
  {
    icon: Droplets,
    title: "Arrive from 7:00 AM",
    description: "Walk in from 7:00 AM onwards on an empty stomach. Plain water is fine to drink.",
  },
  {
    icon: AlertCircle,
    title: "Flag existing conditions",
    description: "Let your coordinator know in advance if you are diabetic, pregnant, or a cardiac patient.",
  },
  {
    icon: Pill,
    title: "Hold regular medication",
    description: "If you take regular medication, check with your coordinator before taking it that morning.",
  },
  {
    icon: Shirt,
    title: "Wear comfortable clothing",
    description: "Avoid tight-fitting clothes — loose, comfortable clothing makes tests quicker and easier.",
  },
  {
    icon: FileText,
    title: "Bring your medical history",
    description: "Carry previous medical reports and prescriptions, and your registration number if you've visited before.",
  },
  {
    icon: Info,
    title: "Follow-up tests are separate",
    description: "Any additional test or consultation recommended after your checkup is not part of the package and is billed separately.",
  },
];

export function CheckupGuidelines() {
  return (
    <section className="bg-brand-grey-50 py-20 dark:bg-brand-teal-950 lg:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Before Your Visit"
          title="Checkup guidelines"
          description="A few simple steps that make your checkup faster, more accurate, and more comfortable."
        />
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {guidelines.map(({ icon: Icon, title, description }, index) => (
            <RevealOnScroll as="li" key={title} delay={index * 0.05} className="list-none">
              <Card className="flex h-full flex-col gap-3 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700 dark:bg-brand-teal-800 dark:text-brand-teal-100">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-bold text-brand-teal-900 dark:text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{description}</p>
              </Card>
            </RevealOnScroll>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
