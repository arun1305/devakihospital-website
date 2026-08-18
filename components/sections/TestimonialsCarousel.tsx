"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/types";

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  return (
    <section className="relative overflow-hidden bg-brand-teal-900 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(242,121,27,0.18),transparent_50%)]" />
      <Container className="relative flex flex-col gap-14">
        <SectionHeading
          tone="dark"
          eyebrow="Patient Stories"
          title="Trusted by families across generations"
          description="Real experiences from patients and families who chose Devaki for their most important moments."
        />

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="!pb-14"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial._id}>
              <div className="glass-panel-dark flex h-full flex-col gap-4 rounded-3xl p-7">
                <Quote className="h-8 w-8 text-brand-orange-400" />
                <p className="flex-1 text-sm leading-relaxed text-white/85">&ldquo;{testimonial.message}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{testimonial.patientName}</span>
                  <span className="flex items-center gap-0.5 text-brand-orange-300">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
