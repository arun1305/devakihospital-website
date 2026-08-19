import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { buildMetadata } from "@/lib/seo";
import { getDepartments } from "@/lib/api-server";
import { fallbackDepartments } from "@/lib/fallback-content";
import { siteConfig } from "@/lib/site-config";
import { PhoneCall } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Book an Appointment",
  description: "Schedule a consultation with a Devaki Speciality Hospital specialist online in minutes.",
  path: "/appointment",
});

export default async function AppointmentPage() {
  const departments = await getDepartments("?status=published&sort=order");
  const list = departments.length ? departments : fallbackDepartments;

  return (
    <section className="relative isolate overflow-hidden bg-brand-grey-50 py-20 lg:py-28 dark:bg-brand-grey-900">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-teal-300/40 blur-3xl dark:bg-brand-teal-500/10" />
        <div className="absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-brand-orange-300/30 blur-3xl dark:bg-brand-orange-500/10" />
      </div>
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <SectionHeading
            align="left"
            eyebrow="Book Appointment"
            title="Schedule your visit"
            description="Tell us a little about what you need, and our care team will confirm your slot within a few hours."
            className="mx-0"
          />
          <a
            href={`tel:${siteConfig.emergencyNumber}`}
            className="inline-flex w-fit items-center gap-2 rounded-2xl bg-brand-orange-50 px-5 py-3 text-sm font-semibold text-brand-orange-700 dark:bg-brand-orange-900/40 dark:text-brand-orange-300"
          >
            <PhoneCall className="h-4 w-4" />
            Medical emergency? Call {siteConfig.emergencyNumber} now
          </a>
        </div>
        <AppointmentForm departments={list} />
      </Container>
    </section>
  );
}
