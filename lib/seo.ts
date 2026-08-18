import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import type { Department, Doctor, FaqItem } from "@/types";

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function buildMetadata({ title, description, path, image, keywords, noIndex }: BuildMetadataArgs): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? "/og-image.jpg";

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    telephone: siteConfig.appointmentNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    sameAs: Object.values(siteConfig.social),
    medicalSpecialty: ["Cardiology", "Neurology", "Orthopaedics", "Oncology", "Pediatrics"],
  };
}

export function departmentJsonLd(department: Department) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: `${department.name} | ${siteConfig.name}`,
    medicalSpecialty: department.name,
    url: `${siteConfig.url}/departments/${department.slug}`,
    description: department.shortDescription,
    parentOrganization: {
      "@type": "Hospital",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function doctorJsonLd(doctor: Doctor) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    url: `${siteConfig.url}/doctors/${doctor.slug}`,
    image: doctor.photo,
    jobTitle: doctor.designation,
    medicalSpecialty: doctor.specializations,
    worksFor: {
      "@type": "Hospital",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function faqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function articleJsonLd(args: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: args.headline,
    description: args.description,
    url: `${siteConfig.url}${args.path}`,
    image: args.image,
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: { "@type": "Organization", name: args.authorName ?? siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}
