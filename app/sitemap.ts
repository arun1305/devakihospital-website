import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import {
  getDepartments,
  getDoctors,
  getBlogs,
  getNewsList,
  getEvents,
  getHealthPackages,
  getJobListings,
  getGalleryAlbums,
} from "@/lib/api-server";
import {
  fallbackDepartments,
  fallbackDoctors,
  fallbackBlogs,
  fallbackNews,
  fallbackEvents,
  fallbackHealthPackages,
  fallbackJobListings,
  fallbackGalleryAlbums,
} from "@/lib/fallback-content";

const staticRoutes = [
  "",
  "/about",
  "/departments",
  "/doctors",
  "/appointment",
  "/health-packages",
  "/blog",
  "/news",
  "/events",
  "/gallery",
  "/gallery/virtual-tour",
  "/careers",
  "/faq",
  "/contact",
  "/services",
  "/services/emergency",
  "/services/lab",
  "/services/pharmacy",
  "/services/home-care",
  "/services/telemedicine",
  "/services/international-patients",
  "/services/second-opinion",
  "/patient-resources/visitor-guidelines",
  "/patient-resources/admission-billing",
  "/patient-resources/insurance",
  "/patient-resources/health-library",
  "/patient-resources/patient-rights",
  "/patient-resources/privacy",
];

function entries(paths: string[], changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], priority: number) {
  return paths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [departments, doctors, blogs, news, events, packages, jobs, gallery] = await Promise.all([
    getDepartments("?status=published&limit=100"),
    getDoctors("?status=published&limit=200"),
    getBlogs("&limit=200"),
    getNewsList("&limit=200"),
    getEvents("&limit=200"),
    getHealthPackages("&limit=200"),
    getJobListings("&limit=200"),
    getGalleryAlbums("?limit=200"),
  ]);

  const departmentList = departments.length ? departments : fallbackDepartments;
  const doctorList = doctors.length ? doctors : fallbackDoctors;
  const blogList = blogs.length ? blogs : fallbackBlogs;
  const newsList = news.length ? news : fallbackNews;
  const eventList = events.length ? events : fallbackEvents;
  const packageList = packages.length ? packages : fallbackHealthPackages;
  const jobList = jobs.length ? jobs : fallbackJobListings;
  const galleryList = gallery.length ? gallery : fallbackGalleryAlbums;

  return [
    ...entries(staticRoutes, "weekly", 0.7).map((e) => (e.url === siteConfig.url ? { ...e, changeFrequency: "daily" as const, priority: 1 } : e)),
    ...entries(departmentList.map((d) => `/departments/${d.slug}`), "monthly", 0.8),
    ...entries(doctorList.map((d) => `/doctors/${d.slug}`), "monthly", 0.6),
    ...entries(blogList.map((b) => `/blog/${b.slug}`), "monthly", 0.6),
    ...entries(newsList.map((n) => `/news/${n.slug}`), "monthly", 0.5),
    ...entries(eventList.map((e) => `/events/${e.slug}`), "weekly", 0.5),
    ...entries(packageList.map((p) => `/health-packages/${p.slug}`), "monthly", 0.6),
    ...entries(jobList.map((j) => `/careers/${j.slug}`), "weekly", 0.5),
    ...entries(galleryList.map((g) => `/gallery/${g.slug}`), "monthly", 0.4),
  ];
}
