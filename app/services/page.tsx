import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";
import { servicesDirectory } from "@/lib/services-directory";

export const metadata: Metadata = buildMetadata({
  title: "Patient Services",
  description: "Emergency care, lab, pharmacy, home care, telemedicine, and patient support services at Devaki Speciality Hospital.",
  path: "/services",
});

export default function ServicesHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Care"
        title="Services designed around your care journey"
        description="From emergency response to at-home recovery support, every service is coordinated by one care team."
      />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container>
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesDirectory.map((service, index) => (
              <RevealOnScroll as="li" key={service.slug} delay={index * 0.05} className="list-none">
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col gap-3 p-7">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-brand-teal-900 dark:text-white">{service.title}</h2>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-brand-grey-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-orange-500 dark:group-hover:text-brand-orange-300" />
                    </div>
                    <p className="text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{service.description}</p>
                  </Card>
                </Link>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
