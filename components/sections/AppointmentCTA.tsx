import { CalendarCheck, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { siteConfig } from "@/lib/site-config";

export function AppointmentCTA() {
  return (
    <section className="relative overflow-hidden py-20">
      <Container>
        <RevealOnScroll className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-teal-700 via-brand-teal-800 to-brand-teal-900 px-8 py-16 text-center shadow-brand-soft sm:px-16">
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand-orange-500/25 blur-3xl animate-float" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Your health can&rsquo;t wait. Neither should you.
            </h2>
            <p className="text-white/75">
              Schedule a consultation with the right specialist in minutes, or call our care team for
              guidance on where to start.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/appointment" size="lg" variant="secondary" icon={<CalendarCheck className="h-5 w-5" />}>
                Book an Appointment
              </Button>
              <Button
                href={`tel:${siteConfig.appointmentNumber}`}
                size="lg"
                variant="glass"
                icon={<PhoneCall className="h-5 w-5" />}
              >
                {siteConfig.appointmentNumber}
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
