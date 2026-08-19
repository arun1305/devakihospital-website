import type { Metadata } from "next";
import { Quote, Award as AwardIcon, Building2, Cpu, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";
import { buildMetadata } from "@/lib/seo";
import { getAwards, getAccreditations } from "@/lib/api-server";
import { fallbackAwards, fallbackAccreditations } from "@/lib/fallback-content";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: "Learn about Devaki Speciality Hospital's mission, journey, infrastructure, and leadership team.",
  path: "/about",
});

const coreValues = [
  { title: "Compassion", description: "Every decision starts with the patient's dignity and comfort." },
  { title: "Clinical Excellence", description: "Evidence-based medicine, continuously benchmarked against global standards." },
  { title: "Transparency", description: "Clear communication on diagnosis, treatment options, and cost — always." },
  { title: "Integrity", description: "Honest medical advice, even when it means recommending a simpler path." },
];

const journey = [
  { year: "1998", milestone: "Devaki Speciality Hospital opens as a 50-bed multi-speciality facility in Madurai." },
  { year: "2006", milestone: "Cardiology and Orthopaedics centres of excellence established with dedicated cath lab and OTs." },
  { year: "2013", milestone: "NABH accreditation achieved; hospital expands to 300 beds." },
  { year: "2019", milestone: "Oncology and advanced Neurology units launched with a dedicated stroke unit." },
  { year: "2026", milestone: "500+ beds, 200+ specialists, and a new biplane cath lab commissioned." },
];

const infrastructure = [
  { icon: Building2, title: "500+ Bed Facility", description: "Modern inpatient wards, private suites, and critical care units across multiple floors." },
  { icon: Cpu, title: "Advanced Diagnostics", description: "3T MRI, biplane cath lab, PET-CT access, and a NABL-accredited laboratory." },
  { icon: Users, title: "200+ Specialists", description: "Consultants across 16 clinical departments, supported by round-the-clock nursing staff." },
];

const managementTeam = [
  { name: "Dr. Devaki Sundaram", role: "Founder & Chairperson", bio: "A practicing physician for over 30 years, Dr. Sundaram founded the hospital on the principle of accessible, humane healthcare." },
  { name: "Mr. Arun Sundaram", role: "Managing Director", bio: "Leads strategy and expansion, with a focus on bringing advanced clinical technology to the region." },
  { name: "Dr. Kavitha Rao", role: "Chief Medical Officer", bio: "Oversees clinical quality and patient safety programs across all departments." },
];

