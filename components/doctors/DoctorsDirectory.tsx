"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { DoctorCard } from "./DoctorCard";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { Department, Doctor } from "@/types";

const experienceBuckets = [
  { label: "Any experience", value: 0 },
  { label: "5+ years", value: 5 },
  { label: "10+ years", value: 10 },
  { label: "15+ years", value: 15 },
];

const selectClasses =
  "w-full rounded-xl border border-brand-grey-200 bg-white px-4 py-2.5 text-sm text-brand-teal-900 outline-none transition-colors focus:border-brand-teal-500 focus:ring-2 focus:ring-brand-teal-100 dark:border-white/15 dark:bg-brand-teal-900 dark:text-white dark:focus:border-brand-teal-400 dark:focus:ring-brand-teal-400/20";

function departmentId(department: Department | string): string {
  return typeof department === "string" ? department : department._id;
}

export function DoctorsDirectory({ doctors, departments }: { doctors: Doctor[]; departments: Department[] }) {
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState(0);
  const [languageFilter, setLanguageFilter] = useState("");

  const languageOptions = useMemo(() => {
    const set = new Set<string>();
    doctors.forEach((doctor) => doctor.languages.forEach((lang) => set.add(lang)));
    return Array.from(set).sort();
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      if (departmentFilter) {
        const matchesDepartment = doctor.departments.some((d) => departmentId(d) === departmentFilter);
        if (!matchesDepartment) return false;
      }
      if (genderFilter && doctor.gender !== genderFilter) return false;
      if (experienceFilter && doctor.experienceYears < experienceFilter) return false;
      if (languageFilter && !doctor.languages.includes(languageFilter)) return false;
      return true;
    });
  }, [doctors, departmentFilter, genderFilter, experienceFilter, languageFilter]);

  const hasActiveFilters = Boolean(departmentFilter || genderFilter || experienceFilter || languageFilter);

  function clearFilters() {
    setDepartmentFilter("");
    setGenderFilter("");
    setExperienceFilter(0);
    setLanguageFilter("");
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 rounded-3xl bg-brand-grey-50 p-6 dark:bg-brand-grey-900">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-teal-900 dark:text-white">
            <SlidersHorizontal className="h-4 w-4" /> Filter Doctors
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-orange-600 hover:text-brand-orange-700 dark:text-brand-orange-300 dark:hover:text-brand-orange-200"
            >
              <X className="h-3.5 w-3.5" /> Clear filters
            </button>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <select
            className={selectClasses}
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            aria-label="Filter by department"
          >
            <option value="">All Departments</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>

          <select
            className={selectClasses}
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            aria-label="Filter by gender"
          >
            <option value="">Any Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <select
            className={selectClasses}
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(Number(e.target.value))}
            aria-label="Filter by experience"
          >
            {experienceBuckets.map((bucket) => (
              <option key={bucket.value} value={bucket.value}>
                {bucket.label}
              </option>
            ))}
          </select>

          <select
            className={selectClasses}
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            aria-label="Filter by language"
          >
            <option value="">Any Language</option>
            {languageOptions.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-brand-grey-500 dark:text-brand-grey-400">
        Showing {filteredDoctors.length} of {doctors.length} doctors
      </p>

      {filteredDoctors.length > 0 ? (
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor, index) => (
            <RevealOnScroll as="li" key={doctor._id} delay={Math.min(index, 6) * 0.04} className="list-none">
              <DoctorCard doctor={doctor} />
            </RevealOnScroll>
          ))}
        </StaggerGroup>
      ) : (
        <div className="rounded-3xl bg-brand-grey-50 py-16 text-center text-sm text-brand-grey-400 dark:bg-brand-grey-900 dark:text-brand-grey-500">
          No doctors match these filters. Try broadening your search.
        </div>
      )}
    </div>
  );
}
