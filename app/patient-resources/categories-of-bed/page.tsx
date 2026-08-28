import type { Metadata } from "next";
import { BedDouble, Users, Phone, ShieldCheck, ShoppingBag, UserX, Shirt, UtensilsCrossed } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Categories of Bed",
  description: "Room categories, guest amenities, and in-patient guidelines at Devaki Speciality Hospital.",
  path: "/patient-resources/categories-of-bed",
});

const bedCategories = [
  "Cubicle Ward / General Ward",
  "Twin Sharing Rooms",
  "Non-AC Rooms",
  "AC Rooms",
  "Deluxe AC Rooms & Suite Rooms",
];

const amenities = [
  { icon: BedDouble, title: "Guest Rooms", description: "Available at the A-Block building from ₹1,500/-. Bystanders can utilise this facility by contacting 0452-2288800 / 21 after patient admission." },
  { icon: Users, title: "Manager on Duty", description: "An administrative staff member is on duty every night. For any concerns, contact the Duty Manager at 0452-2288800 (200)." },
  { icon: ShieldCheck, title: "VIP Lounge", description: "A separate lounge is available on the 2nd floor, adjacent to the Security office. Contact the PRO or Chief Security Officer to avail this facility." },
  { icon: ShoppingBag, title: "Amenity Shop", description: "Available at the pharmacy — recharge cards, newspapers, sanitary items, and magazines." },
];

const inpatientInfo = [
  "Only one bystander/attender is allowed to stay with the patient.",
  "Children below 12 years will not be allowed to visit patients.",
  "Hospital clothes are provided to patients; laundry facility is available.",
  "Food from outside is not allowed inside the hospital.",
  "Food recommended by our doctors and dietician is served from the F&B Department.",
];

const infectionControl = [
  "Wash hands before and after patient contact.",
  "Wear gloves and a mask whenever necessary.",
  "Avoid visiting patients if you are sick or have an open wound.",
  "Always keep the door closed.",
  "No medication from outside should be brought into patient rooms.",
];

const safetyGuidelines = [
  "Maintain a quiet environment and avoid unnecessary noise.",
  "The entire hospital and premises are a strictly non-smoking area.",
  "Please don't open windows in AC rooms.",
  "Familiarise yourself with the location of fire exits, floor plans, and direction boards.",
];

export default function CategoriesOfBedPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Care Services"
        title="Categories of bed"
        description="Devaki Speciality Hospital offers a range of room categories to suit every patient's needs and comfort."
      />

      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-10">
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {bedCategories.map((category, index) => (
              <RevealOnScroll as="li" key={category} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col items-center gap-3 p-6 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700 dark:bg-brand-teal-800 dark:text-brand-teal-100">
                    <BedDouble className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-semibold text-brand-teal-900 dark:text-white">{category}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
          <p className="text-center text-sm text-brand-grey-500 dark:text-brand-grey-400">
            Patients and attenders can avail these facilities according to their needs.
          </p>
        </Container>
      </section>

      <section className="bg-brand-grey-50 py-20 dark:bg-brand-grey-900">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Amenities" title="Facilities for patients and guests" />
          <StaggerGroup className="grid gap-6 sm:grid-cols-2">
            {amenities.map(({ icon: Icon, title, description }, index) => (
              <RevealOnScroll as="li" key={title} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col gap-3 p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange-50 text-brand-orange-600 dark:bg-brand-orange-900/40 dark:text-brand-orange-300">
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

      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="grid gap-12 lg:grid-cols-3">
          <RevealOnScroll>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-brand-teal-900 dark:text-white">
              <UserX className="h-5 w-5 text-brand-teal-600 dark:text-brand-teal-300" /> For In-Patients & Bystanders
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-brand-grey-500 dark:text-brand-grey-400">
              {inpatientInfo.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <UtensilsCrossed className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange-500 dark:text-brand-orange-300" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
          <RevealOnScroll delay={0.06}>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-brand-teal-900 dark:text-white">
              <Shirt className="h-5 w-5 text-brand-teal-600 dark:text-brand-teal-300" /> Infection Control
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-brand-grey-500 dark:text-brand-grey-400">
              {infectionControl.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange-500 dark:text-brand-orange-300" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
          <RevealOnScroll delay={0.12}>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-brand-teal-900 dark:text-white">
              <Phone className="h-5 w-5 text-brand-teal-600 dark:text-brand-teal-300" /> Safety Guidelines
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-brand-grey-500 dark:text-brand-grey-400">
              {safetyGuidelines.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange-500 dark:text-brand-orange-300" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
