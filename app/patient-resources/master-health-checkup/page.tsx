import type { Metadata } from "next";
import { CalendarCheck, ClipboardList, Stethoscope, Pill, Baby } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Master Health Check-Up",
  description: "Devaki Speciality Hospital's Master Health Checkup packages — same-day reports, explained in full by our doctors.",
  path: "/patient-resources/master-health-checkup",
});

const packages = [
  "Primary Health Check Up",
  "Preventive Health Check Up",
  "Diabetic Medical Health Check Up (DMHC)",
  "Cardiac Basic Health Check Up",
  "Executive Cardiac Master Health Check Up",
  "Whole Body Health Check Up",
  "Pre-Employment Health Check Up",
  "Cancer Screening Check Up",
  "Devaki Kidney Check Up",
];

const primaryChecklist = [
  "Physical Examination by Physician",
  "Complete Urine Analysis",
  "Stool Routine (ova, cyst, occult blood)",
  "Complete Blood Count",
  "FBS & PP Sugar",
  "Blood Urea & Serum Creatinine",
  "Blood Grouping & Rh Typing",
  "Lipid Profile",
  "ECG",
  "Ultrasound Scan (Abdomen)",
  "X-Ray Chest",
  "Pap Smear (for Women)",
  "General Physician Consultation",
  "Gynaecology Consultation for Women",
  "Dental Consultation",
  "Ophthalmology Consultation",
  "ENT Consultation",
  "Diet & Lifestyle Counselling",
];

const instructions = [
  { icon: CalendarCheck, text: "Walk in on any day from Monday to Saturday with an empty stomach, between 7:00 AM and 8:00 AM." },
  { icon: ClipboardList, text: "Please bring your recent medical records." },
  { icon: Pill, text: "Take your BP medicines and oral diabetes drugs as usual on the day of the checkup." },
  { icon: Stethoscope, text: "Please share complete and accurate information with your doctor." },
  { icon: ClipboardList, text: "After breakfast, you can continue your regular medicines." },
  { icon: ClipboardList, text: "Please bring a stool sample in a clean container. Take only water on the morning of the checkup." },
  { icon: Baby, text: "Pregnant women should inform their doctor about the pregnancy to avoid X-rays." },
];

export default function MasterHealthCheckupPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Care Services"
        title="Master Health Check-Up"
        description="All medical reports are given on the same day, with a complete explanation from our doctors."
      />

      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-8">
          <RevealOnScroll className="mx-auto max-w-3xl text-center">
            <p className="leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">
              Our Master Health Checkup packages are structured to screen your health through consultation by
              chief doctors and clinical tests that help you lead a healthier life — giving you an up-to-date
              picture of your body and fitness level. Devaki Speciality Hospital offers affordable checkup
              packages tailored to different age groups, carried out by a dedicated team in a well-equipped
              environment. Periodic health checkups help catch problems early, before they become serious.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mx-auto">
            <Button href="/appointment" size="lg" icon={<CalendarCheck className="h-5 w-5" />}>
              Book a Health Check-Up
            </Button>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-brand-grey-50 py-20 dark:bg-brand-grey-900">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Packages" title="Choose the checkup that fits your needs" />
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg, index) => (
              <RevealOnScroll as="li" key={pkg} delay={index * 0.04} className="list-none">
                <Card className="flex h-full items-center gap-3 p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700 dark:bg-brand-teal-800 dark:text-brand-teal-100">
                    <Stethoscope className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold text-brand-teal-900 dark:text-white">{pkg}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="What's Included" title="Primary Health Check Up covers" />
          <div className="flex flex-wrap gap-2">
            {primaryChecklist.map((item) => (
              <span
                key={item}
                className="rounded-full border border-brand-grey-200 px-4 py-1.5 text-xs font-medium text-brand-teal-700 dark:border-white/10 dark:text-brand-teal-200"
              >
                {item}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-grey-50 py-20 dark:bg-brand-grey-900">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Before You Arrive" title="Instructions for your checkup" />
          <StaggerGroup className="grid gap-4 sm:grid-cols-2">
            {instructions.map(({ icon: Icon, text }, index) => (
              <RevealOnScroll as="li" key={text} delay={index * 0.05} className="flex list-none items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-orange-50 text-brand-orange-600 dark:bg-brand-orange-900/40 dark:text-brand-orange-300">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-sm leading-relaxed text-brand-grey-600 dark:text-brand-grey-400">{text}</p>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
