"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !isHome || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-out",
        solid ? "bg-ivory/90 backdrop-blur-md border-b border-line" : "bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between md:h-24">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-ink md:text-xl"
          aria-label={`${siteConfig.name} — Αρχική`}
        >
          Biokarpet <span className="text-oak-600">Candia</span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Κύριο μενού">
          {siteConfig.nav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="text-sm font-medium tracking-wide text-ink-700 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
              {"children" in item && item.children && (
                <div className="pointer-events-none absolute left-1/2 top-full w-56 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                  <ul className="rounded-lg border border-line bg-paper p-2 shadow-[0_20px_60px_-15px_rgba(33,29,23,0.25)]">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-md px-4 py-2.5 text-sm text-ink-700 transition-colors hover:bg-stone-100 hover:text-ink"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${siteConfig.contact.phones[0].number}`}
            className="text-sm font-medium text-ink-700 hover:text-ink"
          >
            {siteConfig.contact.phones[0].display}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-ink bg-ink px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-oak-800 hover:border-oak-800"
          >
            Ραντεβού
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 lg:hidden"
        >
          <div className="relative h-3.5 w-4">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-full bg-ink transition-all duration-300",
                open && "top-1/2 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-px w-full bg-ink transition-all duration-300",
                open && "bottom-1/2 -rotate-45",
              )}
            />
          </div>
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-ivory lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {siteConfig.nav.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 font-display text-2xl text-ink"
                  >
                    {item.label}
                  </Link>
                  {"children" in item && item.children && (
                    <ul className="mb-2 ml-1 flex flex-col gap-0.5 border-l border-line pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block py-2 text-sm text-ink-500"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t border-line pt-6">
                <a
                  href={`tel:${siteConfig.contact.phones[0].number}`}
                  className="text-base font-medium text-ink"
                >
                  {siteConfig.contact.phones[0].display}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper"
                >
                  Κλείστε Ραντεβού
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
