import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";
import { getBlogs } from "@/lib/api-server";
import { fallbackBlogs } from "@/lib/fallback-content";

export const metadata: Metadata = buildMetadata({
  title: "Health Library",
  description: "A library of specialist-written health articles and guides from Devaki Speciality Hospital.",
  path: "/patient-resources/health-library",
});

export default async function HealthLibraryPage() {
  const blogs = await getBlogs("&sort=-publishedAt&limit=50");
  const list = blogs.length ? blogs : fallbackBlogs;

  return (
    <>
      <PageHero
        eyebrow="Patient Resources"
        title="Health library"
        description="Clear, specialist-reviewed guidance on common conditions, prevention, and recovery — written for patients, not textbooks."
      />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container>
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((post, index) => {
              const categoryLabel = typeof post.category === "string" ? post.category : post.category.name;
              return (
                <RevealOnScroll as="li" key={post._id} delay={index * 0.05} className="list-none">
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <Card className="flex h-full flex-col gap-4 p-7">
                      <span className="w-fit rounded-full bg-brand-teal-50 px-3 py-1 text-xs font-semibold text-brand-teal-700 dark:bg-brand-teal-800 dark:text-brand-teal-100">
                        {categoryLabel}
                      </span>
                      <h2 className="text-lg font-bold text-brand-teal-900 dark:text-white">{post.title}</h2>
                      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-brand-grey-400 dark:text-brand-grey-500">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {post.readingTimeMinutes} min read
                        </span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </div>
                    </Card>
                  </Link>
                </RevealOnScroll>
              );
            })}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
