"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { motion, type Variants } from "framer-motion";
import { Send, Loader2, CheckCircle2, User, Phone, Mail, Tag, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitEnquiry } from "@/lib/api-client";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(8, "Enter a valid phone number."),
  subject: z.string().optional(),
  message: z.string().min(10, "Please share a few more details."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
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
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={
          embedded
            ? "flex flex-col items-center gap-3 rounded-2xl bg-brand-teal-50 p-6 text-center dark:bg-brand-teal-900"
            : "flex flex-col items-center gap-4 rounded-3xl bg-brand-teal-50 p-10 text-center dark:bg-brand-teal-900"
        }
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
        >
          <CheckCircle2 className="h-10 w-10 text-brand-teal-600 dark:text-brand-teal-300" />
        </motion.div>
        <h3 className="text-lg font-bold text-brand-teal-900 dark:text-white">Message sent</h3>
        <p className="max-w-sm text-sm text-brand-grey-500 dark:text-brand-grey-400">
          Thanks for reaching out — our team typically responds within one business day.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  const fields = (
    <>
      <motion.div variants={fieldVariants} className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-brand-teal-900 dark:text-white">Full Name</label>
        <div className="relative">
          <FieldIcon icon={User} />
          <input className={cn(glassInputClasses(), "peer")} {...register("name")} />
        </div>
        {errors.name && <p className="text-xs text-red-600 dark:text-red-400">{errors.name.message}</p>}
      </motion.div>

      <motion.div variants={fieldVariants} className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-brand-teal-900 dark:text-white">Phone Number</label>
        <div className="relative">
          <FieldIcon icon={Phone} />
          <input className={cn(glassInputClasses(), "peer")} {...register("phone")} />
        </div>
        {errors.phone && <p className="text-xs text-red-600 dark:text-red-400">{errors.phone.message}</p>}
      </motion.div>

      <motion.div variants={fieldVariants} className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-sm font-semibold text-brand-teal-900 dark:text-white">Email Address</label>
        <div className="relative">
          <FieldIcon icon={Mail} />
          <input className={cn(glassInputClasses(), "peer")} type="email" {...register("email")} />
        </div>
        {errors.email && <p className="text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>}
      </motion.div>

      <motion.div variants={fieldVariants} className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-sm font-semibold text-brand-teal-900 dark:text-white">Subject</label>
        <div className="relative">
          <FieldIcon icon={Tag} />
          <input className={cn(glassInputClasses(), "peer")} {...register("subject")} />
        </div>
      </motion.div>

      <motion.div variants={fieldVariants} className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-sm font-semibold text-brand-teal-900 dark:text-white">Message</label>
        <div className="relative">
          <MessageSquare className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-brand-teal-500/70 transition-colors duration-300 peer-focus:text-brand-teal-600 dark:text-brand-grey-400 dark:peer-focus:text-brand-teal-300" />
          <textarea className={cn(glassInputClasses(), "peer resize-none pt-3.5")} rows={4} {...register("message")} />
        </div>
        {errors.message && <p className="text-xs text-red-600 dark:text-red-400">{errors.message.message}</p>}
      </motion.div>

      {mutation.isError && (
        <motion.p variants={fieldVariants} className="text-sm text-red-600 dark:text-red-400 sm:col-span-2">
          Something went wrong. Please try again shortly.
        </motion.p>
      )}

      <motion.div variants={fieldVariants} className="sm:col-span-2">
        <Button
          type="submit"
          size="lg"
          className="btn-shine w-full justify-center"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          {mutation.isPending ? "Sending..." : "Send Message"}
        </Button>
      </motion.div>
    </>
  );

  if (embedded) {
    return (
      <motion.form
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
        className="grid gap-4 sm:grid-cols-2"
        noValidate
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {fields}
      </motion.form>
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
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-teal-400/40 via-brand-orange-300/25 to-brand-orange-400/35 blur-3xl"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.form
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
        className="relative grid gap-5 overflow-hidden rounded-3xl border border-white/80 bg-white/80 p-8 shadow-brand-glow ring-1 ring-brand-teal-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-brand-teal-950/80 dark:ring-white/10 sm:grid-cols-2"
        noValidate
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20" />
        {fields}
      </motion.form>
    </motion.div>
  );
}
