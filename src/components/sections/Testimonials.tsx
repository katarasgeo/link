import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const reviews = [
  {
    quote:
      "Μας βοήθησαν να διαλέξουμε στρώμα χωρίς καμία βιασύνη. Ένα χρόνο μετά, ακόμα ευχαριστημένοι.",
    name: "Ελένη Π.",
    context: "Αίγιο",
  },
  {
    quote:
      "Το χαλί που πήραμε άλλαξε εντελώς το σαλόνι. Η ποιότητα φαίνεται από την πρώτη επαφή.",
    name: "Δημήτρης Κ.",
    context: "Ακράτα",
  },
  {
    quote:
      "Οικογενειακή επιχείρηση με πραγματική γνώση. Σε συμβουλεύουν σαν να επιλέγουν για το δικό τους σπίτι.",
    name: "Μαρία Σ.",
    context: "Αίγιο",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Μαρτυρίες" title="Τι λένε όσοι μας εμπιστεύτηκαν" align="center" />

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col justify-between rounded-sm border border-line bg-paper p-8">
                <blockquote className="font-display text-xl italic leading-snug text-ink">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 text-sm text-ink-500">
                  <span className="font-medium text-ink">{r.name}</span> — {r.context}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
