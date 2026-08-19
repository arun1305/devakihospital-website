import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

const homeFaqs = [
  {
    question: "How do I book an appointment at Devaki Speciality Hospital?",
    answer:
      "You can book online through our Appointment page, call our appointment desk, or walk in — emergency cases are always seen immediately regardless of appointment status.",
  },
  {
    question: "Do you accept cashless insurance?",
    answer:
      "Yes, we are empanelled with major insurers and TPAs for cashless treatment. Visit our Insurance & TPA page for the full list of partners.",
  },
  {
    question: "Is emergency care available 24/7?",
    answer: "Our Emergency department and trauma team operate 24 hours a day, 7 days a week, including all public holidays.",
  },
  {
    question: "Can international patients get treatment here?",
    answer:
      "Yes — our International Patients desk assists with treatment planning, visa documentation, travel coordination, and interpreter support.",
  },
];

export function FaqSection() {
  return (
    <section className="bg-brand-grey-50 py-20 lg:py-28 dark:bg-brand-grey-900">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          align="left"
          eyebrow="Have Questions?"
          title="Frequently asked questions"
          description="Can't find what you're looking for? Reach out to our patient care team any time."
          className="mx-0 lg:sticky lg:top-28"
        />
        <Accordion items={homeFaqs} />
      </Container>
    </section>
  );
}
