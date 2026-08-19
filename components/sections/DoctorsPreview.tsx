import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import type { Doctor } from "@/types";

export function DoctorsPreview({ doctors }: { doctors: Doctor[] }) {
  if (!doctors.length) return null;

  return (
    <section className="bg-brand-grey-50 py-20 lg:py-28 dark:bg-brand-grey-900">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Our Specialists"
            title="Meet the consultants leading your care"
            description="Board-certified specialists across every major discipline, each backed by a dedicated clinical support team."
            className="mx-0"
          />
          <Button href="/doctors" variant="outline" className="shrink-0">
            View All Doctors
          </Button>
        </div>

        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.slice(0, 3).map((doctor, index) => (
            <RevealOnScroll as="li" key={doctor._id} delay={index * 0.08} className="list-none">
              <DoctorCard doctor={doctor} />
            </RevealOnScroll>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
