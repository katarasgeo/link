import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

export function CtaBanner() {
  return (
    <section className="bg-ink py-24 text-paper md:py-32">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow mb-6 text-oak-100">Επόμενο βήμα</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-balance-pretty max-w-2xl font-display text-4xl font-normal leading-[1.1] md:text-5xl">
            Ελάτε να δείτε τα κομμάτια από κοντά
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-md text-balance-pretty text-stone-300">
            Κλείστε ένα δωρεάν ραντεβού και θα σας περιμένουμε στο κατάστημα
            στο {siteConfig.contact.address.city}, με καφέ και χρόνο.
          </p>
        </Reveal>
        <Reveal delay={0.18} className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/contact" variant="primary" size="lg" className="bg-paper text-ink border-paper hover:bg-oak-100 hover:border-oak-100">
            Κλείστε ραντεβού
          </Button>
          <Button
            href={`tel:${siteConfig.contact.phones[0].number}`}
            variant="secondary"
            size="lg"
            className="border-paper/40 text-paper hover:bg-paper/10 hover:text-paper"
          >
            {siteConfig.contact.phones[0].display}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
