import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { FacebookIcon, InstagramIcon, LinkedInIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { Container } from "@/components/ui/Container";
import { siteConfig, departmentNavLinks } from "@/lib/site-config";

const footerColumns = [
  {
    title: "Hospital",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Doctors", href: "/doctors" },
      { label: "Departments", href: "/departments" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "News & Events", href: "/news" },
    ],
  },
  {
    title: "Patient Care",
    links: [
      { label: "Book Appointment", href: "/appointment" },
      { label: "Health Packages", href: "/health-packages" },
      { label: "International Patients", href: "/services/international-patients" },
      { label: "Insurance & TPA", href: "/patient-resources/insurance" },
      { label: "Visitor Guidelines", href: "/patient-resources/visitor-guidelines" },
      { label: "Patient Rights", href: "/patient-resources/patient-rights" },
    ],
  },
  {
    title: "Departments",
    links: departmentNavLinks.slice(0, 6),
  },
];

const socialLinks = [
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: LinkedInIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: YoutubeIcon, href: siteConfig.social.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-teal-900 text-white">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand-teal-500/30 blur-3xl" />

      <Container className="relative grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Logo tone="light" />
          <p className="max-w-sm text-sm leading-relaxed text-white/70">{siteConfig.description}</p>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-orange-300" />
              {siteConfig.address.line1}, {siteConfig.address.line2}, {siteConfig.address.city} –{" "}
              {siteConfig.address.postalCode}
            </span>
            <a href={`tel:${siteConfig.appointmentNumber}`} className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-orange-300" />
              {siteConfig.appointmentNumber}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-orange-300" />
              {siteConfig.email}
            </a>
          </div>
          <div className="flex gap-3 pt-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-orange-500"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-orange-300">
              {column.title}
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-white/75">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="relative border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/patient-resources/privacy">Privacy Policy</Link>
            <Link href="/patient-resources/patient-rights">Patient Rights</Link>
            <Link href="/contact">Sitemap</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
