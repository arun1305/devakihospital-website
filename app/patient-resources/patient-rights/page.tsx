import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Patient Rights & Responsibilities",
  description: "Understand your rights and responsibilities as a patient at Devaki Speciality Hospital.",
  path: "/patient-resources/patient-rights",
});

const rights = [
  "Receive care with dignity, respect, and without discrimination.",
  "Be informed about your diagnosis, treatment options, and associated costs in language you understand.",
  "Give or withhold informed consent for any procedure or treatment.",
  "Access your medical records and request a second opinion at any time.",
  "Confidentiality of your medical information, disclosed only with your consent or as legally required.",
  "Voice concerns or complaints without fear of it affecting the quality of your care.",
];

const responsibilities = [
  "Provide accurate and complete information about your health history.",
  "Ask questions when instructions or information aren't clear.",
  "Follow the treatment plan you've agreed to, or discuss concerns with your care team.",
  "Treat hospital staff, other patients, and visitors with courtesy and respect.",
  "Settle billing matters in a timely manner, and raise disputes through proper channels.",
];

export default function PatientRightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Resources"
        title="Patient rights & responsibilities"
        description="A shared understanding between you and our care team helps us deliver the safest, most respectful care possible."
      />
      <section className="bg-white py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <RevealOnScroll>
            <h2 className="mb-5 text-xl font-bold text-brand-teal-900">Your Rights</h2>
            <ul className="flex flex-col gap-3">
              {rights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-brand-grey-500">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-600" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="mb-5 text-xl font-bold text-brand-teal-900">Your Responsibilities</h2>
            <ul className="flex flex-col gap-3">
              {responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-brand-grey-500">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange-500" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
