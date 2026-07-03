import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Προϊόντα",
  description:
    "Χαλιά, στρώματα, κρεβάτια, καναπέδες, δάπεδα PVC και κουρτίνες — η πλήρης συλλογή του Biokarpet Candia Αιγίου.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Αρχική", url: "/" }, { name: "Προϊόντα", url: "/products" }]} />
      <PageHero
        eyebrow="Η συλλογή"
        title="Έξι κατηγορίες, μία στιβαρή φιλοσοφία"
        description={siteConfig.descriptionEn}
        mediaLabel="Στούντιο φωτογράφησης — επιλεγμένα προϊόντα"
      />
      <CategoryGrid />
      <CtaBanner />
    </>
  );
}
