import type { Metadata } from "next";
import { Clock, CreditCard, Wallet, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Billing Policy",
  description: "Billing cycle, discharge timing, and payment methods at Devaki Speciality Hospital.",
  path: "/patient-resources/billing-policy",
});

const policyPoints = [
  {
    icon: Clock,
    title: "Billing Cycle & Discharge",
    description:
      "The billing cycle runs from midnight to midnight, subject to a minimum of one day's rent. If you vacate by 2 PM on the day of discharge, no room charge is levied for that day. Vacating by 6 PM incurs a half-day room charge; beyond 6 PM, a full day is charged. Discharge timing depends on when the discharge summary is signed and the bill is settled, and can vary with doctor availability.",
  },
  {
    icon: Wallet,
    title: "Advance Payments",
    description:
      "Payments are to be made in advance. Whenever an advance deposit is requested, please pay promptly to avoid delays in your care.",
  },
  {
    icon: CreditCard,
    title: "Payment Methods",
    description:
      "Cash is accepted up to ₹2 lakhs per admission-to-discharge period. Amounts of ₹2 lakhs and above must be paid via RTGS/NEFT/IMPS or another approved transfer method. Card, Google Pay, PhonePe, and UPI are also accepted. Any excess amount is refunded only via credit to the payer's bank account — please share your IFSC code, account number, and bank/branch details at the bill counter.",
  },
  {
    icon: PhoneCall,
    title: "Billing Queries",
    description: "For any billing questions, please contact the Billing In-Charge or the Senior Manager, Finance.",
  },
];

export default function BillingPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Care Services"
        title="Billing policy"
        description="A clear overview of our billing cycle, discharge timing, and accepted payment methods."
      />
      <section className="bg-white py-20 dark:bg-brand-teal-950">
        <Container>
          <StaggerGroup className="grid gap-6 sm:grid-cols-2">
            {policyPoints.map(({ icon: Icon, title, description }, index) => (
              <RevealOnScroll as="li" key={title} delay={index * 0.06} className="list-none">
                <Card className="flex h-full flex-col gap-3 p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal-50 text-brand-teal-700 dark:bg-brand-teal-800 dark:text-brand-teal-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="font-bold text-brand-teal-900 dark:text-white">{title}</h2>
                  <p className="text-sm leading-relaxed text-brand-grey-500 dark:text-brand-grey-400">{description}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
