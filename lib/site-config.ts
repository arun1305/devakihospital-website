export const siteConfig = {
  name: "Devaki Speciality Hospital",
  shortName: "Devaki Hospital",
  tagline: "Quality Healthcare with Humanity",
  description:
    "Devaki Speciality Hospital delivers advanced, multi-speciality healthcare across cardiology, neurology, orthopaedics and more — combining internationally benchmarked clinical technology with compassionate patient care.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  emergencyNumber: "+91 96006 00888",
  appointmentNumber: "+91 96006 00888",
  landlineNumber: "0452-2288800",
  email: "mail@devakihospital.com",
  address: {
    line1: "26, Theni Main Road",
    line2: "Arasaradi",
    city: "Madurai",
    state: "Tamil Nadu",
    postalCode: "625016",
    country: "IN",
  },
  social: {
    facebook: "https://facebook.com/devakihospital",
    instagram: "https://instagram.com/devakihospital",
    linkedin: "https://linkedin.com/company/devakihospital",
    youtube: "https://youtube.com/@devakihospital",
  },
} as const;

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const departmentNavLinks: NavChild[] = [
  { label: "Cardiology", href: "/departments/cardiology", description: "Heart & vascular care" },
  { label: "Neurology", href: "/departments/neurology", description: "Brain, spine & nerves" },
  { label: "Orthopaedics", href: "/departments/orthopaedics", description: "Joints, bones & sports injury" },
  { label: "Gastroenterology", href: "/departments/gastroenterology", description: "Digestive health" },
  { label: "Oncology", href: "/departments/oncology", description: "Cancer care" },
  { label: "Pediatrics", href: "/departments/pediatrics", description: "Child & newborn care" },
];

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Mission & Vision", href: "/about#mission" },
      { label: "Chairman's Message", href: "/about#chairman" },
      { label: "Our Journey", href: "/about#journey" },
      { label: "Infrastructure & Technology", href: "/about#infrastructure" },
      { label: "Awards & Accreditations", href: "/about#awards" },
      { label: "Management Team", href: "/about#management" },
      { label: "CSR", href: "/about#csr" },
    ],
  },
  { label: "Departments", href: "/departments", children: departmentNavLinks },
  { label: "Health Packages", href: "/health-packages" },
  {
    label: "Patient Care",
    href: "/services",
    children: [
      { label: "Emergency & Ambulance", href: "/services/emergency" },
      { label: "International Patients", href: "/services/international-patients" },
      { label: "Second Opinion", href: "/services/second-opinion" },
      { label: "Insurance & TPA", href: "/patient-resources/insurance" },
      { label: "Visitor Guidelines", href: "/patient-resources/visitor-guidelines" },
      { label: "Health Library", href: "/patient-resources/health-library" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const quickAccessLinks = [
  { label: "Departments", href: "/departments", icon: "layout-grid" },
  { label: "Book Appointment", href: "/appointment", icon: "calendar-check" },
  { label: "Health Packages", href: "/health-packages", icon: "heart-pulse" },
  { label: "Contact Us", href: "/contact", icon: "phone-call" },
] as const;
