import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description: "Answers to common questions about appointments, insurance, visiting hours, and billing at Devaki Speciality Hospital.",
  path: "/faq",
});

const categories = [
  {
    title: "Appointments",
    faqs: [
      {
        question: "How do I book an appointment?",
        answer:
          "Book online through our Appointment page, call our appointment desk, or walk in. Emergency cases are always seen immediately.",
      },
      {
        question: "Can I choose a specific doctor?",
        answer: "Yes — let us know your preference when booking an appointment or contact our care team directly.",
      },
      {
        question: "What if I need to reschedule?",
        answer: "Call our appointment desk at least a few hours in advance and we'll help you find a new slot.",
      },
    ],
  },
  {
    title: "Insurance & Billing",
    faqs: [
      {
        question: "Do you accept cashless insurance?",
        answer: "Yes, we're empanelled with major insurers and TPAs. See our Insurance & TPA page for the full list.",
      },
      {
        question: "Can I get an itemised bill?",
        answer: "Yes, itemised bills are available on request at any point during your stay or after discharge.",
      },
    ],
  },
  {
    title: "Visiting & Admission",
    faqs: [
      {
        question: "What are the visiting hours?",
        answer: "General wards: 4:00 PM – 6:00 PM daily. ICU visiting is limited to short, scheduled slots for immediate family.",
      },
      {
        question: "What should I bring for admission?",
        answer: "A valid photo ID, referral letter (if any), and your insurance card if applicable.",
      },
    ],
  },
  {
    title: "Emergency & Urgent Care",
    faqs: [
      {
        question: "Is emergency care available 24/7?",
        answer: "Yes, our Emergency department and trauma team operate 24 hours a day, every day of the year.",
      },
      {
        question: "Do you offer ambulance services?",
        answer: "Yes, we operate a rapid-response ambulance network — call our emergency number for dispatch.",
      },
    ],
  },
];

export default function FaqPage() {
  const allFaqs = categories.flatMap((c) => c.faqs);

  return (
    <>
      <JsonLd data={faqJsonLd(allFaqs)} />
      <PageHero eyebrow="Support" title="Frequently asked questions" description="Browse by category, or contact our patient care team for anything else." />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex max-w-3xl flex-col gap-14">
          {categories.map((category) => (
            <div key={category.title} className="flex flex-col gap-5">
              <h2 className="text-xl font-bold text-brand-teal-900 dark:text-white">{category.title}</h2>
              <Accordion items={category.faqs} />
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
