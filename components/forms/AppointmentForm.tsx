"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { CalendarCheck, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitAppointment } from "@/lib/api-client";
import type { Department } from "@/types";

const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM"];

const appointmentSchema = z.object({
  patientName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(8, "Enter a valid phone number."),
  department: z.string().min(1, "Please select a department."),
  preferredDate: z.string().min(1, "Please select a preferred date."),
  preferredTimeSlot: z.string().min(1, "Please select a time slot."),
  message: z.string().max(1000).optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

const inputClasses =
  "w-full rounded-xl border border-brand-grey-200 bg-white px-4 py-3 text-sm text-brand-teal-900 outline-none transition-colors focus:border-brand-teal-500 focus:ring-2 focus:ring-brand-teal-100";

export function AppointmentForm({ departments }: { departments: Department[] }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormValues>({ resolver: zodResolver(appointmentSchema) });

  const mutation = useMutation({
    mutationFn: submitAppointment,
    onSuccess: () => {
      setSubmitted(true);
      reset();
    },
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-brand-teal-50 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-teal-600" />
        <h3 className="text-xl font-bold text-brand-teal-900">Appointment request received</h3>
        <p className="max-w-sm text-sm text-brand-grey-500">
          Our patient care team will call you shortly to confirm your slot. For urgent needs, please call our
          emergency line directly.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Book Another Appointment
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      className="grid gap-5 rounded-3xl bg-white p-8 shadow-brand-soft ring-1 ring-brand-grey-200/70 sm:grid-cols-2"
      noValidate
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-brand-teal-900">Full Name</label>
        <input className={inputClasses} placeholder="Your full name" {...register("patientName")} />
        {errors.patientName && <p className="text-xs text-red-600">{errors.patientName.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-brand-teal-900">Phone Number</label>
        <input className={inputClasses} placeholder="+91 98765 43210" {...register("phone")} />
        {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-sm font-semibold text-brand-teal-900">Email Address</label>
        <input className={inputClasses} type="email" placeholder="you@example.com" {...register("email")} />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-brand-teal-900">Department</label>
        <select className={inputClasses} defaultValue="" {...register("department")}>
          <option value="" disabled>
            Select a department
          </option>
          {departments.map((department) => (
            <option key={department._id} value={department._id}>
              {department.name}
            </option>
          ))}
        </select>
        {errors.department && <p className="text-xs text-red-600">{errors.department.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-brand-teal-900">Preferred Date</label>
        <input
          className={inputClasses}
          type="date"
          min={new Date().toISOString().split("T")[0]}
          {...register("preferredDate")}
        />
        {errors.preferredDate && <p className="text-xs text-red-600">{errors.preferredDate.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-sm font-semibold text-brand-teal-900">Preferred Time</label>
        <div className="flex flex-wrap gap-2">
          {timeSlots.map((slot) => (
            <label
              key={slot}
              className="cursor-pointer rounded-full border border-brand-grey-200 px-4 py-2 text-sm has-[:checked]:border-brand-teal-600 has-[:checked]:bg-brand-teal-50 has-[:checked]:text-brand-teal-700"
            >
              <input type="radio" value={slot} className="sr-only" {...register("preferredTimeSlot")} />
              {slot}
            </label>
          ))}
        </div>
        {errors.preferredTimeSlot && <p className="text-xs text-red-600">{errors.preferredTimeSlot.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-sm font-semibold text-brand-teal-900">Additional Notes (optional)</label>
        <textarea className={inputClasses} rows={3} placeholder="Briefly describe your symptoms or concern" {...register("message")} />
      </div>

      {mutation.isError && (
        <p className="text-sm text-red-600 sm:col-span-2">
          Something went wrong submitting your request. Please try again or call us directly.
        </p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full justify-center" disabled={mutation.isPending}>
          {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <CalendarCheck className="h-5 w-5" />}
          {mutation.isPending ? "Submitting..." : "Request Appointment"}
        </Button>
      </div>
    </form>
  );
}
