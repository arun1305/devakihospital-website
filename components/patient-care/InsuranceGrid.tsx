"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Provider {
  name: string;
  logo: string;
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function InsuranceGrid({ providers }: { providers: Provider[] }) {
  return (
    <motion.ul
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {providers.map((provider) => (
        <motion.li key={provider.name} variants={cardVariants} className="group relative list-none">
          <motion.div
            className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-brand-teal-400/40 to-brand-orange-400/40 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
          <motion.div
            whileHover={{ y: -8, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex h-40 flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-brand-grey-200 bg-white p-6 shadow-brand-soft transition-shadow duration-300 group-hover:border-transparent group-hover:shadow-brand-glow dark:border-white/10"
          >
            <div className="relative flex h-16 w-full items-center justify-center">
              <Image
                src={`/patient-care/insurance/${provider.logo}.png`}
                alt={provider.name}
                width={200}
                height={200}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="pointer-events-none text-center text-xs font-semibold text-brand-teal-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-brand-teal-200"
            >
              {provider.name}
            </motion.p>
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-green-400 opacity-0 shadow-[0_0_8px_2px_rgba(74,222,128,0.6)] transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
