import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    n: "01",
    title: "35 χρόνια εμπειρίας",
    text: "Από το 1990, τρεις γενιές πελατών μας εμπιστεύονται για τις επιλογές του σπιτιού τους.",
  },
  {
    n: "02",
    title: "Προσωπική καθοδήγηση",
    text: "Καμία αγορά δεν γίνεται βιαστικά. Σας ακούμε, μετράμε τον χώρο, προτείνουμε με ειλικρίνεια.",
  },
  {
    n: "03",
    title: "Επιλεγμένη ποιότητα",
    text: "Συνεργαζόμαστε μόνο με οίκους που μοιράζονται την ίδια αντίληψη για διάρκεια και άνεση.",
  },
  {
    n: "04",
    title: "Τοπική εγγύηση",
    text: "Είμαστε εδώ, στο Αίγιο, πριν και μετά την αγορά — για service, συμβουλή ή απλή επίσκεψη.",
  },
];

export function WhyUs() {
  return (
    <section className="border-y border-line bg-stone-100/60 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Γιατί εμάς"
          title="Η εμπιστοσύνη χτίζεται σε βάθος χρόνου"
          align="left"
        />

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <span className="font-display text-sm text-oak-600">{p.n}</span>
              <h3 className="mt-4 font-display text-xl text-ink">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
