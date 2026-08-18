import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const highlights = [
  { value: 28, suffix: "+", label: "Years of Trusted Care" },
  { value: 200, suffix: "+", label: "Specialist Doctors" },
  { value: 500, suffix: "+", label: "Beds Across Facilities" },
  { value: 1200000, suffix: "+", label: "Patients Treated" },
];

export function HighlightsCounter() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-teal-800 to-brand-teal-900 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
      <Container className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
        {highlights.map((item, index) => (
          <RevealOnScroll key={item.label} delay={index * 0.08} className="text-center">
            <AnimatedCounter
              value={item.value}
              suffix={item.suffix}
              className="block text-4xl font-bold text-white sm:text-5xl"
            />
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/70">{item.label}</p>
          </RevealOnScroll>
        ))}
      </Container>
    </section>
  );
}
