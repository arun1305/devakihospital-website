import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { buildMetadata } from "@/lib/seo";
import { getEvents } from "@/lib/api-server";
import { fallbackEvents } from "@/lib/fallback-content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Events",
  description: "Health camps, workshops, and community events hosted by Devaki Speciality Hospital.",
  path: "/events",
});

export default async function EventsListPage() {
  const events = await getEvents("&sort=startDate&limit=50");
  const list = events.length ? events : fallbackEvents;
  const now = Date.now();
  const upcoming = list.filter((e) => new Date(e.startDate).getTime() >= now);
  const past = list.filter((e) => new Date(e.startDate).getTime() < now);

  return (
    <section className="bg-white py-20 lg:py-28 dark:bg-brand-teal-950">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          align="left"
          eyebrow="Events"
          title="Health camps & community events"
          className="mx-0"
        />

        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-bold text-brand-teal-900 dark:text-white">Upcoming</h2>
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event, index) => (
              <RevealOnScroll as="li" key={event._id} delay={index * 0.05} className="list-none">
                <Link href={`/events/${event.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col gap-4 p-7">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-brand-orange-600 dark:text-brand-orange-400">
                      <span>{event.registrationEnabled ? "Registration Open" : "Event"}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-teal-900 dark:text-white">{event.title}</h3>
                    <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{event.description}</p>
                    <div className="flex flex-col gap-1.5 text-xs text-brand-grey-500 dark:text-brand-grey-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> {formatDate(event.startDate)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> {event.location}
                      </span>
                    </div>
                  </Card>
                </Link>
              </RevealOnScroll>
            ))}
            {upcoming.length === 0 && (
              <p className="text-sm text-brand-grey-400 dark:text-brand-grey-500">No upcoming events scheduled right now — check back soon.</p>
            )}
          </StaggerGroup>
        </div>

        {past.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold text-brand-teal-900 dark:text-white">Past Events</h2>
            <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event, index) => (
                <RevealOnScroll as="li" key={event._id} delay={index * 0.05} className="list-none">
                  <Link href={`/events/${event.slug}`} className="group block h-full opacity-75">
                    <Card className="flex h-full flex-col gap-3 p-6">
                      <h3 className="font-bold text-brand-teal-900 dark:text-white">{event.title}</h3>
                      <span className="inline-flex items-center gap-1.5 text-xs text-brand-grey-400 dark:text-brand-grey-500">
                        <Calendar className="h-3.5 w-3.5" /> {formatDate(event.startDate)}
                      </span>
                    </Card>
                  </Link>
                </RevealOnScroll>
              ))}
            </StaggerGroup>
          </div>
        )}
      </Container>
    </section>
  );
}
