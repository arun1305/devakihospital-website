"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { motion, type Variants } from "framer-motion";
import { CalendarCheck, Loader2, CheckCircle2, User, Phone, Mail, Building2, CalendarDays, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitAppointment } from "@/lib/api-client";
import { cn } from "@/lib/utils";
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

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

function glassInputClasses(hasIcon = true) {
  return cn(
    "w-full rounded-xl border border-brand-grey-200/80 bg-white/70 py-3 text-sm text-brand-teal-900 outline-none backdrop-blur-sm transition-all duration-300",
    "placeholder:text-brand-grey-400 focus:border-brand-teal-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(28,100,89,0.1)]",
    "dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-brand-grey-500 dark:focus:border-brand-teal-400 dark:focus:bg-white/10 dark:focus:shadow-[0_0_0_4px_rgba(71,151,140,0.15)]",
    hasIcon ? "pl-11 pr-4" : "px-4"
  );
}

function FieldIcon({ icon: Icon }: { icon: typeof User }) {
  return (
    <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-teal-500/70 transition-colors duration-300 peer-focus:text-brand-teal-600 dark:text-brand-grey-400 dark:peer-focus:text-brand-teal-300" />
  );
}

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
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-4 rounded-3xl bg-brand-teal-50 p-10 text-center dark:bg-brand-teal-900"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
        >
          <CheckCircle2 className="h-12 w-12 text-brand-teal-600 dark:text-brand-teal-300" />
        </motion.div>
        <h3 className="text-xl font-bold text-brand-teal-900 dark:text-white">Appointment request received</h3>
        <p className="max-w-sm text-sm text-brand-grey-500 dark:text-brand-grey-400">
          Our patient care team will call you shortly to confirm your slot. For urgent needs, please call our
          emergency line directly.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Book Another Appointment
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <motion.div
        className="absolute -inset-8 -z-10 rounded-[2.75rem] bg-gradient-to-br from-brand-teal-400/45 via-brand-orange-300/30 to-brand-orange-400/40 blur-3xl"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <div className="rounded-[2rem] bg-gradient-to-br from-brand-teal-400/80 via-white/60 to-brand-orange-400/80 p-[1.5px] shadow-brand-glow dark:from-brand-teal-400/40 dark:via-white/10 dark:to-brand-orange-400/40">
      <motion.form
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
        className="relative grid gap-5 overflow-hidden rounded-[calc(2rem-1.5px)] bg-white/95 p-8 backdrop-blur-xl dark:bg-brand-teal-950/90 sm:grid-cols-2"
        noValidate
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fieldVariants} className="mb-1 flex items-center gap-3 sm:col-span-2">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-700 text-white shadow-brand-soft">
            <CalendarCheck className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-brand-teal-900 dark:text-white">Appointment details</h3>
            <p className="text-xs text-brand-grey-500 dark:text-brand-grey-400">Takes less than a minute to fill out.</p>
          </div>
        </motion.div>

        <motion.div variants={fieldVariants} className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-brand-teal-900 dark:text-white">Full Name</label>
          <div className="relative">
            <FieldIcon icon={User} />
            <input className={cn(glassInputClasses(), "peer")} placeholder="Your full name" {...register("patientName")} />
          </div>
          {errors.patientName && <p className="text-xs text-red-600 dark:text-red-400">{errors.patientName.message}</p>}
        </motion.div>

        <motion.div variants={fieldVariants} className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-brand-teal-900 dark:text-white">Phone Number</label>
          <div className="relative">
            <FieldIcon icon={Phone} />
            <input className={cn(glassInputClasses(), "peer")} placeholder="+91 98765 43210" {...register("phone")} />
          </div>
          {errors.phone && <p className="text-xs text-red-600 dark:text-red-400">{errors.phone.message}</p>}
        </motion.div>

        <motion.div variants={fieldVariants} className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-sm font-semibold text-brand-teal-900 dark:text-white">Email Address</label>
          <div className="relative">
            <FieldIcon icon={Mail} />
            <input className={cn(glassInputClasses(), "peer")} type="email" placeholder="you@example.com" {...register("email")} />
          </div>
          {errors.email && <p className="text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>}
        </motion.div>

        <motion.div variants={fieldVariants} className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-brand-teal-900 dark:text-white">Department</label>
          <div className="relative">
            <FieldIcon icon={Building2} />
            <select className={cn(glassInputClasses(), "peer appearance-none")} defaultValue="" {...register("department")}>
              <option value="" disabled>
                Select a department
              </option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          {errors.department && <p className="text-xs text-red-600 dark:text-red-400">{errors.department.message}</p>}
        </motion.div>

        <motion.div variants={fieldVariants} className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-brand-teal-900 dark:text-white">Preferred Date</label>
          <div className="relative">
            <FieldIcon icon={CalendarDays} />
            <input
              className={cn(glassInputClasses(), "peer dark:[color-scheme:dark]")}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("preferredDate")}
            />
          </div>
          {errors.preferredDate && <p className="text-xs text-red-600 dark:text-red-400">{errors.preferredDate.message}</p>}
        </motion.div>

        <motion.div variants={fieldVariants} className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-sm font-semibold text-brand-teal-900 dark:text-white">Preferred Time</label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => (
              <label
                key={slot}
                className="cursor-pointer rounded-full border border-brand-grey-200/80 bg-white/60 px-4 py-2 text-sm backdrop-blur-sm transition-all duration-200 has-[:checked]:border-brand-teal-600 has-[:checked]:bg-brand-teal-50 has-[:checked]:text-brand-teal-700 has-[:checked]:shadow-[0_0_0_4px_rgba(28,100,89,0.1)] dark:border-white/10 dark:bg-white/5 dark:text-white dark:has-[:checked]:border-brand-teal-400 dark:has-[:checked]:bg-brand-teal-800 dark:has-[:checked]:text-brand-teal-100"
              >
                <input type="radio" value={slot} className="sr-only" {...register("preferredTimeSlot")} />
                {slot}
              </label>
            ))}
          </div>
          {errors.preferredTimeSlot && <p className="text-xs text-red-600 dark:text-red-400">{errors.preferredTimeSlot.message}</p>}
        </motion.div>

        <motion.div variants={fieldVariants} className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-sm font-semibold text-brand-teal-900 dark:text-white">Additional Notes (optional)</label>
          <div className="relative">
              <MessageSquare className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-brand-teal-500/70 transition-colors duration-300 peer-focus:text-brand-teal-600 dark:text-brand-grey-400 dark:peer-focus:text-brand-teal-300" />
            <textarea
              className={cn(glassInputClasses(), "peer resize-none pt-3.5")}
              rows={3}
              placeholder="Briefly describe your symptoms or concern"
              {...register("message")}
            />
          </div>
        </motion.div>

        {mutation.isError && (
          <motion.p variants={fieldVariants} className="text-sm text-red-600 dark:text-red-400 sm:col-span-2">
            Something went wrong submitting your request. Please try again or call us directly.
          </motion.p>
        )}

        <motion.div variants={fieldVariants} className="sm:col-span-2">
          <Button type="submit" size="lg" className="btn-shine w-full justify-center" disabled={mutation.isPending}>
            {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <CalendarCheck className="h-5 w-5" />}
            {mutation.isPending ? "Submitting..." : "Request Appointment"}
          </Button>
        </motion.div>
      </motion.form>
      </div>
    </motion.div>
  );
}
