import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PackageCard } from "@/components/packages/PackageCard";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { buildMetadata } from "@/lib/seo";
import { getHealthPackages } from "@/lib/api-server";
import { fallbackHealthPackages } from "@/lib/fallback-content";

export const metadata: Metadata = buildMetadata({
  title: "Health Check Packages",
  description: "Preventive health checkup packages at Devaki Speciality Hospital — general wellness, cardiac, women's health, and more.",
  path: "/health-packages",
});

export default async function HealthPackagesPage() {
  const packages = await getHealthPackages("&sort=category");
  const list = packages.length ? packages : fallbackHealthPackages;

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          align="left"
          eyebrow="Preventive Care"
          title="Health check packages"
          description="Curated screening packages designed by our specialists — because early detection changes outcomes."
          className="mx-0"
        />
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((pkg, index) => (
            <RevealOnScroll as="li" key={pkg._id} delay={index * 0.05} className="list-none">
              <PackageCard pkg={pkg} />
            </RevealOnScroll>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
