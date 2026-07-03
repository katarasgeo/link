import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Έργα",
  description: "Ολοκληρωμένες εγκαταστάσεις και ανακαινίσεις χώρων από το Biokarpet Candia Αιγίου.",
  alternates: { canonical: "/projects" },
};

const projects = [
  { title: "Διαμέρισμα στο κέντρο του Αιγίου", tag: "Χαλιά & Καναπέδες" },
  { title: "Εξοχική κατοικία στην Ακράτα", tag: "Κρεβάτια & Στρώματα" },
  { title: "Ανακαίνιση παλιάς κατοικίας", tag: "Δάπεδα PVC" },
  { title: "Μονοκατοικία στο Ρίο", tag: "Κουρτίνες & Στόρια" },
  { title: "Διαμέρισμα νεόνυμφων", tag: "Πλήρης επίπλωση" },
  { title: "Ξενώνας στο Αίγιο", tag: "Χαλιά & Κρεβάτια" },
];

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Αρχική", url: "/" }, { name: "Έργα", url: "/projects" }]} />
      <PageHero
        eyebrow="Ολοκληρωμένα έργα"
        title="Χώροι που ντύσαμε με προσοχή"
        description="Από ένα δωμάτιο ως ολόκληρη κατοικία, κάθε έργο ξεκινά με μια συζήτηση και τελειώνει με έναν χώρο που νιώθει σωστός."
        mediaLabel="Πρόσφατο έργο εγκατάστασης"
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.08}>
                <div className="overflow-hidden rounded-sm">
                  <div className="transition-transform duration-700 ease-out hover:scale-105">
                    <Media ratio="landscape" tone={i % 2 === 0 ? "stone" : "oak"} label={p.title} />
                  </div>
                </div>
                <p className="eyebrow mt-5 text-oak-600">{p.tag}</p>
                <h3 className="mt-2 font-display text-xl text-ink">{p.title}</h3>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
