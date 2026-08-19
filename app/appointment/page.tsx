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
    <section className="bg-brand-grey-50 py-20 lg:py-28 dark:bg-brand-grey-900">
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
