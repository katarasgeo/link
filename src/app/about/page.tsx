import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Η ιστορία μας",
  description: `Η οικογενειακή ιστορία του ${siteConfig.legalName} από το ${siteConfig.foundedYear}.`,
  alternates: { canonical: "/about" },
};

const milestones = [
  {
    year: "1990",
    title: "Η αρχή",
    text: "Ένα μικρό κατάστημα χαλιών ανοίγει στο κέντρο του Αιγίου, με γνώμονα την προσωπική εξυπηρέτηση.",
  },
  {
    year: "2000s",
    title: "Επέκταση",
    text: "Η συλλογή μεγαλώνει με στρώματα, κρεβάτια και έπιπλα ύπνου, ακολουθώντας τις ανάγκες των πελατών.",
  },
  {
    year: "2010s",
    title: "Νέες κατηγορίες",
    text: "Προστίθενται καναπέδες, δάπεδα PVC και κουρτίνες — μια πλήρης πρόταση για το σπίτι.",
  },
  {
    year: "Σήμερα",
    title: "Ίδια αφοσίωση",
    text: "Τρεις δεκαετίες μετά, η ίδια προσοχή στη λεπτομέρεια συνεχίζεται σε κάθε επίσκεψη.",
  },
];

const values = [
  { title: "Χειρωνακτική προσοχή", text: "Κάθε παραγγελία περνάει από ανθρώπινο έλεγχο, όχι μόνο από κατάλογο." },
  { title: "Τοπικές ρίζες", text: "Ζούμε και δουλεύουμε στο Αίγιο — γνωρίζουμε τις ανάγκες της περιοχής." },
  { title: "Ειλικρινής συμβουλή", text: "Προτείνουμε αυτό που ταιριάζει, όχι απαραίτητα το πιο ακριβό." },
  { title: "Διαρκής σχέση", text: "Είμαστε διαθέσιμοι και μετά την αγορά, για ό,τι χρειαστείτε." },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Αρχική", url: "/" }, { name: "Ιστορία", url: "/about" }]} />
      <PageHero
        eyebrow="Από το 1990"
        title="Μια οικογενειακή ιστορία, χτισμένη στη λεπτομέρεια"
        description="Το Biokarpet Candia δεν είναι απλώς ένα κατάστημα. Είναι μια σχέση εμπιστοσύνης που χτίζεται εδώ και τρεις δεκαετίες, ένα σπίτι τη φορά."
        mediaLabel="Το κατάστημα στο Αίγιο"
      />

      <section className="py-24 md:py-32">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-3/4 overflow-hidden rounded-sm bg-stone-200">
              <Image
                src="/images/owner-portrait.png"
                alt={`${siteConfig.founder}, ιδρυτής του ${siteConfig.legalName}`}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-top"
                priority={false}
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-5">Ο ιδρυτής</p>
            <h2 className="text-balance-pretty font-display text-4xl font-normal leading-[1.1] text-ink md:text-5xl">
              {siteConfig.founder}
            </h2>
            <p className="mt-6 max-w-md text-balance-pretty text-base leading-relaxed text-ink-500">
              Με πάνω από τρεις δεκαετίες στον χώρο, ο {siteConfig.founder} έχτισε
              το {siteConfig.legalName} πάνω σε μια απλή αρχή: κάθε πελάτης
              αξίζει τον ίδιο χρόνο και την ίδια προσοχή, είτε αγοράζει ένα
              χαλάκι είτε επιπλώνει ολόκληρο το σπίτι του.
            </p>
            <p className="mt-4 max-w-md text-balance-pretty text-base leading-relaxed text-ink-500">
              Σήμερα συνεχίζει να καθοδηγεί προσωπικά κάθε επιλογή, με στόχο
              πάντα η ποιότητα να είναι εμφανής — και στο μάτι, και στην αντοχή
              του χρόνου.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-line bg-stone-100/60 py-24 md:py-32">
        <Container>
          <SectionHeading eyebrow="Η διαδρομή" title="Τρεις δεκαετίες, βήμα-βήμα" />
          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.08}>
                <span className="font-display text-2xl text-oak-600">{m.year}</span>
                <h3 className="mt-3 font-display text-lg text-ink">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{m.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading eyebrow="Οι αξίες μας" title="Ό,τι δεν αλλάζει με τον χρόνο" />
          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <h3 className="font-display text-lg text-ink">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
