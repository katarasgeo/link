"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Media } from "@/components/ui/Media";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mediaRef.current,
        { yPercent: -6, scale: 1.08 },
        {
          yPercent: 6,
          scale: 1.0,
          ease: "none",
          scrollTrigger: {
            trigger: mediaRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: mediaRef.current,
            start: "top top",
            end: "40% top",
            scrub: 0.6,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div ref={mediaRef} className="absolute inset-0">
        <Media
          ratio="square"
          tone="ink"
          label="Κινηματογραφική φωτογράφηση εσωτερικού χώρου"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/40" />
      </div>

      <div
        ref={textRef}
        className="relative flex h-full flex-col justify-end pb-16 md:pb-24"
      >
        <Container>
          <p className="eyebrow mb-6 text-stone-200/90">
            Βιοκαρπέτ Candia Αιγίου — Από το 1990
          </p>
          <h1 className="max-w-4xl text-balance-pretty font-display text-5xl font-normal leading-[1.02] text-paper sm:text-6xl md:text-7xl lg:text-8xl">
            Χώροι που{" "}
            <span className="font-normal italic text-oak-100">αναπνέουν</span>{" "}
            άνεση.
          </h1>
          <p className="mt-7 max-w-lg text-balance-pretty text-base leading-relaxed text-stone-200/90 md:text-lg">
            Χαλιά, στρώματα, κρεβάτια και έπιπλα επιλεγμένα με το ίδιο πάθος
            εδώ και τρεις δεκαετίες. Ένα οικογενειακό κατάστημα στο Αίγιο, με
            διάθεση για κάθε λεπτομέρεια.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-paper px-8 py-4 text-sm font-medium tracking-wide text-ink transition-colors hover:bg-oak-100"
            >
              Ανακαλύψτε τη συλλογή
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-paper/50 px-8 py-4 text-sm font-medium tracking-wide text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              Κλείστε ραντεβού
            </Link>
          </div>
        </Container>
      </div>

      <div className="absolute bottom-8 right-6 hidden flex-col items-center gap-3 text-stone-200/70 md:right-10 md:flex">
        <span className="eyebrow rotate-180 text-[0.6875rem] [writing-mode:vertical-rl] text-stone-200/70">
          Κύλιση
        </span>
        <span className="h-12 w-px bg-stone-200/40" />
      </div>
    </section>
  );
}
