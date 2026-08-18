import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-teal-900 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(242,121,27,0.18),transparent_45%)]" />
      <Container className="relative">
        <RevealOnScroll className="max-w-3xl">
          <span className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
            {eyebrow}
          </span>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          {description && <p className="mt-4 text-lg text-white/75">{description}</p>}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
