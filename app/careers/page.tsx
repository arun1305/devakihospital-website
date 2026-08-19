import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { buildMetadata } from "@/lib/seo";
import { getJobListings } from "@/lib/api-server";
import { fallbackJobListings } from "@/lib/fallback-content";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description: "Explore open roles at Devaki Speciality Hospital and join a team dedicated to compassionate, advanced healthcare.",
  path: "/careers",
});

export default async function CareersPage() {
  const jobs = await getJobListings("&limit=50");
  const list = jobs.length ? jobs : fallbackJobListings;

  return (
    <section className="bg-white py-20 lg:py-28 dark:bg-brand-teal-950">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          align="left"
          eyebrow="Careers"
          title="Build your career with us"
          description="We're always looking for skilled, compassionate people to join our clinical and support teams."
          className="mx-0"
        />
        <StaggerGroup className="grid gap-5">
          {list.map((job, index) => (
            <RevealOnScroll as="li" key={job._id} delay={index * 0.04} className="list-none">
              <Link href={`/careers/${job.slug}`} className="group block">
                <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-brand-teal-900 dark:text-white">{job.title}</h2>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-brand-grey-500 dark:text-brand-grey-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" /> {job.department} · {job.employmentType}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" /> {job.location}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal-700 transition-transform duration-300 group-hover:translate-x-1 dark:text-brand-teal-200">
                    View & Apply <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Card>
              </Link>
            </RevealOnScroll>
          ))}
          {list.length === 0 && (
            <p className="text-sm text-brand-grey-400 dark:text-brand-grey-400">No open roles right now — check back soon.</p>
          )}
        </StaggerGroup>
      </Container>
    </section>
  );
}
