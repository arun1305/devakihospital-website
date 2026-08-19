import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { RichContent } from "@/components/content/RichContent";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { getBlogBySlug, getBlogs } from "@/lib/api-server";
import { fallbackBlogs } from "@/lib/fallback-content";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function resolveBlog(slug: string): Promise<BlogPost | null> {
  const live = await getBlogBySlug(slug);
  if (live) return live;
  return fallbackBlogs.find((b) => b.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const blogs = await getBlogs("&limit=100");
  const list = blogs.length ? blogs : fallbackBlogs;
  return list.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolveBlog(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await resolveBlog(slug);
  if (!post) notFound();

  const categoryLabel = typeof post.category === "string" ? post.category : post.category.name;
  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          image: post.featuredImage,
          datePublished: post.publishedAt ?? post.createdAt,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />

      <article>
        <section className="bg-brand-teal-900 py-20">
          <Container>
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-white/60">
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              <span>/</span>
              <span className="text-white">{categoryLabel}</span>
            </nav>
            <RevealOnScroll className="max-w-3xl">
              <span className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                {categoryLabel}
              </span>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
              <div className="mt-4 flex items-center gap-4 text-sm text-white/70">
                {post.publishedAt && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" /> {formatDate(post.publishedAt)}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {post.readingTimeMinutes} min read
                </span>
              </div>
            </RevealOnScroll>
          </Container>
        </section>

        <section className="bg-white py-16 dark:bg-brand-teal-950">
          <Container className="max-w-3xl">
            <RichContent
              content={post.content}
              className="prose prose-teal max-w-none flex flex-col gap-4 text-brand-grey-600 dark:text-brand-grey-300 dark:prose-invert [&_p]:leading-relaxed"
            />
            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-teal-50 px-3 py-1 text-xs font-semibold text-brand-teal-700 dark:bg-brand-teal-900 dark:text-brand-teal-200">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </Container>
        </section>
      </article>

      <AppointmentCTA />
    </>
  );
}
