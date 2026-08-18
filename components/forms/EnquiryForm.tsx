"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitEnquiry, type EnquiryPayload } from "@/lib/api-client";

const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(8, "Enter a valid phone number."),
  message: z.string().min(10, "Please share a few more details."),
});

type EnquiryValues = z.infer<typeof enquirySchema>;

const inputClasses =
  "w-full rounded-xl border border-brand-grey-200 bg-white px-4 py-3 text-sm text-brand-teal-900 outline-none transition-colors focus:border-brand-teal-500 focus:ring-2 focus:ring-brand-teal-100";

export function EnquiryForm({
  type,
  title,
  messagePlaceholder,
  successMessage,
}: {
  type: EnquiryPayload["type"];
  title: string;
  messagePlaceholder: string;
  successMessage: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryValues>({ resolver: zodResolver(enquirySchema) });

  const mutation = useMutation({
    mutationFn: (values: EnquiryValues) => submitEnquiry({ type, ...values }),
    onSuccess: () => {
      setSubmitted(true);
      reset();
    },
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-brand-teal-50 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-brand-teal-600" />
        <h3 className="font-bold text-brand-teal-900">Request received</h3>
        <p className="text-sm text-brand-grey-500">{successMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-brand-soft ring-1 ring-brand-grey-200/70"
      noValidate
    >
      <h3 className="font-bold text-brand-teal-900">{title}</h3>
      <input className={inputClasses} placeholder="Full Name" {...register("name")} />
      {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
      <input className={inputClasses} type="email" placeholder="Email Address" {...register("email")} />
      {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      <input className={inputClasses} placeholder="Phone Number (with country code)" {...register("phone")} />
      {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
      <textarea className={inputClasses} rows={4} placeholder={messagePlaceholder} {...register("message")} />
      {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}

      {mutation.isError && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}

      <Button type="submit" size="lg" className="w-full justify-center" disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        {mutation.isPending ? "Sending..." : "Submit Request"}
      </Button>
    </form>
  );
}
