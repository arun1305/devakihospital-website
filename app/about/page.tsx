import type { Metadata } from "next";
import {
  Award as AwardIcon,
  Building2,
  Cpu,
  Users,
  GraduationCap,
  Landmark,
  Trophy,
  Medal,
  Sparkles,
  HeartPulse,
  ShieldCheck,
  Pill,
  Stethoscope,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PortraitMockup } from "@/components/ui/PortraitMockup";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";
import { HighlightsCounter } from "@/components/sections/HighlightsCounter";
import { buildMetadata } from "@/lib/seo";
import { getAwards, getAccreditations } from "@/lib/api-server";
import { fallbackAwards, fallbackAccreditations } from "@/lib/fallback-content";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: "The story, founders, awards, and infrastructure behind Devaki Speciality Hospital, Madurai.",
  path: "/about",
});

const coreValues = [
  { title: "Compassion", description: "Every decision starts with the patient's dignity and comfort." },
  { title: "Clinical Excellence", description: "Evidence-based medicine, continuously benchmarked against global standards." },
  { title: "Transparency", description: "Clear communication on diagnosis, treatment options, and cost — always." },
  { title: "Integrity", description: "Honest medical advice, even when it means recommending a simpler path." },
];

const infrastructure = [
  { icon: Building2, title: "150+ Bed Facility", description: "A full-scale multi-speciality hospital in the heart of Madurai, built around Arasaradi." },
  { icon: Cpu, title: "AC Operation Theatres", description: "Air-conditioned, modular operation theatres equipped for complex surgical procedures." },
  { icon: Pill, title: "In-House Pharmacy & Lab", description: "An attached pharmacy alongside ECG and clinical laboratory facilities, all under one roof." },
];

const awards = [
  {
    icon: Trophy,
    title: "The Best Doctor Award",
    description: "Conferred to Dr. P. S. Nagendiran by The Tamil Nadu Dr. M.G.R. Medical University, Chennai.",
  },
  {
    icon: Landmark,
    title: "Government Honours",
    description: "District, State, and Central Government awards recognising the performance of Devaki Cancer Institute.",
  },
  {
    icon: Medal,
    title: "Presidential Recognition",
    description: "An appreciation award presented by Dr. A. P. J. Abdul Kalam, then President of India, at Rashtrapati Bhavan, New Delhi.",
  },
  {
    icon: Sparkles,
    title: "100+ Awards & Honours",
    description: "Including recognition from Dr. Manmohan Singh, former Prime Minister of India, alongside over a hundred awards from various organisations for service and performance.",
  },
];

const leadership = [
  { name: "Dr. P. S. Nagendiran, M.B.B.S", role: "Founder & Chairman — Family Physician", initials: "PN" },
  { name: "Dr. N. Jaipraveen, M.D.", role: "Associate Managing Director — Consultant General Medicine", initials: "NJ" },
  { name: "Dr. Manoj Prabhakar, M.D.", role: "Consultant General Medicine", initials: "MP" },
  { name: "Dr. K. Devaki, DMRD", role: "Consultant Radiologist & Director, Devaki Scans", initials: "KD" },
];

