import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Images as ImagesIcon, Video as VideoIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGalleryAlbumBySlug, getGalleryAlbums } from "@/lib/api-server";
import { fallbackGalleryAlbums } from "@/lib/fallback-content";
import { resolveMediaUrl } from "@/lib/utils";
import type { GalleryAlbum } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function resolveAlbum(slug: string): Promise<GalleryAlbum | null> {
  const live = await getGalleryAlbumBySlug(slug);
  if (live) return live;
  return fallbackGalleryAlbums.find((a) => a.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const albums = await getGalleryAlbums("?limit=100");
  const list = albums.length ? albums : fallbackGalleryAlbums;
  return list.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const album = await resolveAlbum(slug);
  if (!album) return {};
  return buildMetadata({
    title: album.title,
    description: `${album.title} — photos and videos from Devaki Speciality Hospital.`,
    path: `/gallery/${album.slug}`,
  });
}

export default async function GalleryAlbumPage({ params }: PageProps) {
  const { slug } = await params;
  const album = await resolveAlbum(slug);
  if (!album) notFound();

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: album.title, path: `/gallery/${album.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <section className="bg-brand-teal-900 py-16 dark:bg-brand-teal-950">
        <Container>
          <RevealOnScroll>
            <span className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              {album.category}
            </span>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{album.title}</h1>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-white py-16 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-14">
          <div>
            <h2 className="mb-6 inline-flex items-center gap-2 text-lg font-bold text-brand-teal-900 dark:text-white">
              <ImagesIcon className="h-5 w-5" /> Photos
            </h2>
            {album.images.length > 0 ? (
              <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {album.images.map((src, index) => (
                  <RevealOnScroll as="li" key={src} delay={Math.min(index, 8) * 0.03} className="list-none">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-grey-100 dark:bg-brand-grey-900">
                      <Image
                        src={resolveMediaUrl(src)}
                        alt={`${album.title} photo ${index + 1}`}
                        fill
                        sizes="25vw"
                        className="object-cover"
                      />
                    </div>
                  </RevealOnScroll>
                ))}
              </StaggerGroup>
            ) : (
              <p className="text-sm text-brand-grey-400 dark:text-brand-grey-400">Photos for this album are being uploaded — check back soon.</p>
            )}
          </div>

          {album.videos.length > 0 && (
            <div>
              <h2 className="mb-6 inline-flex items-center gap-2 text-lg font-bold text-brand-teal-900 dark:text-white">
                <VideoIcon className="h-5 w-5" /> Videos
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {album.videos.map((src) => (
                  <div key={src} className="overflow-hidden rounded-2xl bg-black">
                    <video src={resolveMediaUrl(src)} controls className="aspect-video w-full" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
