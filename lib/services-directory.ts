export interface ServiceSummary {
  slug: string;
  title: string;
  description: string;
}

export const servicesDirectory: ServiceSummary[] = [
  { slug: "emergency", title: "Emergency & Ambulance", description: "24/7 emergency care and rapid-response ambulance dispatch." },
  { slug: "lab", title: "Laboratory Services", description: "Accredited diagnostic lab with fast, accurate reporting." },
  { slug: "pharmacy", title: "Pharmacy", description: "In-house pharmacy stocked with prescription and OTC medication." },
  { slug: "home-care", title: "Home Care", description: "Skilled nursing and post-treatment care in the comfort of home." },
  { slug: "telemedicine", title: "Telemedicine", description: "Video consultations with our specialists from anywhere." },
  { slug: "international-patients", title: "International Patients", description: "End-to-end treatment coordination for patients travelling from abroad." },
  { slug: "second-opinion", title: "Second Opinion", description: "An independent specialist review of your diagnosis or treatment plan." },
];
