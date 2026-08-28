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

/** The full real "Specialities" list from devakihospital.com — all 31 shown directly in the nav dropdown. */
export const departmentNavLinks: NavChild[] = [
  { label: "Accident & Emergency", href: "/departments/accident-emergency" },
  { label: "Anaesthesiology", href: "/departments/anaesthesiology" },
  { label: "Bariatric Surgery", href: "/departments/bariatric-surgery" },
  { label: "Cardiology", href: "/departments/cardiology" },
  { label: "Cardiothoracic and Vascular Surgery", href: "/departments/cardiothoracic-vascular-surgery" },
  { label: "Critical Care & Toxicology", href: "/departments/critical-care-toxicology" },
  { label: "Dental", href: "/departments/dental" },
  { label: "Diabetology", href: "/departments/diabetology" },
  { label: "ENT", href: "/departments/ent" },
  { label: "Family Medicine", href: "/departments/family-medicine" },
  { label: "Gastroenterology", href: "/departments/gastroenterology" },
  { label: "General Medicine", href: "/departments/general-medicine" },
  { label: "General Surgery", href: "/departments/general-surgery" },
  { label: "Imaging Sciences & Interventional Radiology", href: "/departments/imaging-sciences-interventional-radiology" },
  { label: "Medical Oncology", href: "/departments/medical-oncology" },
  { label: "Nephrology", href: "/departments/nephrology" },
  { label: "Neurology", href: "/departments/neurology" },
  { label: "Neuro Surgery", href: "/departments/neuro-surgery" },
  { label: "Obstetrics & Gynaecology", href: "/departments/obstetrics-gynaecology" },
  { label: "Orthopaedics", href: "/departments/orthopaedics" },
  { label: "Pediatric Surgery", href: "/departments/pediatric-surgery" },
  { label: "Pharmacy", href: "/departments/pharmacy" },
  { label: "Psychiatric & Counselling", href: "/departments/psychiatric-counselling" },
  { label: "Physical Medicine & Rehabilitation", href: "/departments/physical-medicine-rehabilitation" },
  { label: "Preventive Medicine", href: "/departments/preventive-medicine" },
  { label: "Pulmonology", href: "/departments/pulmonology" },
  { label: "Radiation Oncology", href: "/departments/radiation-oncology" },
  { label: "Surgery & Surgical Gastroenterology", href: "/departments/surgical-gastroenterology" },
  { label: "Surgical Oncology", href: "/departments/surgical-oncology" },
  { label: "Urology", href: "/departments/urology" },
  { label: "Vascular Surgery", href: "/departments/vascular-surgery" },
];

export const allDepartmentsLink = { label: "View All Specialities", href: "/departments" };

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
