import type { Metadata } from "next";
import { ClipboardCheck, Siren } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admission Policy",
  description: "Elective and emergency admission policy at Devaki Speciality Hospital.",
  path: "/patient-resources/admission-policy",
});

const elective = [
  "The Admission Desk is on the ground floor of B Block. Admissions are accepted 24×7, irrespective of holidays, based on bed availability.",
  "All patients must make necessary financial arrangements (advance payment) prior to admission — a minimum of 50% of the estimate.",
  "Admissions from Monday to Saturday, 7:00 AM to 8:00 PM, are handled through the Admission Desk on the ground floor of B Block.",
  "Admissions from Monday to Saturday, 8:00 PM to 7:00 AM the next day, are handled at B Block.",
  "Admissions on Sundays and other holidays are also handled at B Block.",
  "Patients who need immediate care are given precedence over other patients.",
  "The Admission Room provides a cost estimate for procedures where the expected length of stay is known — subject to variation based on surgery duration, ICU days, and treatment changes.",
];

const emergency = [
  "The Emergency Department (ED) is on the ground floor of B Block.",
  "Emergency admissions are accepted 24×7 at the ED.",
  "Since admission through the ED is unplanned, allocation of a bed may take some time.",
  "Admitted patients are shifted to the room/ward accompanied by a ward attendant.",
  "Patients who need immediate care are given precedence over other patients.",
  "Our PRO provides a cost estimate where the expected length of stay is known — subject to variation.",
  "While admitted to the ICU, it is the bystander's responsibility to safeguard the patient's valuables.",
  "If no beds are available in any category, the patient is stabilised in our ED and referred to the nearest suitable hospital of their choice.",
];

export default function AdmissionPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Care Services"
        title="Admission policy"
        description="How elective and emergency admissions work at Devaki Speciality Hospital."
      />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="grid gap-10 lg:grid-cols-2">
          <RevealOnScroll>
            <Card className="flex h-full flex-col gap-4 p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700 dark:bg-brand-teal-800 dark:text-brand-teal-100">
                <ClipboardCheck className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-bold text-brand-teal-900 dark:text-white">Elective Admissions</h2>
              <ul className="flex flex-col gap-3 text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">
                {elective.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <Card className="flex h-full flex-col gap-4 p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange-50 text-brand-orange-600 dark:bg-brand-orange-900/40 dark:text-brand-orange-300">
                <Siren className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-bold text-brand-teal-900 dark:text-white">Admissions via Emergency</h2>
              <ul className="flex flex-col gap-3 text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">
                {emergency.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
