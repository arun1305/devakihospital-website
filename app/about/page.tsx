import type { Metadata } from "next";
import Image from "next/image";
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
  MapPin,
  BedDouble,
  ScanLine,
  Stethoscope as StethoscopeIcon,
  HeartHandshake,
  Sun,
  Newspaper,
  Rocket,
  ShieldPlus,
  ClipboardCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PortraitMockup } from "@/components/ui/PortraitMockup";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";
import { HighlightsCounter } from "@/components/sections/HighlightsCounter";
import { buildMetadata } from "@/lib/seo";
import { getAwards, getAccreditations } from "@/lib/api-server";
import { fallbackAwards, fallbackAccreditations } from "@/lib/fallback-content";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: "The story, milestones, awards, and infrastructure behind Devaki Speciality Hospital, Madurai.",
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

const leadership = [
  { name: "Dr. P. S. Nagendiran, MBBS", role: "Chairman, Devaki Hospitals", initials: "PN", photoSrc: "/about/leader-nagendiran.jpg" },
  { name: "Dr. K. Devaki, MBBS, DMRD", role: "Managing Director, Devaki Hospitals", initials: "KD", photoSrc: "/about/leader-devaki.jpg" },
  { name: "Dr. N. Naveen, MBBS, MD(RD)", role: "Managing Director — Interventional Radiologist", initials: "NN", photoSrc: "/about/leader-son.jpg" },
  { name: "Dr. N. Jai Praveen, MBBS, MD", role: "Managing Director — General Physician", initials: "NJ" },
];

const milestones = [
  { year: "1991", text: "Dr. P. S. Nagendiran starts a general practice in Arasaradi, Madurai." },
  { year: "1992", text: "Jebam Hospital opens its doors as a 10-bed facility." },
  { year: "1995", text: "The hospital expands to 25 beds to meet growing demand." },
  { year: "1998", text: "Devaki Scans launches with a black-and-white ultrasound machine imported from Italy." },
  { year: "2000", text: "Whole-body CT scanning is introduced with a Siemens ART machine." },
  { year: "2002", text: "India's first Mammomat 1000 mammography unit is installed." },
  { year: "2003", text: "Asia's first Acuson Aspen ultrasound scanner is introduced." },
  { year: "2007", text: "Devaki Cancer Institute is inaugurated by Dr. A. P. J. Abdul Kalam, then President of India." },
  { year: "2010", text: "Tamil Nadu's first Siemens S2000 system is imported from the USA." },
  { year: "2011", text: "South Tamil Nadu's first 128-slice Spiral Heart CT Scanner goes live." },
  { year: "2014", text: "The Cath Lab and Coronary Care Unit are inaugurated by Dr. A. P. J. Abdul Kalam." },
  { year: "2020", text: "Devaki Speciality Hospital is formally inaugurated." },
  { year: "2021", text: "Tamil Nadu's first Varian Halcyon Linear Accelerator is installed." },
  { year: "2024", text: "Devaki celebrates its Silver Jubilee — 25 years of service to Madurai." },
];

