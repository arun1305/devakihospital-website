import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DoctorsDirectory } from "@/components/doctors/DoctorsDirectory";
import { buildMetadata } from "@/lib/seo";
import { getDoctors, getDepartments } from "@/lib/api-server";
import { fallbackDoctors, fallbackDepartments } from "@/lib/fallback-content";

export const metadata: Metadata = buildMetadata({
  title: "Find a Doctor",
  description: "Search Devaki Speciality Hospital's specialists by department, gender, experience, and language.",
  path: "/doctors",
});

export default async function DoctorsPage() {
  const [doctors, departments] = await Promise.all([
    getDoctors("?status=published&sort=name&limit=200"),
    getDepartments("?status=published&sort=order"),
  ]);
  const doctorList = doctors.length ? doctors : fallbackDoctors;
  const departmentList = departments.length ? departments : fallbackDepartments;

  return (
    <section className="bg-white py-20 lg:py-28 dark:bg-brand-teal-950">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          align="left"
          eyebrow="Our Specialists"
          title="Find the right doctor for you"
          description={`${doctorList.length}+ specialists across every major discipline, ready to see you.`}
          className="mx-0"
        />
        <DoctorsDirectory doctors={doctorList} departments={departmentList} />
      </Container>
    </section>
  );
}
