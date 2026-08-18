import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { EventRegistrationForm } from "@/components/forms/EventRegistrationForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getEventBySlug, getEvents } from "@/lib/api-server";
import { fallbackEvents } from "@/lib/fallback-content";
import { formatDate } from "@/lib/utils";
import type { EventItem } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function resolveEvent(slug: string): Promise<EventItem | null> {
  const live = await getEventBySlug(slug);
  if (live) return live;
  return fallbackEvents.find((e) => e.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const events = await getEvents("&limit=100");
  const list = events.length ? events : fallbackEvents;
  return list.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await resolveEvent(slug);
  if (!event) return {};
  return buildMetadata({
    title: event.title,
    description: event.description.slice(0, 155),
    path: `/events/${event.slug}`,
  });
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await resolveEvent(slug);
  if (!event) notFound();

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: event.title, path: `/events/${event.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <section className="bg-brand-teal-900 py-20">
        <Container>
          <RevealOnScroll className="max-w-3xl">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{event.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {formatDate(event.startDate)}
                {event.endDate ? ` – ${formatDate(event.endDate)}` : ""}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {event.location}
              </span>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealOnScroll>
            <p className="whitespace-pre-line leading-relaxed text-brand-grey-600">{event.description}</p>
          </RevealOnScroll>
          {event.registrationEnabled && (
            <RevealOnScroll delay={0.1}>
              <EventRegistrationForm eventId={event._id} eventTitle={event.title} />
            </RevealOnScroll>
          )}
        </Container>
      </section>
    </>
  );
}
