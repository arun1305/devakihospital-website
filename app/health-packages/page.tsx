import type { Metadata } from "next";
import { ShieldCheck, Stethoscope, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PackageCategorySection } from "@/components/packages/PackageCategorySection";
import { PackageCategoryNav } from "@/components/packages/PackageCategoryNav";
import { CheckupGuidelines } from "@/components/packages/CheckupGuidelines";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";
import { buildMetadata } from "@/lib/seo";
import { getHealthPackages } from "@/lib/api-server";
import { fallbackHealthPackages } from "@/lib/fallback-content";
import { groupPackagesByCategory } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Health Check Packages",
  description:
    "Master health checkup packages at Devaki Speciality Hospital — Basic, Whole Body, Diabetic, Women's Wellness, Senior Citizen, and more, with Bronze/Silver/Gold tiers and detailed test lists.",
  path: "/health-packages",
});

const trustPoints = [
  { icon: ShieldCheck, label: "NABH Accredited Lab" },
  { icon: Sparkles, label: "25 Years of Trusted Care" },
  { icon: Stethoscope, label: "Doctor-Reviewed Results" },
];

export default async function HealthPackagesPage() {
  const packages = await getHealthPackages(`&sort=${encodeURIComponent("categoryOrder tierOrder")}&limit=200`);
  const list = packages.length ? packages : fallbackHealthPackages;
  const groups = groupPackagesByCategory(list);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-teal-900 py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-teal-900 via-brand-teal-800 to-brand-teal-700" />
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand-orange-500/20 blur-3xl animate-blob" />
          <div className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-brand-teal-400/20 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
        </div>
        <Container className="flex flex-col gap-6">
          <RevealOnScroll className="max-w-2xl">
            <span className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              Master Health Checkup
            </span>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              &ldquo;Simple Checkup, Healthy Life&rdquo;
            </h1>
            <p className="mt-4 text-lg text-white/75">
              {groups.length} curated screening categories with Bronze, Silver, and Gold tiers — pick the
              depth of screening that fits your age, history, and goals.
            </p>
          </RevealOnScroll>
          <StaggerGroup className="flex flex-wrap gap-4">
            {trustPoints.map(({ icon: Icon, label }, index) => (
              <RevealOnScroll as="li" key={label} delay={index * 0.06} className="list-none">
                <div className="glass-panel-dark flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-semibold text-white">
                  <Icon className="h-5 w-5 text-brand-orange-300" />
                  {label}
                </div>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <Container className="flex flex-col gap-16">
          <PackageCategoryNav categories={groups.map((g) => g.category)} />
          <div className="flex flex-col gap-20">
            {groups.map((group) => (
              <PackageCategorySection key={group.category} group={group} />
            ))}
          </div>
        </Container>
      </section>

      <CheckupGuidelines />

      <section className="bg-white py-10">
        <Container>
          <RevealOnScroll className="text-center text-xs text-brand-grey-400">
            * Included where clinically indicated by age, gender, or your consultation with the doctor. Speak
            to our coordinator at {siteConfig.appointmentNumber} for details on any package.
          </RevealOnScroll>
        </Container>
      </section>

      <AppointmentCTA />
    </>
  );
}
