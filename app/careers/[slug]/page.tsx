import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Briefcase, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { JobApplicationForm } from "@/components/forms/JobApplicationForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getJobBySlug, getJobListings } from "@/lib/api-server";
import { fallbackJobListings } from "@/lib/fallback-content";
import type { JobListing } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function resolveJob(slug: string): Promise<JobListing | null> {
  const live = await getJobBySlug(slug);
  if (live) return live;
  return fallbackJobListings.find((j) => j.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const jobs = await getJobListings("&limit=100");
  const list = jobs.length ? jobs : fallbackJobListings;
  return list.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await resolveJob(slug);
  if (!job) return {};
  return buildMetadata({
    title: job.title,
    description: job.description.slice(0, 155),
    path: `/careers/${job.slug}`,
  });
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await resolveJob(slug);
  if (!job) notFound();

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Careers", path: "/careers" },
    { name: job.title, path: `/careers/${job.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <section className="bg-brand-teal-900 py-20">
        <Container>
          <RevealOnScroll className="max-w-3xl">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{job.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" /> {job.department} · {job.employmentType}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {job.location}
              </span>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealOnScroll className="flex flex-col gap-8">
            <div>
              <h2 className="mb-3 text-xl font-bold text-brand-teal-900">About this role</h2>
              <p className="whitespace-pre-line leading-relaxed text-brand-grey-600">{job.description}</p>
            </div>
            {job.requirements.length > 0 && (
              <div>
                <h2 className="mb-3 text-xl font-bold text-brand-teal-900">Requirements</h2>
                <ul className="flex flex-col gap-2">
                  {job.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2 text-sm text-brand-grey-500">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-600" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <JobApplicationForm jobId={job._id} jobTitle={job.title} />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
