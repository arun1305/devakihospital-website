import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";
import { getInsurancePartners } from "@/lib/api-server";
import { fallbackInsurancePartners } from "@/lib/fallback-content";

export const metadata: Metadata = buildMetadata({
  title: "Insurance & TPA",
  description: "Cashless insurance partners and TPA empanelment at Devaki Speciality Hospital.",
  path: "/patient-resources/insurance",
});

export default async function InsurancePage() {
  const partners = await getInsurancePartners();
  const list = partners.length ? partners : fallbackInsurancePartners;

  return (
    <>
      <PageHero
        eyebrow="Patient Resources"
        title="Insurance & TPA"
        description="We're empanelled with major insurers and third-party administrators for cashless treatment. Our insurance desk handles pre-authorisation and claims coordination on your behalf."
      />
      <section className="bg-white py-20">
        <Container className="flex flex-col gap-10">
          <div className="rounded-2xl bg-brand-grey-50 p-6 text-sm leading-relaxed text-brand-grey-500">
            To use cashless insurance, please carry your insurance card and a valid photo ID at admission. Our
            insurance desk will verify your policy and initiate pre-authorisation with your insurer or TPA. For
            planned procedures, we recommend contacting the insurance desk at least 48 hours in advance.
          </div>
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((partner, index) => (
              <RevealOnScroll as="li" key={partner._id} delay={index * 0.05} className="list-none">
                <div className="flex items-center gap-3 rounded-2xl border border-brand-grey-200 bg-white p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-brand-teal-900">{partner.name}</span>
                </div>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
