import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { QuickAccess } from "@/components/sections/QuickAccess";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { HighlightsCounter } from "@/components/sections/HighlightsCounter";
import { DepartmentsPreview } from "@/components/sections/DepartmentsPreview";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { TrustBar } from "@/components/sections/TrustBar";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { FaqSection } from "@/components/sections/FaqSection";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";
import { buildMetadata } from "@/lib/seo";
import {
  getDepartments,
  getFeaturedTestimonials,
  getLatestBlogs,
  getLatestNews,
  getInsurancePartners,
  getAccreditations,
} from "@/lib/api-server";
import {
  fallbackDepartments,
  fallbackTestimonials,
  fallbackInsurancePartners,
  fallbackAccreditations,
} from "@/lib/fallback-content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

export default async function HomePage() {
  const [departments, testimonials, blogs, news, insurancePartners, accreditations] =
    await Promise.all([
      getDepartments("?status=published&sort=order&limit=100"),
      getFeaturedTestimonials(),
      getLatestBlogs(3),
      getLatestNews(3),
      getInsurancePartners(),
      getAccreditations(),
    ]);

  return (
    <>
      <Hero />
      <QuickAccess />
      <WhyChooseUs />
      <HighlightsCounter />
      <DepartmentsPreview departments={departments.length ? departments : fallbackDepartments} />
      <TestimonialsCarousel testimonials={testimonials.length ? testimonials : fallbackTestimonials} />
      <TrustBar
        insurancePartners={insurancePartners.length ? insurancePartners : fallbackInsurancePartners}
        accreditations={accreditations.length ? accreditations : fallbackAccreditations}
      />
      <InsightsPreview blogs={blogs} news={news} />
      <FaqSection />
      <AppointmentCTA />
    </>
  );
}
