import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { RichContent } from "@/components/content/RichContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { getNewsBySlug, getNewsList } from "@/lib/api-server";
import { fallbackNews } from "@/lib/fallback-content";
import { formatDate } from "@/lib/utils";
import type { NewsPost } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function resolveNews(slug: string): Promise<NewsPost | null> {
  const live = await getNewsBySlug(slug);
  if (live) return live;
  return fallbackNews.find((n) => n.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const news = await getNewsList("&limit=100");
  const list = news.length ? news : fallbackNews;
  return list.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolveNews(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.summary, path: `/news/${post.slug}` });
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await resolveNews(slug);
  if (!post) notFound();

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "News", path: "/news" },
    { name: post.title, path: `/news/${post.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: post.title,
          description: post.summary,
          path: `/news/${post.slug}`,
          image: post.featuredImage,
          datePublished: post.publishedAt ?? post.createdAt,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />

      <section className="bg-brand-teal-900 py-20">
        <Container>
          <RevealOnScroll className="max-w-3xl">
            <span className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              {post.category}
            </span>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
            {post.publishedAt && (
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-white/70">
                <Calendar className="h-4 w-4" /> {formatDate(post.publishedAt)}
              </span>
            )}
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="max-w-3xl">
          <RichContent
            content={post.content}
            className="prose prose-teal max-w-none flex flex-col gap-4 text-brand-grey-600 [&_p]:leading-relaxed"
          />
        </Container>
      </section>
    </>
  );
}