const awards = [
  { icon: Trophy, title: "National Medical Excellence Award", by: "Ministry of Health & Family Welfare, New Delhi, 1999", photo: "/about/award-national-excellence.jpg" },
  { icon: Sparkles, title: "Devaki Cancer Institute Inaugurated", by: "By Dr. A. P. J. Abdul Kalam, Former President of India, 2007", photo: "/about/award-cancer-institute-kalam.jpg" },
  { icon: Medal, title: "Prime Ministerial Appreciation", by: "Dr. Manmohan Singh, Former Prime Minister of India", photo: "/about/award-manmohan-singh.jpg" },
  { icon: Landmark, title: "Best Medical Service Award", by: "Former Chief Minister Dr. Karunanidhi, Govt. of Tamil Nadu", photo: "/about/award-karunanidhi.jpg" },
  { icon: HeartHandshake, title: "“Can-Serve Children” Project", by: "Launched by Dr. A. P. J. Abdul Kalam at Devaki Speciality Hospital", photo: "/about/award-canserve-kalam.jpg" },
  { icon: Medal, title: "Presidential Appreciation", by: "Dr. Ram Nath Kovind, Former President of India", photo: "/about/award-kovind.jpg" },
  { icon: Trophy, title: "Best Doctor Award", by: "Former Governor of Tamil Nadu, Mr. Banwarilal Purohit", photo: "/about/award-purohit.jpg" },
  { icon: Sparkles, title: "Outstanding Medical Service", by: "Indian Medical Association, Madurai Branch, 2016", photo: "/about/award-ima-2016.jpg" },
  { icon: Landmark, title: "Best Social Service Award", by: "Former Governor Mr. C. Vidyasagar Rao, 2017", photo: "/about/award-vidyasagar-rao.jpg" },
  { icon: AwardIcon, title: "District Collector Honours", by: "For 15+ years of continuous community contribution", photo: "/about/award-collector-1.jpg" },
  { icon: AwardIcon, title: "District Collector Honours", by: "Recognised again for sustained community service", photo: "/about/award-collector-2.jpg" },
  { icon: Landmark, title: "Governor with Senate Members", by: "Hon'ble Governor of Tamil Nadu, felicitation ceremony", photo: "/about/award-governor-senate.jpg" },
  { icon: Trophy, title: "Rotary Award", by: "Rotary Club, for Best Diagnostic Service in Madurai", photo: "/about/award-rotary.jpg" },
];

const bedStats = [
  { value: 150, label: "Sanctioned Beds" },
  { value: 80, label: "Operational Beds" },
  { value: 20, label: "ICU Beds" },
  { value: 5, label: "Operation Theatres" },
];

const monthlyActivity = [
  { value: 4000, label: "Outpatients" },
  { value: 618, label: "Inpatients" },
  { value: 950, label: "Dialysis Sessions" },
  { value: 220, label: "Chemotherapy Sessions" },
  { value: 200, label: "CT & MRI Scans" },
  { value: 50, label: "Surgeries" },
];

const clinicalServices = [
  "Cardiology",
  "Cardiothoracic Surgery",
  "Cardiac Anaesthesiology",
  "Neurology",
  "Neurosurgery",
  "Nephrology (incl. Dialysis)",
  "Medical & Surgical Oncology",
  "Radiation Oncology",
  "Medical & Surgical Gastroenterology",
  "General Surgery (incl. Laparoscopic)",
  "General Medicine",
  "Orthopaedics (incl. Joint Replacement)",
  "Urology",
  "Vascular Surgery",
  "Respiratory Medicine",
  "Endocrinology",
  "Dermatology & Venereology",
  "Otorhinolaryngology",
  "Plastic & Reconstructive Surgery",
  "Anaesthesiology",
];

const diagnosticServices = [
  "2D Echo",
  "CT Scanning",
  "MRI",
  "Mammography",
  "Ultrasound",
  "EEG / EMG / EP",
  "Holter Monitoring",
  "Treadmill Testing",
  "Spirometry",
  "Urodynamic Studies",
  "X-Ray",
  "Clinical Bio-Chemistry",
  "Clinical Pathology",
  "Haematology",
  "Physiotherapy",
];

const facilityGallery = [
  { src: "/about/reception.jpg", width: 1400, height: 934, title: "Reception", description: "The welcome desk at Devaki Speciality Hospital." },
  { src: "/about/modular-ot.jpg", width: 1400, height: 933, title: "Modular Operation Theatre", description: "Fully equipped for complex surgical procedures." },
  { src: "/about/ambulance.jpg", width: 1400, height: 933, title: "24×7 Ambulance", description: "Round-the-clock emergency cardiac care on the road." },
  { src: "/about/cath-lab-equipment.jpg", width: 619, height: 497, title: "Cath Lab", description: "Philips Allura Xper FD10, inaugurated by Dr. A. P. J. Abdul Kalam." },
];

