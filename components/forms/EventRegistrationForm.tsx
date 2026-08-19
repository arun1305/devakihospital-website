"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { CalendarCheck, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { registerForEvent } from "@/lib/api-client";

const registrationSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(8, "Enter a valid phone number."),
});

type RegistrationValues = z.infer<typeof registrationSchema>;

const inputClasses =
  "w-full rounded-xl border border-brand-grey-200 bg-white px-4 py-3 text-sm text-brand-teal-900 outline-none transition-colors placeholder:text-brand-grey-400 focus:border-brand-teal-500 focus:ring-2 focus:ring-brand-teal-100 dark:border-white/15 dark:bg-brand-teal-900 dark:text-white dark:placeholder:text-brand-grey-500 dark:focus:border-brand-teal-400 dark:focus:ring-brand-teal-400/20";

export function EventRegistrationForm({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationValues>({ resolver: zodResolver(registrationSchema) });

  const mutation = useMutation({
    mutationFn: (values: RegistrationValues) => registerForEvent(eventId, values),
    onSuccess: () => {
      setSubmitted(true);
      reset();
    },
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-brand-teal-50 p-8 text-center dark:bg-brand-teal-900">
        <CheckCircle2 className="h-10 w-10 text-brand-teal-600 dark:text-brand-teal-300" />
        <h3 className="font-bold text-brand-teal-900 dark:text-white">You&rsquo;re registered!</h3>
        <p className="text-sm text-brand-grey-500 dark:text-brand-grey-400">We look forward to seeing you at {eventTitle}.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-brand-soft ring-1 ring-brand-grey-200/70 dark:bg-brand-teal-900 dark:ring-white/10"
      noValidate
    >
      <h3 className="font-bold text-brand-teal-900 dark:text-white">Register for this event</h3>
      <input className={inputClasses} placeholder="Full Name" {...register("name")} />
      {errors.name && <p className="text-xs text-red-600 dark:text-red-400">{errors.name.message}</p>}
      <input className={inputClasses} type="email" placeholder="Email Address" {...register("email")} />
      {errors.email && <p className="text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>}
      <input className={inputClasses} placeholder="Phone Number" {...register("phone")} />
      {errors.phone && <p className="text-xs text-red-600 dark:text-red-400">{errors.phone.message}</p>}

      {mutation.isError && <p className="text-sm text-red-600 dark:text-red-400">Something went wrong. Please try again.</p>}

      <Button type="submit" size="lg" className="w-full justify-center" disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <CalendarCheck className="h-5 w-5" />}
        {mutation.isPending ? "Registering..." : "Register Now"}
      </Button>
    </form>
  );
}
