import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Patient Guidelines",
  description: "Your rights and responsibilities as a patient at Devaki Speciality Hospital.",
  path: "/patient-resources/patient-rights",
});

const rights = [
  "Privacy — a female patient may be examined by a male doctor only in the presence of a female staff nurse or escort.",
  "Treatment Refusal — accept or refuse any procedure, drug, or treatment, and be informed of the consequences of refusal.",
  "Consent — receive enough information about a proposed treatment to make an informed decision about benefits, risks, and alternatives.",
  "Freedom from Abuse — be free from mental, physical, sexual, and verbal abuse, neglect, or exploitation.",
  "Confidentiality — your health information is protected and disclosed only with informed consent or as required by law.",
  "Complaints or Suggestions — raise concerns about hospitality, treatment, or medication through the suggestion box or patient representative.",
  "Cost of Treatment — understand and receive information on the cost of treatment provided.",
  "Respectful Treatment — considerate, dignified care with recognition of personal, cultural, and spiritual beliefs.",
  "Access to Medical Records — seek and receive all information necessary to understand your medical condition.",
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
        eyebrow="Patient Care Services"
        title="Patient guidelines"
        description="A shared understanding between you and our care team helps us deliver the safest, most respectful care possible."
      />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="grid gap-12 lg:grid-cols-2">
          <RevealOnScroll>
            <h2 className="mb-5 text-xl font-bold text-brand-teal-900 dark:text-white">Your Rights</h2>
            <ul className="flex flex-col gap-3">
              {rights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-600 dark:text-brand-teal-300" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="mb-5 text-xl font-bold text-brand-teal-900 dark:text-white">Your Responsibilities</h2>
            <ul className="flex flex-col gap-3">
              {responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange-500 dark:text-brand-orange-400" />
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
