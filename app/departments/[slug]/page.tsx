import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Cpu, Building2, Stethoscope, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DepartmentMockup } from "@/components/ui/DepartmentMockup";
import { Accordion } from "@/components/ui/Accordion";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, departmentJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { getDepartmentBySlug, getDepartments } from "@/lib/api-server";
import { fallbackDepartments } from "@/lib/fallback-content";
import { getDepartmentIcon } from "@/lib/department-icons";
import type { Department } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function resolveDepartment(slug: string): Promise<Department | null> {
  const live = await getDepartmentBySlug(slug);
  if (live) return live;
  return fallbackDepartments.find((d) => d.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const departments = await getDepartments("?status=published&limit=100");
  const list = departments.length ? departments : fallbackDepartments;
  return list.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const department = await resolveDepartment(slug);
  if (!department) return {};

  return buildMetadata({
    title: department.seo?.metaTitle ?? `${department.name} Department`,
    description: department.seo?.metaDescription ?? department.shortDescription,
    path: `/departments/${department.slug}`,
    keywords: department.seo?.keywords,
  });
}

const infoBlocks = [
  { key: "treatments" as const, title: "Treatments & Procedures", icon: Stethoscope },
  { key: "facilities" as const, title: "Facilities", icon: Building2 },
  { key: "technology" as const, title: "Technology", icon: Cpu },
];

export default async function DepartmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const department = await resolveDepartment(slug);
  if (!department) notFound();

  const DeptIcon = getDepartmentIcon(department.slug);

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Departments", path: "/departments" },
    { name: department.name, path: `/departments/${department.slug}` },
  ];

  return (
    <>
      <JsonLd data={departmentJsonLd(department)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      {department.faqs.length > 0 && <JsonLd data={faqJsonLd(department.faqs)} />}

      <section className="relative overflow-hidden bg-brand-teal-900 py-20 dark:bg-brand-teal-950">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(242,121,27,0.2),transparent_45%)]" />
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-orange-500/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-brand-teal-400/20 blur-3xl" />
        </div>
        <Container className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col gap-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/60">
              {breadcrumb.map((crumb, index) => (
                <span key={crumb.path} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  {index === breadcrumb.length - 1 ? (
                    <span className="text-white">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path} className="hover:text-white">
                      {crumb.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
            <RevealOnScroll>
              <h1 className="text-4xl font-bold text-white sm:text-5xl">{department.name}</h1>
              <p className="mt-4 max-w-xl text-lg text-white/75">{department.shortDescription}</p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <Button href="/appointment" variant="secondary" size="lg">
                Book a {department.name} Consultation
              </Button>
            </RevealOnScroll>
          </div>
          <RevealOnScroll direction="left" delay={0.15}>
            <DepartmentMockup>
              <DeptIcon className="h-20 w-20 text-white" strokeWidth={1.5} />
            </DepartmentMockup>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealOnScroll className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-brand-teal-900 dark:text-white">Overview</h2>
            <p className="leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{department.overview}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <Card className="flex flex-col gap-4 p-7">
              <h3 className="text-lg font-bold text-brand-teal-900 dark:text-white">Why choose our {department.name} team</h3>
              <ul className="flex flex-col gap-3 text-sm text-brand-grey-500 dark:text-brand-grey-400">
                {["Board-certified specialists", "24/7 clinical support", "Shared patient records across departments", "Structured recovery & follow-up plans"].map(
                  (point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-600 dark:text-brand-teal-300" />
                      {point}
                    </li>
                  )
                )}
              </ul>
            </Card>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-brand-grey-50 py-20 dark:bg-brand-grey-900">
        <Container className="flex flex-col gap-10">
          <StaggerGroup className="grid gap-6 lg:grid-cols-3">
            {infoBlocks.map(({ key, title, icon: Icon }, index) => {
              const list = department[key];
              if (!list.length) return null;
              return (
                <RevealOnScroll as="li" key={key} delay={index * 0.06} className="list-none">
                  <Card className="flex h-full flex-col gap-4 p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-700 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-bold text-brand-teal-900 dark:text-white">{title}</h3>
                    <ul className="flex flex-col gap-2 text-sm text-brand-grey-500 dark:text-brand-grey-400">
                      {list.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange-500 dark:text-brand-orange-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </RevealOnScroll>
              );
            })}
          </StaggerGroup>
        </Container>
      </section>

      {department.faqs.length > 0 && (
        <section className="bg-brand-grey-50 py-20 dark:bg-brand-grey-900">
          <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              align="left"
              eyebrow="FAQs"
              title={`Common questions about ${department.name}`}
              className="mx-0 lg:sticky lg:top-28"
            />
            <Accordion items={department.faqs} />
          </Container>
        </section>
      )}

      <AppointmentCTA />
    </>
  );
}
