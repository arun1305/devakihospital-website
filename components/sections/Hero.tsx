"use client";

import { motion } from "framer-motion";
import { CalendarCheck, PhoneCall, ShieldCheck, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/site-config";

const trustPoints = [
  { icon: ShieldCheck, label: "NABH Accredited Care" },
  { icon: Stethoscope, label: "200+ Specialist Doctors" },
  { icon: CalendarCheck, label: "Same-Day Appointments" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-teal-900">
      {/* Animated background blobs replace the missing hero video for now */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-teal-900 via-brand-teal-800 to-brand-teal-700" />
        <motion.div
          className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-orange-500/25 blur-3xl animate-blob"
          aria-hidden
        />
        <motion.div
          className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-brand-teal-400/20 blur-3xl animate-blob"
          style={{ animationDelay: "3s" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:28px_28px]" />
      </div>

      <Container className="relative grid min-h-[88vh] items-center gap-14 py-24 lg:min-h-[92vh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="flex max-w-3xl flex-col gap-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-orange-400" />
            {siteConfig.tagline}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          >
            Advanced medicine, <span className="text-gradient-brand bg-gradient-to-r from-brand-orange-300 to-brand-orange-500 bg-clip-text text-transparent">delivered with care</span> you can feel.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl text-lg leading-relaxed text-white/75"
          >
            From routine screenings to complex interventions, Devaki Speciality Hospital pairs
            internationally benchmarked clinical technology with a care team that treats every
            patient like family.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button href="/appointment" size="lg" variant="secondary" icon={<CalendarCheck className="h-5 w-5" />}>
              Book an Appointment
            </Button>
            <Button
              href={`tel:${siteConfig.emergencyNumber}`}
              size="lg"
              variant="glass"
              icon={<PhoneCall className="h-5 w-5" />}
            >
              Emergency: {siteConfig.emergencyNumber}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            {trustPoints.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="glass-panel-dark flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-semibold text-white"
              >
                <Icon className="h-5 w-5 text-brand-orange-300" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
          className="relative w-full"
        >
          <motion.div
            className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-orange-400/30 to-brand-teal-300/25 blur-2xl"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <div className="rounded-3xl bg-white/95 p-6 shadow-brand-soft backdrop-blur-xl sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange-50 text-brand-orange-600">
                <CalendarCheck className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-brand-teal-900">Request a Call Back</h2>
                <p className="text-xs text-brand-grey-500">Share a few details — our care team will reach out shortly.</p>
              </div>
            </div>
            <ContactForm embedded />
          </div>
        </motion.div>
      </Container>

      <div className="h-16 w-full bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
