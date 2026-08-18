"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, Phone, CalendarCheck } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav } from "@/lib/site-config";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass-panel shadow-brand-soft" : "bg-white/40"
      )}
    >
      <Container className="flex items-center justify-between gap-3 py-3">
        <Link href="/" aria-label={siteConfig.name} className="shrink-0">
          <Logo compact />
        </Link>

        {/* shrink-0 (not min-w-0): the links inside don't shrink, so letting
            this box collapse below its content makes them overflow into the
            CTA group and overlap it. */}
        <nav
          className="hidden shrink-0 items-center gap-0.5 xl:flex"
          onMouseLeave={() => setOpenMenu(null)}
        >
          {mainNav.map((item) => (
            <div key={item.label} className="relative shrink-0" onMouseEnter={() => setOpenMenu(item.label)}>
              <Link
                href={item.href}
                className="flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-2 text-sm font-semibold text-brand-teal-900 transition-colors hover:bg-brand-teal-50 hover:text-brand-teal-700"
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 shrink-0" />}
              </Link>

              <AnimatePresence>
                {item.children && openMenu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full grid w-72 gap-1 rounded-2xl border border-brand-grey-200 bg-white p-3 shadow-brand-soft"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-brand-teal-50"
                      >
                        <span className="block font-semibold text-brand-teal-900">{child.label}</span>
                        {child.description && (
                          <span className="block text-xs text-brand-grey-500">{child.description}</span>
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <a
            href={`tel:${siteConfig.emergencyNumber}`}
            aria-label={`Call emergency: ${siteConfig.emergencyNumber}`}
            title={`Emergency: ${siteConfig.emergencyNumber}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange-50 text-brand-orange-600 transition-colors hover:bg-brand-orange-100"
          >
            <Phone className="h-4 w-4" />
          </a>
          <Button href="/appointment" size="sm" icon={<CalendarCheck className="h-4 w-4" />} className="whitespace-nowrap">
            Book Appointment
          </Button>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-brand-teal-900 xl:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-brand-grey-200 bg-white xl:hidden"
          >
            <Container className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto py-4">
              {mainNav.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-3 py-2.5 font-semibold text-brand-teal-900"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-3 flex flex-col gap-1 border-l border-brand-grey-200 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm text-brand-grey-500"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button href="/appointment" className="mt-3 justify-center">
                Book Appointment
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
