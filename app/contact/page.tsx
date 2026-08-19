import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ContactForm } from "@/components/forms/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getDepartments } from "@/lib/api-server";
import { fallbackDepartments } from "@/lib/fallback-content";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: "Get in touch with Devaki Speciality Hospital — location, phone numbers, and department-wise contacts.",
  path: "/contact",
});

const contactDetails = [
  { icon: MapPin, label: "Address", value: `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city} – ${siteConfig.address.postalCode}` },
  { icon: Phone, label: "Appointments / Enquiry", value: siteConfig.appointmentNumber },
  { icon: Phone, label: "Emergency Casualty (24×7)", value: siteConfig.emergencyNumber },
  { icon: Phone, label: "Landline", value: siteConfig.landlineNumber },
  { icon: Mail, label: "Email", value: siteConfig.email },
  { icon: Clock, label: "OPD Hours", value: "Mon–Sat, 8:00 AM – 8:00 PM" },
];

export default async function ContactPage() {
  const departments = await getDepartments("?status=published&sort=order");
  const departmentList = departments.length ? departments : fallbackDepartments;
  const departmentsWithContact = departmentList.filter((d) => d.contactPhone || d.contactEmail);

  return (
    <>
      <section className="bg-brand-grey-50 py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-8">
            <SectionHeading
              align="left"
              eyebrow="Get in Touch"
              title="We're here to help"
              className="mx-0"
            />
            <div className="flex flex-col gap-5">
              {contactDetails.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-grey-400">{label}</p>
                    <p className="text-sm font-medium text-brand-teal-900">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-64 overflow-hidden rounded-3xl bg-brand-teal-100">
              <iframe
                title="Devaki Speciality Hospital location"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `${siteConfig.address.line1}, ${siteConfig.address.city}`
                )}&output=embed`}
              />
            </div>
          </div>
          <ContactForm />
        </Container>
      </section>

      {departmentsWithContact.length > 0 && (
        <section className="bg-white py-20">
          <Container className="flex flex-col gap-10">
            <SectionHeading
              align="left"
              eyebrow="Department Directory"
              title="Reach a department directly"
              description="For non-urgent, department-specific queries, you can contact the relevant team directly."
              className="mx-0"
            />
            <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {departmentsWithContact.map((department, index) => (
                <RevealOnScroll as="li" key={department._id} delay={index * 0.04} className="list-none">
                  <Card className="flex flex-col gap-2 p-6">
                    <h3 className="font-bold text-brand-teal-900">{department.name}</h3>
                    {department.contactPhone && (
                      <a
                        href={`tel:${department.contactPhone}`}
                        className="inline-flex items-center gap-2 text-sm text-brand-grey-500 hover:text-brand-teal-700"
                      >
                        <Phone className="h-3.5 w-3.5" /> {department.contactPhone}
                      </a>
                    )}
                    {department.contactEmail && (
                      <a
                        href={`mailto:${department.contactEmail}`}
                        className="inline-flex items-center gap-2 text-sm text-brand-grey-500 hover:text-brand-teal-700"
                      >
                        <Mail className="h-3.5 w-3.5" /> {department.contactEmail}
                      </a>
                    )}
                  </Card>
                </RevealOnScroll>
              ))}
            </StaggerGroup>
          </Container>
        </section>
      )}
    </>
  );
}