export default async function AboutPage() {
  const [awards, accreditations] = await Promise.all([getAwards(), getAccreditations()]);
  const awardList = awards.length ? awards : fallbackAwards;
  const accreditationList = accreditations.length ? accreditations : fallbackAccreditations;

  return (
    <>
      <section className="bg-brand-teal-900 py-20">
        <Container>
          <SectionHeading
            tone="dark"
            align="left"
            eyebrow="About Devaki"
            title="Quality healthcare with humanity, since day one"
            description="Devaki Speciality Hospital was founded on a simple premise: advanced medicine should never come at the cost of compassion."
            className="mx-0"
          />
        </Container>
      </section>

      <section id="mission" className="bg-white py-20">
        <Container className="grid gap-8 sm:grid-cols-2">
          <RevealOnScroll>
            <Card className="h-full p-8">
              <h2 className="mb-3 text-xl font-bold text-brand-teal-900">Our Mission</h2>
              <p className="text-sm leading-relaxed text-brand-grey-500">
                To deliver accessible, technologically advanced healthcare that treats every patient as
                family — combining clinical rigor with genuine human warmth.
              </p>
            </Card>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <Card className="h-full p-8">
              <h2 className="mb-3 text-xl font-bold text-brand-teal-900">Our Vision</h2>
              <p className="text-sm leading-relaxed text-brand-grey-500">
                To be the region&rsquo;s most trusted multi-speciality hospital, recognised equally for
                clinical outcomes and patient experience.
              </p>
            </Card>
          </RevealOnScroll>
        </Container>
      </section>

      <section id="chairman" className="bg-brand-grey-50 py-20">
        <Container>
          <RevealOnScroll className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto mb-4 h-10 w-10 text-brand-orange-500" />
            <p className="text-xl font-medium leading-relaxed text-brand-teal-900">
              &ldquo;We built Devaki Speciality Hospital on the belief that a patient&rsquo;s recovery depends as much
              on how they&rsquo;re treated as on what treatment they receive. Every investment we make — in
              technology, in training, in infrastructure — is measured against that standard.&rdquo;
            </p>
            <p className="mt-6 font-bold text-brand-teal-900">Dr. Devaki Sundaram</p>
            <p className="text-sm text-brand-grey-500">Founder &amp; Chairperson</p>
          </RevealOnScroll>
        </Container>
      </section>

      <section id="journey" className="bg-white py-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Our Journey" title="Nearly three decades of growth" />
          <div className="relative mx-auto flex max-w-3xl flex-col gap-8 border-l border-brand-grey-200 pl-8">
            {journey.map((item, index) => (
              <RevealOnScroll key={item.year} delay={index * 0.06} className="relative">
                <span className="absolute -left-[2.35rem] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange-500 ring-4 ring-white" />
                <p className="text-sm font-bold text-brand-orange-600">{item.year}</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-grey-600">{item.milestone}</p>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section id="infrastructure" className="bg-brand-grey-50 py-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Infrastructure & Technology" title="Built for advanced, coordinated care" />
          <StaggerGroup className="grid gap-6 lg:grid-cols-3">
            {infrastructure.map(({ icon: Icon, title, description }, index) => (
              <RevealOnScroll as="li" key={title} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col gap-4 p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-700 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-bold text-brand-teal-900">{title}</h3>
                  <p className="text-sm leading-relaxed text-brand-grey-500">{description}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section id="awards" className="bg-white py-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Recognition" title="Achievements & accreditations" />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-5 text-lg font-bold text-brand-teal-900">Awards</h3>
              <StaggerGroup className="flex flex-col gap-4">
                {awardList.map((award, index) => (
                  <RevealOnScroll as="li" key={award._id} delay={index * 0.06} className="list-none">
                    <div className="flex items-start gap-3 rounded-2xl border border-brand-grey-200 p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange-50 text-brand-orange-600">
                        <AwardIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-brand-teal-900">{award.title}</p>
                        <p className="text-xs text-brand-grey-500">
                          {award.year}
                          {award.description ? ` · ${award.description}` : ""}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </StaggerGroup>
            </div>
            <div>
              <h3 className="mb-5 text-lg font-bold text-brand-teal-900">Accreditations</h3>
              <StaggerGroup className="flex flex-col gap-4">
                {accreditationList.map((accreditation, index) => (
                  <RevealOnScroll as="li" key={accreditation._id} delay={index * 0.06} className="list-none">
                    <div className="flex items-start gap-3 rounded-2xl border border-brand-grey-200 p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700">
                        <AwardIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-brand-teal-900">{accreditation.name}</p>
                        {accreditation.description && (
                          <p className="text-xs text-brand-grey-500">{accreditation.description}</p>
                        )}
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </Container>
      </section>

      <section id="management" className="bg-brand-grey-50 py-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Leadership" title="Management team" />
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {managementTeam.map((member, index) => (
              <RevealOnScroll as="li" key={member.name} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col gap-3 p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-teal-600 to-brand-teal-800 text-lg font-bold text-white">
                    {member.name
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <h3 className="font-bold text-brand-teal-900">{member.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange-600">{member.role}</p>
                  <p className="text-sm leading-relaxed text-brand-grey-500">{member.bio}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section id="csr" className="bg-white py-20">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="What Drives Us" title="Our core values" />
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, index) => (
              <RevealOnScroll as="li" key={value.title} delay={index * 0.06} className="list-none">
                <Card className="h-full p-7">
                  <h3 className="mb-2 text-lg font-bold text-brand-teal-900">{value.title}</h3>
                  <p className="text-sm text-brand-grey-500">{value.description}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <AppointmentCTA />
    </>
  );
}
