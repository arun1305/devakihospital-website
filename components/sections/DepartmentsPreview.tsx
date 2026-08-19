import Link from "next/link";
import { ArrowUpRight, Activity } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { Department } from "@/types";

export function DepartmentsPreview({ departments }: { departments: Department[] }) {
  if (!departments.length) return null;

  return (
    <section className="bg-white py-20 lg:py-28 dark:bg-brand-teal-950">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Centres of Excellence"
          title="Specialised departments, unified care"
          description="Sixteen clinical departments working from one shared patient record, so nothing gets lost between specialists."
        />

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department, index) => (
            <RevealOnScroll as="li" key={department._id} delay={index * 0.05} className="list-none">
              <Link
                href={`/departments/${department.slug}`}
                className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-brand-grey-200 bg-brand-grey-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-teal-300 hover:shadow-brand-soft dark:border-white/10 dark:bg-brand-grey-900 dark:hover:border-brand-teal-600"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-orange-100 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-70 dark:bg-brand-orange-900/40" />
                <div className="relative flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-700 text-white">
                    <Activity className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-brand-grey-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-orange-500 dark:text-brand-grey-400" />
                </div>
                <div className="relative">
                  <h3 className="text-xl font-bold text-brand-teal-900 dark:text-white">{department.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{department.shortDescription}</p>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
