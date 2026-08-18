import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GraduationCap, Languages, Award, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, doctorJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { getDoctorBySlug, getDoctors, getDepartments } from "@/lib/api-server";
import { fallbackDoctors, fallbackDepartments } from "@/lib/fallback-content";
import type { Doctor } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function resolveDoctor(slug: string): Promise<Doctor | null> {
  const live = await getDoctorBySlug(slug);
  if (live) return live;
  return fallbackDoctors.find((d) => d.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const doctors = await getDoctors("?status=published&limit=200");
  const list = doctors.length ? doctors : fallbackDoctors;
  return list.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await resolveDoctor(slug);
  if (!doctor) return {};

  return buildMetadata({
    title: doctor.seo?.metaTitle ?? `${doctor.name} — ${doctor.designation}`,
    description: doctor.seo?.metaDescription ?? doctor.biography.slice(0, 155),
    path: `/doctors/${doctor.slug}`,
  });
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [doctor, departments] = await Promise.all([resolveDoctor(slug), getDepartments("?status=published")]);
  if (!doctor) notFound();

  const departmentList = departments.length ? departments : fallbackDepartments;
  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "/doctors" },
    { name: doctor.name, path: `/doctors/${doctor.slug}` },
  ];

  return (
    <>
      <JsonLd data={doctorJsonLd(doctor)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />

      <section className="bg-brand-teal-900 py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:items-center">
          <RevealOnScroll className="flex justify-center">
            <span className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-brand-teal-500 to-brand-orange-500 text-4xl font-bold text-white shadow-brand-soft">
              {doctor.name
                .replace("Dr.", "")
                .trim()
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{doctor.name}</h1>
            <p className="mt-2 text-lg text-brand-orange-300">{doctor.designation}</p>
            <p className="mt-4 text-white/75">{doctor.biography}</p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <RevealOnScroll className="flex flex-col gap-6">
            <Card className="flex flex-col gap-4 p-7">
              <h2 className="text-lg font-bold text-brand-teal-900">Qualifications & Expertise</h2>
              <ul className="flex flex-col gap-3 text-sm text-brand-grey-500">
                <li className="flex items-start gap-2">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-600" />
                  {doctor.qualifications.join(", ")}
                </li>
                <li className="flex items-start gap-2">
                  <Languages className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-600" />
                  Speaks {doctor.languages.join(", ")}
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-600" />
                  {doctor.experienceYears}+ years of clinical experience
                </li>
                {doctor.specializations.length > 0 && (
                  <li className="flex items-start gap-2">
                    <Award className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-600" />
                    {doctor.specializations.join(", ")}
                  </li>
                )}
              </ul>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="mb-4 text-lg font-bold text-brand-teal-900">Book a consultation with {doctor.name}</h2>
            <AppointmentForm departments={departmentList} />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
