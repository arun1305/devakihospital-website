export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Department {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  overview: string;
  icon?: string;
  heroImage?: string;
  treatments: string[];
  facilities: string[];
  technology: string[];
  faqs: FaqItem[];
  doctors: Doctor[];
  contactPhone?: string;
  contactEmail?: string;
  order: number;
  seo?: Seo;
}

export interface DaySchedule {
  day: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Doctor {
  _id: string;
  name: string;
  slug: string;
  photo?: string;
  gender: "male" | "female" | "other";
  departments: Department[] | string[];
  designation: string;
  qualifications: string[];
  experienceYears: number;
  languages: string[];
  specializations: string[];
  biography: string;
  publications: string[];
  research: string[];
  awards: string[];
  schedule: DaySchedule[];
  featured: boolean;
  seo?: Seo;
}

export interface Testimonial {
  _id: string;
  patientName: string;
  photo?: string;
  rating: number;
  message: string;
  featured: boolean;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: { name: string; slug: string } | string;
  tags: string[];
  readingTimeMinutes: number;
  publishedAt?: string;
  createdAt: string;
  seo?: Seo;
}

export interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  publishedAt?: string;
  createdAt: string;
}

export interface EventItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  bannerImage?: string;
  registrationEnabled: boolean;
}

export interface HealthPackage {
  _id: string;
  name: string;
  slug: string;
  category: string;
  categoryOrder: number;
  localName?: string;
  tier?: string;
  tierOrder: number;
  popular: boolean;
  price: number;
  discountedPrice?: number;
  description: string;
  inclusions: string[];
  idealFor: string[];
  image?: string;
}

export interface PackageCategoryGroup {
  category: string;
  categoryOrder: number;
  localName?: string;
  packages: HealthPackage[];
}

export interface InsurancePartner {
  _id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface Accreditation {
  _id: string;
  name: string;
  logo: string;
  description?: string;
}

export interface Award {
  _id: string;
  title: string;
  description?: string;
  year: number;
  image?: string;
}

export interface GalleryAlbum {
  _id: string;
  title: string;
  slug: string;
  category: string;
  coverImage?: string;
  images: string[];
  videos: string[];
}

export interface JobListing {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

export interface ApiItemResponse<T> {
  success: boolean;
  data: T;
}
