import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DepartmentsPreview } from "@/components/sections/DepartmentsPreview";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";
import { buildMetadata } from "@/lib/seo";
import { getDepartments } from "@/lib/api-server";
import { fallbackDepartments } from "@/lib/fallback-content";

export const metadata: Metadata = buildMetadata({
  title: "Departments",
  description:
    "Explore Devaki Speciality Hospital's 31 clinical specialities — from Cardiology and Neurology to Oncology and Vascular Surgery.",
  path: "/departments",
});

export default async function DepartmentsPage() {
  const departments = await getDepartments("?status=published&sort=order");
  const list = departments.length ? departments : fallbackDepartments;

  return (
    <>
      <section className="bg-brand-teal-900 py-20 dark:bg-brand-teal-950">
        <Container>
          <SectionHeading
            tone="dark"
            align="left"
            eyebrow="Our Departments"
            title="31 specialities. One coordinated care team."
            description="Every department combines dedicated consultants, modern diagnostic technology, and a single shared patient record."
            className="mx-0"
          />
        </Container>
      </section>
      <DepartmentsPreview departments={list} />
      <AppointmentCTA />
    </>
  );
}
