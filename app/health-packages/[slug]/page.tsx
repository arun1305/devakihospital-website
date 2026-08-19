import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Users, Award, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PackageBookingForm } from "@/components/forms/PackageBookingForm";
import { AnimatedChecklist } from "@/components/packages/AnimatedChecklist";
import { TierSwitcher } from "@/components/packages/TierSwitcher";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHealthPackageBySlug, getHealthPackages } from "@/lib/api-server";
import { fallbackHealthPackages } from "@/lib/fallback-content";
import { formatCurrencyINR, groupPackagesByCategory } from "@/lib/utils";
import { getTierStyle } from "@/lib/package-tiers";
import { siteConfig } from "@/lib/site-config";
import type { HealthPackage } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function resolvePackage(slug: string): Promise<HealthPackage | null> {
  const live = await getHealthPackageBySlug(slug);
  if (live) return live;
  return fallbackHealthPackages.find((p) => p.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const packages = await getHealthPackages("&limit=200");
  const list = packages.length ? packages : fallbackHealthPackages;
  return list.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await resolvePackage(slug);
  if (!pkg) return {};
  return buildMetadata({
    title: pkg.name,
    description: pkg.description,
    path: `/health-packages/${pkg.slug}`,
  });
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [pkg, allPackages] = await Promise.all([resolvePackage(slug), getHealthPackages("&limit=200")]);
  if (!pkg) notFound();

  const fullList = allPackages.length ? allPackages : fallbackHealthPackages;
  const groups = groupPackagesByCategory(fullList);
  const siblings = groups.find((g) => g.category === pkg.category)?.packages ?? [pkg];
  const style = getTierStyle(pkg.tier);

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Health Packages", path: "/health-packages" },
    { name: pkg.name, path: `/health-packages/${pkg.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <section className={`relative overflow-hidden bg-gradient-to-br py-20 ${style.gradient}`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.15),transparent_45%)]" />
        <Container className="relative flex flex-col gap-6">
          <RevealOnScroll className="max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
              {pkg.tier && <Award className="h-3.5 w-3.5" />}
              {pkg.category}
            </span>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{pkg.name}</h1>
            {pkg.localName && <p className="mt-1 text-white/70">{pkg.localName}</p>}
            <p className="mt-4 text-white/85">{pkg.description}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <TierSwitcher siblings={siblings} activeSlug={pkg.slug} />
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealOnScroll className="flex flex-col gap-8">
            <div>
              <h2 className="mb-1 text-xl font-bold text-brand-teal-900">
                What&rsquo;s included <span className="text-sm font-normal text-brand-grey-400">({pkg.inclusions.length} tests &amp; services)</span>
              </h2>
              <AnimatedChecklist items={pkg.inclusions} className="mt-4" />
            </div>
            {pkg.idealFor.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-bold text-brand-teal-900">Ideal for</h2>
                <ul className="flex flex-col gap-2">
                  {pkg.idealFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brand-grey-500">
                      <Users className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-xs text-brand-grey-400">
              * Included where clinically indicated by age, gender, or your doctor&rsquo;s consultation. Any
              additional test recommended after your checkup is billed separately.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="flex flex-col gap-6">
            <div className="rounded-2xl bg-brand-grey-50 p-6 text-center">
              {pkg.discountedPrice ? (
                <div className="flex items-end justify-center gap-2">
                  <span className="text-3xl font-bold text-brand-teal-900">
                    {formatCurrencyINR(pkg.discountedPrice)}
                  </span>
                  <span className="text-lg text-brand-grey-400 line-through">{formatCurrencyINR(pkg.price)}</span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-brand-teal-900">{formatCurrencyINR(pkg.price)}</span>
              )}
              <p className="mt-1 text-xs text-brand-grey-500">Inclusive of consultation</p>
              <a
                href={`tel:${siteConfig.appointmentNumber}`}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-teal-700"
              >
                <PhoneCall className="h-3.5 w-3.5" /> Or call {siteConfig.appointmentNumber}
              </a>
            </div>
            <PackageBookingForm packageId={pkg._id} packageName={pkg.name} />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
