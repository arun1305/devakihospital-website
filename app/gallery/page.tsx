import type { Metadata } from "next";
import Link from "next/link";
import { Images, Video, Compass, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { buildMetadata } from "@/lib/seo";
import { getGalleryAlbums } from "@/lib/api-server";
import { fallbackGalleryAlbums } from "@/lib/fallback-content";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: "Photos, videos, and a virtual tour of Devaki Speciality Hospital's facilities, events, and community programs.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const albums = await getGalleryAlbums("?limit=50");
  const list = albums.length ? albums : fallbackGalleryAlbums;

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading align="left" eyebrow="Gallery" title="A look inside Devaki Speciality Hospital" className="mx-0" />
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <RevealOnScroll as="li" className="list-none">
            <Link
              href="/gallery/virtual-tour"
              className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-brand-orange-500 to-brand-orange-700 p-6"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
              <div className="relative flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white/80">
                <span className="inline-flex items-center gap-2">
                  <Compass className="h-3.5 w-3.5" /> Virtual Tour
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <h3 className="relative mt-2 text-lg font-bold text-white">Take a 360° walkthrough</h3>
              <p className="relative mt-1 text-xs text-white/70">Explore our facility from anywhere</p>
            </Link>
          </RevealOnScroll>

          {list.map((album, index) => (
            <RevealOnScroll as="li" key={album._id} delay={(index + 1) * 0.05} className="list-none">
              <Link
                href={`/gallery/${album.slug}`}
                className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-brand-teal-600 to-brand-teal-900 p-6"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-orange-500/20 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
                <div className="relative flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white/70">
                  <span className="inline-flex items-center gap-2">
                    {album.videos.length > 0 ? <Video className="h-3.5 w-3.5" /> : <Images className="h-3.5 w-3.5" />}
                    {album.category}
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <h3 className="relative mt-2 text-lg font-bold text-white">{album.title}</h3>
                <p className="relative mt-1 text-xs text-white/60">
                  {album.images.length} photos{album.videos.length > 0 ? ` · ${album.videos.length} videos` : ""}
                </p>
              </Link>
            </RevealOnScroll>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
