import Link from "next/link";
import { GraduationCap, Languages } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getDepartmentIcon } from "@/lib/department-icons";
import type { Doctor } from "@/types";

function initials(name: string) {
  return name
    .replace("Dr.", "")
    .trim()
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const department = Array.isArray(doctor.departments)
    ? (doctor.departments[0] as { name?: string; slug?: string } | string)
    : undefined;
  const departmentName = typeof department === "string" ? undefined : department?.name;
  const departmentSlug = typeof department === "string" ? undefined : department?.slug;
  const DepartmentIcon = getDepartmentIcon(departmentSlug ?? "");

  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-brand-teal-100 to-brand-orange-50 dark:from-brand-teal-800 dark:to-brand-teal-900">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-teal-600 to-brand-teal-800 text-2xl font-bold text-white shadow-brand-soft">
          {initials(doctor.name)}
        </span>
        {doctor.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-brand-orange-500 px-3 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-lg font-bold text-brand-teal-900 dark:text-white">{doctor.name}</h3>
          <p className="text-sm font-medium text-brand-orange-600 dark:text-brand-orange-300">{doctor.designation}</p>
        </div>
        {departmentName && (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-teal-50 px-3 py-1 text-xs font-semibold text-brand-teal-700 dark:bg-brand-teal-800 dark:text-brand-teal-100">
            <DepartmentIcon className="h-3.5 w-3.5" />
            {departmentName}
          </span>
        )}
        <div className="mt-auto flex flex-col gap-1.5 text-xs text-brand-grey-500 dark:text-brand-grey-400">
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" /> {doctor.qualifications.join(", ")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Languages className="h-3.5 w-3.5" /> {doctor.languages.join(", ")}
          </span>
        </div>
        <Link
          href={`/doctors/${doctor.slug}`}
          className="mt-2 inline-flex w-fit items-center text-sm font-semibold text-brand-teal-700 transition-colors group-hover:text-brand-orange-600 dark:text-brand-teal-200 dark:group-hover:text-brand-orange-300"
        >
          View Profile &amp; Book →
        </Link>
      </div>
    </Card>
  );
}
