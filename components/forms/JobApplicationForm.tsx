"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Send, Loader2, CheckCircle2, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { applyToJob } from "@/lib/api-client";

const MAX_RESUME_MB = 10;

const applicationSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(8, "Enter a valid phone number."),
  coverLetter: z.string().max(2000).optional(),
  // `FileList` is a browser-only global; referencing it directly at module
  // scope (e.g. z.instanceof(FileList)) crashes Next's server-side render
  // pass. z.custom defers evaluation to inside the validator function.
  resume: z
    .custom<FileList>((val) => typeof FileList !== "undefined" && val instanceof FileList, {
      message: "Please attach your resume.",
    })
    .refine((files) => files.length === 1, "Please attach your resume.")
    .refine((files) => files[0]?.size <= MAX_RESUME_MB * 1024 * 1024, `Resume must be under ${MAX_RESUME_MB}MB.`),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

const inputClasses =
  "w-full rounded-xl border border-brand-grey-200 bg-white px-4 py-3 text-sm text-brand-teal-900 outline-none transition-colors focus:border-brand-teal-500 focus:ring-2 focus:ring-brand-teal-100";

export function JobApplicationForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationValues>({ resolver: zodResolver(applicationSchema) });

  const mutation = useMutation({
    mutationFn: (values: ApplicationValues) =>
      applyToJob(jobId, {
        name: values.name,
        email: values.email,
        phone: values.phone,
        coverLetter: values.coverLetter,
        resume: values.resume[0],
      }),
    onSuccess: () => {
      setSubmitted(true);
      reset();
    },
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-brand-teal-50 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-brand-teal-600" />
        <h3 className="font-bold text-brand-teal-900">Application submitted</h3>
        <p className="text-sm text-brand-grey-500">
          Thanks for applying to {jobTitle}. Our HR team will review your application and reach out if there&rsquo;s a match.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-brand-soft ring-1 ring-brand-grey-200/70"
      noValidate
    >
      <h3 className="font-bold text-brand-teal-900">Apply for this role</h3>
      <input className={inputClasses} placeholder="Full Name" {...register("name")} />
      {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
      <input className={inputClasses} type="email" placeholder="Email Address" {...register("email")} />
      {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      <input className={inputClasses} placeholder="Phone Number" {...register("phone")} />
      {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}

      <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-brand-grey-300 px-4 py-3 text-sm text-brand-grey-500 hover:border-brand-teal-400">
        <Paperclip className="h-4 w-4" />
        <span>Attach Resume (PDF, max {MAX_RESUME_MB}MB)</span>
        <input type="file" accept=".pdf,application/pdf" className="hidden" {...register("resume")} />
      </label>
      {errors.resume && <p className="text-xs text-red-600">{errors.resume.message as string}</p>}

      <textarea className={inputClasses} rows={3} placeholder="Cover note (optional)" {...register("coverLetter")} />

      {mutation.isError && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}

      <Button type="submit" size="lg" className="w-full justify-center" disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        {mutation.isPending ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
