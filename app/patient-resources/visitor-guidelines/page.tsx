import type { Metadata } from "next";
import { Clock, Users, ShieldAlert, CameraOff, UtensilsCrossed, ParkingCircle, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Visitors & Care Takers Info",
  description: "Visiting hours, registration, and care taker guidelines at Devaki Speciality Hospital.",
  path: "/patient-resources/visitor-guidelines",
});

const visitorRules = [
  { icon: Clock, title: "Visiting Hours", description: "Between 4:00 PM and 6:00 PM for all rooms. In the ICU, only one person is allowed to see the patient at a time, to avoid infection risk." },
  { icon: Users, title: "Visitor's Pass", description: "Visitors are permitted entry to the ward only during visiting hours, and must carry their visitor's pass at entry." },
  { icon: CameraOff, title: "Not Permitted", description: "Flowers and cameras are not allowed inside the hospital." },
];

const careTakerRules = [
  "Only one caretaker is permitted to be with the patient.",
  "Entry into the ICU is restricted except during visiting hours.",
  "Caretakers should carry their visitor's pass on entry to the ward.",
  "Flowers and cameras are not allowed into the hospital.",
];

const facilities = [
  { icon: UtensilsCrossed, label: "Restaurants / Canteens" },
  { icon: ShieldAlert, label: "24-Hour Pharmacy" },
  { icon: Building2, label: "Accommodation" },
  { icon: ParkingCircle, label: "Parking (Two-Wheeler & Car)" },
];

export default function VisitorGuidelinesPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Care Services"
        title="Visitors & care takers info"
        description="A few simple guidelines that help us keep every patient's recovery environment calm, safe, and hygienic."
      />

      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-10">
          <RevealOnScroll className="rounded-2xl bg-brand-grey-50 p-6 text-sm leading-relaxed text-brand-grey-500 dark:bg-brand-grey-900 dark:text-brand-grey-400">
            <span className="font-semibold text-brand-teal-900 dark:text-white">New patients: </span>
            If you haven&rsquo;t registered at Devaki Speciality Hospital, you&rsquo;ll find a registration slip
            near the entrance in B Block, along with a token counter. When your token number is displayed,
            proceed to the respective reception counter. On submission of the form, you&rsquo;ll receive a card
            with a dedicated Medical Records (M.R.) number, used for patient identification — please don&rsquo;t
            lose this card. In an emergency, please go directly to the emergency counter.
          </RevealOnScroll>

          <StaggerGroup className="grid gap-6 sm:grid-cols-3">
            {visitorRules.map(({ icon: Icon, title, description }, index) => (
              <RevealOnScroll as="li" key={title} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col gap-3 p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700 dark:bg-brand-teal-800 dark:text-brand-teal-100">
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

      <section className="bg-brand-grey-50 py-20 dark:bg-brand-grey-900">
        <Container className="grid gap-12 lg:grid-cols-2">
          <RevealOnScroll>
            <h3 className="mb-4 text-lg font-bold text-brand-teal-900 dark:text-white">Information for Care Takers</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-brand-grey-500 dark:text-brand-grey-400">
              {careTakerRules.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange-400" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h3 className="mb-4 text-lg font-bold text-brand-teal-900 dark:text-white">Facilities for Visitors & Care Takers</h3>
            <div className="grid grid-cols-2 gap-3">
              {facilities.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 rounded-xl border border-brand-grey-200 bg-white p-4 dark:border-white/10 dark:bg-brand-teal-900">
                  <Icon className="h-4 w-4 shrink-0 text-brand-teal-600 dark:text-brand-teal-300" />
                  <span className="text-sm font-medium text-brand-teal-900 dark:text-white">{label}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
