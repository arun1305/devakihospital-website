import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { buildMetadata } from "@/lib/seo";
import { getBlogs } from "@/lib/api-server";
import { fallbackBlogs } from "@/lib/fallback-content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Health Blog",
  description: "Practical, specialist-written health articles from the clinical team at Devaki Speciality Hospital.",
  path: "/blog",
});

export default async function BlogListPage() {
  const blogs = await getBlogs("&sort=-publishedAt&limit=50");
  const list = blogs.length ? blogs : fallbackBlogs;

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          align="left"
          eyebrow="Health Blog"
          title="Insights from our clinical team"
          description="Practical, evidence-based health guidance written by the specialists who practice it."
          className="mx-0"
        />
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((post, index) => {
            const categoryLabel = typeof post.category === "string" ? post.category : post.category.name;
            return (
              <RevealOnScroll as="li" key={post._id} delay={index * 0.05} className="list-none">
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col gap-4 p-7">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-brand-orange-600">
                      <span>{categoryLabel}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                    <h2 className="text-lg font-bold text-brand-teal-900">{post.title}</h2>
                    <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-brand-grey-500">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-brand-grey-400">
                      {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {post.readingTimeMinutes} min read
                      </span>
                    </div>
                  </Card>
                </Link>
              </RevealOnScroll>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