const csrInitiatives = [
  { icon: Sun, text: "Green, solar-lit toilets installed in Achampatti village, Madurai district." },
  { icon: ShieldPlus, text: "Corona relief contributions delivered to underprivileged village communities." },
  { icon: HeartHandshake, text: "Family Health Card scheme benefiting 1,000+ underprivileged families." },
  { icon: Users, text: "Self-help groups formed among women through the D. N. Charitable Trust." },
  { icon: ClipboardCheck, text: "Regular medical and training camps held across the region." },
  { icon: Newspaper, text: "Health awareness talks for school students, led by Dr. P. S. Nagendiran." },
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
            description="What began as a single-doctor practice in Arasaradi has grown into a 150-bed multi-speciality hospital trusted across Madurai — built on a family's three-decade commitment to medicine."
            className="mx-0"
          />
          <RevealOnScroll delay={0.15} className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            <MapPin className="h-3.5 w-3.5 text-brand-orange-300" /> Located at Madurai, Tamil Nadu
          </RevealOnScroll>
        </Container>
      </section>

      <section id="building" className="relative">
        <RevealOnScroll direction="none">
          <div className="relative h-[240px] w-full overflow-hidden sm:h-[340px] lg:h-[420px]">
            <Image
              src="/about/building-exterior.jpg"
              alt="Devaki Speciality Hospital building"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </RevealOnScroll>
      </section>

      <section id="founder" className="bg-white py-20 lg:py-28 dark:bg-brand-teal-950">
        <Container className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <RevealOnScroll direction="left">
            <PortraitMockup
              initials="PN"
              photoSrc="/about/leader-nagendiran.jpg"
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
              Speciality Hospital would grow. That same year, he married Dr. K. Devaki, MBBS, DMRD, now
              Managing Director and Senior Consultant Radiologist. Their family&rsquo;s commitment to medicine
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

      <section id="milestones" className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Our Journey" title="Three decades of milestones" description="From a single-doctor practice to a landmark multi-speciality hospital." />
          <div className="relative mx-auto flex max-w-3xl flex-col gap-8 border-l border-brand-grey-200 pl-8 dark:border-white/10">
            {milestones.map((item, index) => (
              <RevealOnScroll key={item.year} delay={index * 0.04} className="relative">
                <span className="absolute -left-[2.35rem] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange-500 ring-4 ring-white dark:ring-brand-teal-950" />
                <p className="text-sm font-bold text-brand-orange-600 dark:text-brand-orange-300">{item.year}</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-grey-600 dark:text-brand-grey-400">{item.text}</p>
              </RevealOnScroll>
            ))}
          </div>
          <StaggerGroup className="mx-auto grid w-full max-w-4xl gap-4 sm:grid-cols-3">
            {[
              { src: "/about/silver-jubilee.jpg", alt: "Silver Jubilee — 25th Anniversary backdrop" },
              { src: "/about/jubilee-group.jpg", alt: "Staff celebrating the Silver Jubilee on stage" },
              { src: "/about/family-jubilee.jpg", alt: "The Nagendiran family at the Silver Jubilee celebration" },
            ].map((photo, index) => (
              <RevealOnScroll as="li" key={photo.src} delay={index * 0.06} className="list-none overflow-hidden rounded-2xl">
                <Image src={photo.src} alt={photo.alt} width={1014} height={676} className="w-full object-cover" />
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section id="awards" className="bg-brand-grey-50 py-20 dark:bg-brand-grey-900">
        <Container className="flex flex-col gap-12">
          <RevealOnScroll direction="left" className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl shadow-brand-soft">
            <Image
              src="/about/founder-kalam.jpg"
              alt="Dr. P. S. Nagendiran with His Excellency Dr. A. P. J. Abdul Kalam, Former President of India"
              width={597}
              height={415}
              className="w-full object-cover"
            />
          </RevealOnScroll>
          <SectionHeading
            eyebrow="Recognition"
            title="Awards & appreciation"
            description="Three decades of service, recognised at the district, state, and national level."
          />
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map(({ icon: Icon, title, by, photo }, index) => (
              <RevealOnScroll as="li" key={title + by} delay={index * 0.04} className="list-none">
                <Card className="group h-full overflow-hidden p-0 transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={photo}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-brand-orange-600 shadow-brand-soft backdrop-blur-sm dark:bg-brand-teal-950/90 dark:text-brand-orange-300">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-brand-teal-900 dark:text-white">{title}</p>
                    <p className="mt-1 text-xs text-brand-grey-500 dark:text-brand-grey-400">{by}</p>
                  </div>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section id="by-the-numbers" className="relative overflow-hidden bg-gradient-to-br from-brand-teal-800 to-brand-teal-900 py-20">
        <Container className="flex flex-col gap-14">
          <SectionHeading tone="dark" eyebrow="By The Numbers" title="Our facility at a glance" />
          <StaggerGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {bedStats.map((item, index) => (
              <RevealOnScroll key={item.label} delay={index * 0.06} className="text-center">
                <BedDouble className="mx-auto mb-2 h-6 w-6 text-brand-orange-300" />
                <AnimatedCounter value={item.value} className="block text-4xl font-bold text-white sm:text-5xl" />
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/70">{item.label}</p>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
          <div>
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange-300">
              Monthly patient activity
            </p>
            <StaggerGroup className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
              {monthlyActivity.map((item, index) => (
                <RevealOnScroll key={item.label} delay={index * 0.05} className="text-center">
                  <AnimatedCounter value={item.value} suffix="+" className="block text-2xl font-bold text-white sm:text-3xl" />
                  <p className="mt-1 text-xs font-medium text-white/60">{item.label}</p>
                </RevealOnScroll>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </section>

      <section id="services" className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Scope of Services" title="Specialities and diagnostics under one roof" />
          <div className="grid gap-10 lg:grid-cols-2">
            <RevealOnScroll>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-brand-teal-900 dark:text-white">
                <StethoscopeIcon className="h-5 w-5 text-brand-teal-600 dark:text-brand-teal-300" /> Clinical Services
              </h3>
              <div className="flex flex-wrap gap-2">
                {clinicalServices.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-brand-grey-200 px-4 py-1.5 text-xs font-medium text-brand-teal-700 dark:border-white/10 dark:text-brand-teal-200"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-brand-teal-900 dark:text-white">
                <ScanLine className="h-5 w-5 text-brand-orange-600 dark:text-brand-orange-300" /> Diagnostic & Lab Services
              </h3>
              <div className="flex flex-wrap gap-2">
                {diagnosticServices.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-brand-grey-200 px-4 py-1.5 text-xs font-medium text-brand-orange-700 dark:border-white/10 dark:text-brand-orange-200"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </RevealOnScroll>
          </div>
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
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facilityGallery.map((photo, index) => (
              <RevealOnScroll as="li" key={photo.src} delay={index * 0.06} className="list-none">
                <Card className="group h-full overflow-hidden p-0 transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-bold text-brand-teal-900 dark:text-white">{photo.title}</p>
                    <p className="mt-1 text-xs text-brand-grey-500 dark:text-brand-grey-400">{photo.description}</p>
                  </div>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section id="management" className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Ownership" title="The family behind the hospital" />
          <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((member, index) => (
              <RevealOnScroll as="li" key={member.name} delay={index * 0.06} className="list-none">
                <div className="flex flex-col items-center gap-4 text-center">
                  <PortraitMockup initials={member.initials} photoSrc={member.photoSrc} className="max-w-[9.5rem]" />
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

      <section id="csr" className="bg-brand-grey-50 py-20 dark:bg-brand-grey-900">
        <Container className="flex flex-col gap-12">
          <RevealOnScroll>
            <SectionHeading
              align="left"
              eyebrow="Medico-Social Services"
              title="Giving back to our community"
              className="mx-0"
            />
            <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2">
              {csrInitiatives.map(({ icon: Icon, text }, index) => (
                <RevealOnScroll as="li" key={text} delay={index * 0.05} className="flex list-none items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-600 dark:bg-brand-teal-800 dark:text-brand-teal-200">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="text-sm leading-relaxed text-brand-grey-600 dark:text-brand-grey-400">{text}</p>
                </RevealOnScroll>
              ))}
            </StaggerGroup>
          </RevealOnScroll>
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/about/marathon.jpg", alt: "Community marathon organised by Devaki Speciality Hospital", caption: "Community Marathon" },
              { src: "/about/marathon-2.jpg", alt: "Marathon event with community partners", caption: "Health Awareness Marathon" },
              { src: "/about/csr-school-camp.jpg", alt: "Health awareness camp for school students", caption: "School Health Camp" },
              { src: "/about/csr-solar-toilet-1.jpg", alt: "Green solar-lit toilet inauguration in Achampatti village", caption: "Solar-Lit Toilet Inauguration" },
              { src: "/about/csr-solar-toilet-2.jpg", alt: "Community facility inauguration in a Madurai village", caption: "Village Facility Inauguration" },
              { src: "/about/csr-staff-training.jpg", alt: "Staff training session at Devaki Speciality Hospital", caption: "Staff Training" },
            ].map((photo, index) => (
              <RevealOnScroll as="li" key={photo.src} delay={index * 0.05} className="list-none">
                <Card className="group h-full overflow-hidden p-0 transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="p-3 text-xs font-semibold text-brand-teal-900 dark:text-white">{photo.caption}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section id="insurance" className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Insurance & TPA" title="Approved private insurance & TPA partners" description="Cashless treatment is also available for ESI, BSNL, and Tamil Nadu Government employees and pensioners." />
          <RevealOnScroll className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl shadow-brand-soft">
            <Image
              src="/about/insurance-tpa-list.jpg"
              alt="Approved private insurance and TPA partner list at Devaki Speciality Hospital"
              width={1066}
              height={914}
              className="w-full object-cover"
            />
          </RevealOnScroll>
        </Container>
      </section>

      <section id="accreditations" className="bg-white py-20 dark:bg-brand-teal-950">
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

      <section id="future" className="bg-brand-grey-50 py-20 dark:bg-brand-grey-900">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Looking Ahead" title="Future plans" />
          <StaggerGroup className="grid gap-6 sm:grid-cols-2">
            <RevealOnScroll as="li" className="list-none">
              <Card className="flex h-full flex-col gap-4 p-7 transition-transform duration-300 hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-700 text-white">
                  <Building2 className="h-5 w-5" />
                </span>
                <h3 className="font-bold text-brand-teal-900 dark:text-white">Expansion to 500 Beds</h3>
                <p className="text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">
                  Growing our facility to a 500-bed hospital to serve even more patients across the region.
                </p>
              </Card>
            </RevealOnScroll>
            <RevealOnScroll as="li" delay={0.06} className="list-none">
              <Card className="flex h-full flex-col gap-4 p-7 transition-transform duration-300 hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 text-white">
                  <Rocket className="h-5 w-5" />
                </span>
                <h3 className="font-bold text-brand-teal-900 dark:text-white">Organ Transplant Services</h3>
                <p className="text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">
                  Introducing organ transplant surgery services as part of our continued clinical expansion.
                </p>
              </Card>
            </RevealOnScroll>
          </StaggerGroup>
        </Container>
      </section>

      <section id="values" className="bg-white py-20 dark:bg-brand-teal-950">
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
