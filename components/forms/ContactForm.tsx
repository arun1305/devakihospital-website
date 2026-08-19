"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitEnquiry } from "@/lib/api-client";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(8, "Enter a valid phone number."),
  subject: z.string().optional(),
  message: z.string().min(10, "Please share a few more details."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputClasses =
  "w-full rounded-xl border border-brand-grey-200 bg-white px-4 py-3 text-sm text-brand-teal-900 outline-none transition-colors focus:border-brand-teal-500 focus:ring-2 focus:ring-brand-teal-100";

export function ContactForm({ embedded = false }: { embedded?: boolean } = {}) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const mutation = useMutation({
    mutationFn: (values: ContactFormValues) => submitEnquiry({ type: "contact", ...values }),
    onSuccess: () => {
      setSubmitted(true);
      reset();
    },
  });

  if (submitted) {
    return (
      <div
        className={
          embedded
            ? "flex flex-col items-center gap-3 rounded-2xl bg-brand-teal-50 p-6 text-center"
            : "flex flex-col items-center gap-4 rounded-3xl bg-brand-teal-50 p-10 text-center"
        }
      >
        <CheckCircle2 className="h-10 w-10 text-brand-teal-600" />
        <h3 className="text-lg font-bold text-brand-teal-900">Message sent</h3>
        <p className="max-w-sm text-sm text-brand-grey-500">
          Thanks for reaching out — our team typically responds within one business day.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      className={
        embedded
          ? "grid gap-4 sm:grid-cols-2"
          : "grid gap-5 rounded-3xl bg-white p-8 shadow-brand-soft ring-1 ring-brand-grey-200/70 sm:grid-cols-2"
      }
      noValidate
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-brand-teal-900">Full Name</label>
        <input className={inputClasses} {...register("name")} />
        {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-brand-teal-900">Phone Number</label>
        <input className={inputClasses} {...register("phone")} />
        {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
      </div>
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-sm font-semibold text-brand-teal-900">Email Address</label>
        <input className={inputClasses} type="email" {...register("email")} />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-sm font-semibold text-brand-teal-900">Subject</label>
        <input className={inputClasses} {...register("subject")} />
      </div>
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-sm font-semibold text-brand-teal-900">Message</label>
        <textarea className={inputClasses} rows={4} {...register("message")} />
        {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
      </div>

      {mutation.isError && (
        <p className="text-sm text-red-600 sm:col-span-2">Something went wrong. Please try again shortly.</p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full justify-center" disabled={mutation.isPending}>
          {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          {mutation.isPending ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
