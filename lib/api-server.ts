import type {
  ApiItemResponse,
  ApiListResponse,
  Department,
  Testimonial,
  BlogPost,
  NewsPost,
  EventItem,
  HealthPackage,
  GalleryAlbum,
  JobListing,
  InsurancePartner,
  Accreditation,
  Award,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

interface FetchOptions {
  revalidate?: number;
  tags?: string[];
}

async function fetchJson<T>(path: string, options: FetchOptions = {}): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: options.revalidate ?? 300, tags: options.tags },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getDepartments(params = ""): Promise<Department[]> {
  const res = await fetchJson<ApiListResponse<Department>>(`/departments${params}`, {
    tags: ["departments"],
  });
  return res?.data ?? [];
}

export async function getDepartmentBySlug(slug: string): Promise<Department | null> {
  const res = await fetchJson<ApiItemResponse<Department>>(`/departments/${slug}`, {
    tags: [`department:${slug}`],
  });
  return res?.data ?? null;
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const res = await fetchJson<ApiListResponse<Testimonial>>(
    `/testimonials?status=published&featured=true&limit=8`,
    { tags: ["testimonials"] }
  );
  return res?.data ?? [];
}

export async function getLatestBlogs(limit = 3): Promise<BlogPost[]> {
  const res = await fetchJson<ApiListResponse<BlogPost>>(
    `/blogs?status=published&limit=${limit}&sort=-publishedAt`,
    { tags: ["blogs"] }
  );
  return res?.data ?? [];
}

export async function getBlogs(params = ""): Promise<BlogPost[]> {
  const res = await fetchJson<ApiListResponse<BlogPost>>(`/blogs?status=published${params}`, {
    tags: ["blogs"],
  });
  return res?.data ?? [];
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetchJson<ApiItemResponse<BlogPost>>(`/blogs/${slug}`, {
    tags: [`blog:${slug}`],
  });
  return res?.data ?? null;
}

export async function getLatestNews(limit = 3): Promise<NewsPost[]> {
  const res = await fetchJson<ApiListResponse<NewsPost>>(
    `/news?status=published&limit=${limit}&sort=-publishedAt`,
    { tags: ["news"] }
  );
  return res?.data ?? [];
}

export async function getNewsList(params = ""): Promise<NewsPost[]> {
  const res = await fetchJson<ApiListResponse<NewsPost>>(`/news?status=published${params}`, {
    tags: ["news"],
  });
  return res?.data ?? [];
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  const res = await fetchJson<ApiItemResponse<NewsPost>>(`/news/${slug}`, {
    tags: [`news:${slug}`],
  });
  return res?.data ?? null;
}

export async function getEvents(params = ""): Promise<EventItem[]> {
  const res = await fetchJson<ApiListResponse<EventItem>>(`/events?status=published${params}`, {
    tags: ["events"],
  });
  return res?.data ?? [];
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const res = await fetchJson<ApiItemResponse<EventItem>>(`/events/${slug}`, {
    tags: [`event:${slug}`],
  });
  return res?.data ?? null;
}

export async function getHealthPackages(params = ""): Promise<HealthPackage[]> {
  const res = await fetchJson<ApiListResponse<HealthPackage>>(`/packages?status=published${params}`, {
    tags: ["packages"],
  });
  return res?.data ?? [];
}

export async function getHealthPackageBySlug(slug: string): Promise<HealthPackage | null> {
  const res = await fetchJson<ApiItemResponse<HealthPackage>>(`/packages/${slug}`, {
    tags: [`package:${slug}`],
  });
  return res?.data ?? null;
}

export async function getGalleryAlbums(params = ""): Promise<GalleryAlbum[]> {
  const res = await fetchJson<ApiListResponse<GalleryAlbum>>(`/gallery${params}`, {
    tags: ["gallery"],
  });
  return res?.data ?? [];
}

export async function getGalleryAlbumBySlug(slug: string): Promise<GalleryAlbum | null> {
  const res = await fetchJson<ApiItemResponse<GalleryAlbum>>(`/gallery/${slug}`, {
    tags: [`gallery:${slug}`],
  });
  return res?.data ?? null;
}

export async function getJobListings(params = ""): Promise<JobListing[]> {
  const res = await fetchJson<ApiListResponse<JobListing>>(`/careers?isActive=true${params}`, {
    tags: ["careers"],
  });
  return res?.data ?? [];
}

export async function getJobBySlug(slug: string): Promise<JobListing | null> {
  const res = await fetchJson<ApiItemResponse<JobListing>>(`/careers/${slug}`, {
    tags: [`job:${slug}`],
  });
  return res?.data ?? null;
}

export async function getInsurancePartners(): Promise<InsurancePartner[]> {
  const res = await fetchJson<ApiListResponse<InsurancePartner>>(`/insurance-partners`, {
    tags: ["insurance"],
  });
  return res?.data ?? [];
}

export async function getAccreditations(): Promise<Accreditation[]> {
  const res = await fetchJson<ApiListResponse<Accreditation>>(`/accreditations`, {
    tags: ["accreditations"],
  });
  return res?.data ?? [];
}

export async function getAwards(): Promise<Award[]> {
  const res = await fetchJson<ApiListResponse<Award>>(`/awards`, { tags: ["awards"] });
  return res?.data ?? [];
}