export default async function AboutPage() {
  const [awardsData, accreditations] = await Promise.all([getAwards(), getAccreditations()]);
  const awardList = awardsData.length ? awardsData : fallbackAwards;
  const accreditationList = accreditations.length ? accreditations : fallbackAccreditations;

  return (
    <>
      <section className="relative overflow-hidden bg-brand-teal-900 py-20 dark:bg-brand-teal-950">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-orange-500/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-brand-teal-400/20 blur-3xl" />
        </div>
        <Container>
          <SectionHeading
            tone="dark"
            align="left"
            eyebrow="About Devaki"
            title="Quality healthcare with humanity, since 1991"
            description="What began as a single-doctor practice in Arasaradi has grown into a 150+ bed multi-speciality hospital trusted across Madurai — built on a family's three-decade commitment to medicine."
            className="mx-0"
          />
        </Container>
      </section>

      <section id="founder" className="bg-white py-20 lg:py-28 dark:bg-brand-teal-950">
        <Container className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <RevealOnScroll direction="left">
            <PortraitMockup
              initials="PN"
              accentIcons={[<Stethoscope key="steth" className="h-5 w-5" />, <HeartPulse key="heart" className="h-5 w-5" />]}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-orange-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange-600 dark:bg-brand-orange-900/40 dark:text-brand-orange-300">
              <GraduationCap className="h-3.5 w-3.5" /> Our Founder
            </span>
            <h2 className="text-3xl font-bold text-brand-teal-900 dark:text-white">Dr. P. S. Nagendiran</h2>
            <p className="leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">
              Dr. Nagendiran graduated from Stanley Medical College, Chennai, in 1985, and trained further at
              University College London Hospital in the United Kingdom before returning to his hometown of
              Madurai. In 1991, he started a general practice in Arasaradi — the seed from which Devaki
              Speciality Hospital would grow. That same year, he married Dr. K. Devaki, MBBS, DMRD, now Senior
              Consultant Radiologist and Director of Devaki Scans. Their family&rsquo;s commitment to medicine
              continues through their sons, Dr. Naveen and Dr. Jai Praveen, and daughter-in-law Dr. Karthika
              Nandhini.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Stanley Medical College, 1985", "UCL Hospital, London", "Practice founded, 1991"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-brand-grey-200 px-4 py-1.5 text-xs font-semibold text-brand-teal-700 dark:border-white/10 dark:text-brand-teal-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <HighlightsCounter />

      <section id="mission" className="bg-brand-grey-50 py-20 dark:bg-brand-grey-900">
        <Container className="grid gap-8 sm:grid-cols-2">
          <RevealOnScroll>
            <Card className="h-full p-8 transition-transform duration-300 hover:-translate-y-1">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-700 text-white">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h2 className="mb-3 text-xl font-bold text-brand-teal-900 dark:text-white">Our Vision</h2>
              <p className="text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">
                Providing the safest and highest quality healthcare to our community at an affordable cost.
              </p>
            </Card>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <Card className="h-full p-8 transition-transform duration-300 hover:-translate-y-1">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 text-white">
                <HeartPulse className="h-5 w-5" />
              </span>
              <h2 className="mb-3 text-xl font-bold text-brand-teal-900 dark:text-white">Our Mission</h2>
              <p className="text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">
                Quality healthcare with humanity — treating every patient as family, from first consultation
                to full recovery.
              </p>
            </Card>
          </RevealOnScroll>
        </Container>
      </section>

      <section id="awards" className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Recognition"
            title="Awards & appreciation"
            description="Three decades of service, recognised at the district, state, and national level."
          />
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {awards.map(({ icon: Icon, title, description }, index) => (
              <RevealOnScroll as="li" key={title} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col gap-4 p-7 transition-transform duration-300 hover:-translate-y-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-700 text-white shadow-brand-soft">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-bold text-brand-teal-900 dark:text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{description}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section id="infrastructure" className="bg-brand-grey-50 py-20 dark:bg-brand-grey-900">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Infrastructure" title="Built for coordinated, round-the-clock care" />
          <StaggerGroup className="grid gap-6 lg:grid-cols-3">
            {infrastructure.map(({ icon: Icon, title, description }, index) => (
              <RevealOnScroll as="li" key={title} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col gap-4 p-7 transition-transform duration-300 hover:-translate-y-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-700 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-bold text-brand-teal-900 dark:text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{description}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section id="management" className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Leadership" title="The family behind the hospital" />
          <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((member, index) => (
              <RevealOnScroll as="li" key={member.name} delay={index * 0.06} className="list-none">
                <div className="flex flex-col items-center gap-4 text-center">
                  <PortraitMockup initials={member.initials} className="max-w-[9.5rem]" />
                  <div>
                    <h3 className="font-bold text-brand-teal-900 dark:text-white">{member.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-orange-600 dark:text-brand-orange-300">
                      {member.role}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section id="accreditations" className="bg-brand-grey-50 py-20 dark:bg-brand-grey-900">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Accreditations" title="Standards we hold ourselves to" />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-brand-teal-900 dark:text-white">
                <Users className="h-5 w-5 text-brand-teal-600 dark:text-brand-teal-300" /> Additional Awards
              </h3>
              <StaggerGroup className="flex flex-col gap-4">
                {awardList.map((award, index) => (
                  <RevealOnScroll as="li" key={award._id} delay={index * 0.06} className="list-none">
                    <div className="flex items-start gap-3 rounded-2xl border border-brand-grey-200 p-4 dark:border-white/10">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange-50 text-brand-orange-600 dark:bg-brand-orange-900/40 dark:text-brand-orange-300">
                        <AwardIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-brand-teal-900 dark:text-white">{award.title}</p>
                        <p className="text-xs text-brand-grey-500 dark:text-brand-grey-400">
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
              <h3 className="mb-5 text-lg font-bold text-brand-teal-900 dark:text-white">Accreditations</h3>
              <StaggerGroup className="flex flex-col gap-4">
                {accreditationList.map((accreditation, index) => (
                  <RevealOnScroll as="li" key={accreditation._id} delay={index * 0.06} className="list-none">
                    <div className="flex items-start gap-3 rounded-2xl border border-brand-grey-200 p-4 dark:border-white/10">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700 dark:bg-brand-teal-800 dark:text-brand-teal-100">
                        <AwardIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-brand-teal-900 dark:text-white">{accreditation.name}</p>
                        {accreditation.description && (
                          <p className="text-xs text-brand-grey-500 dark:text-brand-grey-400">{accreditation.description}</p>
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

      <section id="csr" className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="What Drives Us" title="Our core values" />
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, index) => (
              <RevealOnScroll as="li" key={value.title} delay={index * 0.06} className="list-none">
                <Card className="h-full p-7 transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="mb-2 text-lg font-bold text-brand-teal-900 dark:text-white">{value.title}</h3>
                  <p className="text-sm text-brand-grey-500 dark:text-brand-grey-400">{value.description}</p>
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
