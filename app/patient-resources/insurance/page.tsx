import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { InsuranceGrid } from "@/components/patient-care/InsuranceGrid";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Insurance Providers",
  description: "Cashless insurance partners and TPA empanelment at Devaki Speciality Hospital.",
  path: "/patient-resources/insurance",
});

const providers = [
  { name: "Apollo Munich Insurance", logo: "apollomunich" },
  { name: "Bajaj Allianz General Insurance", logo: "bajaj" },
  { name: "Chief Minister's Comprehensive Health Insurance Scheme", logo: "cmscheme" },
  { name: "Care Insurance", logo: "carehealth" },
  { name: "Cholamandalam General Insurance", logo: "cholamandalam" },
  { name: "E-Meditek TPA", logo: "emedi" },
  { name: "Ericson Insurance", logo: "ericson" },
  { name: "Family Health Plan Insurance", logo: "familyhealth" },
  { name: "Future Generali Insurance", logo: "futuregenral" },
  { name: "Genins India TPA", logo: "genins" },
  { name: "Good Health Plan TPA", logo: "goodhealth" },
  { name: "Health India TPA", logo: "healthindia" },
  { name: "Health Insurance TPA", logo: "healthinsurance" },
  { name: "Heritage TPA", logo: "heritagehealth" },
  { name: "Liberty General Insurance", logo: "liberty" },
  { name: "MDI India Health Care TPA", logo: "mdi" },
  { name: "Med Save Insurance", logo: "medsave" },
  { name: "Medi Assist TPA", logo: "medi" },
  { name: "Medicare Insurance TPA", logo: "medicare" },
  { name: "Paramount Health Care TPA", logo: "paramount" },
  { name: "Raksha TPA", logo: "raksha" },
  { name: "Reliance Health Insurance", logo: "reliancehealth" },
  { name: "Star Health TPA", logo: "starhealth" },
  { name: "TATA AIG General Insurance", logo: "tataaig" },
  { name: "United Health Care TPA", logo: "unitedhealthcare" },
  { name: "Universal Sompo Insurance", logo: "universalsompo" },
  { name: "Vidal Health TPA", logo: "vidal" },
  { name: "Vipul Med Corp TPA", logo: "vipulmedcare" },
];

export default function InsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Care Services"
        title="Insurance providers"
        description="Our Insurance Department has tie-ups with all major insurance companies and Third Party Administrators (TPA). The TPAs have rated us as a preferred provider network hospital."
      />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container className="flex flex-col gap-10">
          <div className="grid gap-4 rounded-2xl bg-brand-grey-50 p-6 sm:grid-cols-2 dark:bg-brand-grey-900">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700 dark:bg-brand-teal-800 dark:text-brand-teal-100">
                <Mail className="h-5 w-5" />
              </span>
              <div className="text-sm text-brand-grey-500 dark:text-brand-grey-400">
                <p className="font-semibold text-brand-teal-900 dark:text-white">Email</p>
                <p>claims@devakihospital.com</p>
                <p>mail@devakihospital.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange-50 text-brand-orange-600 dark:bg-brand-orange-900/40 dark:text-brand-orange-300">
                <Phone className="h-5 w-5" />
              </span>
              <div className="text-sm text-brand-grey-500 dark:text-brand-grey-400">
                <p className="font-semibold text-brand-teal-900 dark:text-white">Phone</p>
                <p>0452-2288830</p>
                <p>+91 97863 23915</p>
              </div>
            </div>
          </div>

          <InsuranceGrid providers={providers} />
        </Container>
      </section>
    </>
  );
}
