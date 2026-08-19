import type { Metadata } from "next";
import { FileSearch, Users2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Second Opinion",
  description: "Get a specialist second opinion on your diagnosis or treatment plan from Devaki Speciality Hospital.",
  path: "/services/second-opinion",
});

const reasons = [
  { icon: FileSearch, title: "Confirm a Diagnosis", description: "Especially valuable before major surgery, cancer treatment, or a rare condition diagnosis." },
  { icon: Users2, title: "Explore Treatment Options", description: "Understand alternative approaches, including less invasive options you may not have discussed." },
  { icon: ShieldCheck, title: "Peace of Mind", description: "Move forward with confidence, knowing a second specialist has reviewed your case." },
];

export default function SecondOpinionPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Care"
        title="Second opinion service"
        description="Share your reports and diagnosis with our specialists for an independent, expert review."
      />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <StaggerGroup className="flex flex-col gap-6">
            {reasons.map(({ icon: Icon, title, description }, index) => (
              <RevealOnScroll as="li" key={title} delay={index * 0.06} className="list-none">
                <Card className="flex items-start gap-4 p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700 dark:bg-brand-teal-900/40 dark:text-brand-teal-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-bold text-brand-teal-900 dark:text-white">{title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{description}</p>
                  </div>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
          <RevealOnScroll delay={0.1}>
            <EnquiryForm
              type="second-opinion"
              title="Request a second opinion"
              messagePlaceholder="Describe your current diagnosis or condition, and mention if you have reports to share"
              successMessage="A specialist coordinator will reach out to arrange your second opinion consultation."
            />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
