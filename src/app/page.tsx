import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { WhyUs } from "@/components/sections/WhyUs";
import { Editorial } from "@/components/sections/Editorial";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramStrip } from "@/components/sections/InstagramStrip";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.tagline} — Αίγιο`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <WhyUs />
      <Editorial />
      <Testimonials />
      <InstagramStrip />
      <CtaBanner />
    </>
  );
}
