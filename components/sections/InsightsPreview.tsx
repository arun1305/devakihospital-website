import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { formatDate } from "@/lib/utils";
import type { BlogPost, NewsPost } from "@/types";

interface InsightItem {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  date?: string;
  kind: "Blog" | "News";
  readingTimeMinutes?: number;
}

export function InsightsPreview({ blogs, news }: { blogs: BlogPost[]; news: NewsPost[] }) {
  const items: InsightItem[] = [
    ...blogs.map((post) => ({
      id: post._id,
      title: post.title,
      excerpt: post.excerpt,
      href: `/blog/${post.slug}`,
      date: post.publishedAt ?? post.createdAt,
      kind: "Blog" as const,
      readingTimeMinutes: post.readingTimeMinutes,
    })),
    ...news.map((post) => ({
      id: post._id,
      title: post.title,
      excerpt: post.summary,
      href: `/news/${post.slug}`,
      date: post.publishedAt ?? post.createdAt,
      kind: "News" as const,
    })),
  ].slice(0, 3);

  if (!items.length) return null;

  return (
    <section className="bg-white py-20 lg:py-28 dark:bg-brand-teal-950">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Health Insights"
            title="Latest from our clinical team"
            className="mx-0"
          />
          <Link href="/blog" className="text-sm font-semibold text-brand-teal-700 hover:text-brand-orange-600 dark:text-brand-teal-200 dark:hover:text-brand-orange-400">
            View all articles →
          </Link>
        </div>

        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <RevealOnScroll as="li" key={item.id} delay={index * 0.06} className="list-none">
              <Link href={item.href} className="group block h-full">
                <Card className="flex h-full flex-col gap-4 p-7 dark:bg-brand-teal-900 dark:ring-1 dark:ring-white/10">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-brand-orange-600 dark:text-brand-orange-300">
                    <span>{item.kind}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-teal-900 dark:text-white">{item.title}</h3>
                  <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{item.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-brand-grey-400 dark:text-brand-grey-500">
                    {item.date && <span>{formatDate(item.date)}</span>}
                    {item.readingTimeMinutes && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {item.readingTimeMinutes} min read
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            </RevealOnScroll>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
