import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Devaki Speciality Hospital collects, uses, and protects your personal and medical information.",
  path: "/patient-resources/privacy",
});

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly — such as name, contact details, and medical history during appointment booking or treatment — as well as limited technical data (like browser type) when you use this website.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to provide medical care, process appointments, communicate with you about your treatment, and improve our services. Medical records are used strictly within the bounds of clinical necessity and legal requirements.",
  },
  {
    title: "Sharing of Information",
    body: "We do not sell or rent patient data. Information may be shared with insurance providers or TPAs for claims processing (with your consent), or with regulatory authorities as legally required.",
  },
  {
    title: "Data Security",
    body: "Medical records and personal data are stored on access-controlled systems. Administrative access is role-based and logged, and all data transmission from this website is encrypted.",
  },
  {
    title: "Your Choices",
    body: "You may request access to, correction of, or deletion of your personal data (subject to medical record retention regulations) by contacting our patient care team.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Patient Resources" title="Privacy policy" description="Last updated: August 2026" />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex max-w-3xl flex-col gap-10">
          {sections.map((section, index) => (
            <RevealOnScroll key={section.title} delay={index * 0.05}>
              <h2 className="mb-2 text-lg font-bold text-brand-teal-900 dark:text-white">{section.title}</h2>
              <p className="leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{section.body}</p>
            </RevealOnScroll>
          ))}
          <RevealOnScroll delay={sections.length * 0.05}>
            <h2 className="mb-2 text-lg font-bold text-brand-teal-900 dark:text-white">Contact Us</h2>
            <p className="leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">
              For any privacy-related questions or requests, contact us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand-teal-700 dark:text-brand-teal-200">
                {siteConfig.email}
              </a>
              .
            </p>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
