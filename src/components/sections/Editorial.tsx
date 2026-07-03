import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Editorial() {
  return (
    <section className="py-24 md:py-32">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Media ratio="tall" tone="oak" label="Στρώμα σε φυσικό φως πρωινού" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow mb-5">Η τέχνη του ύπνου</p>
          <h2 className="text-balance-pretty font-display text-4xl font-normal leading-[1.1] text-ink md:text-5xl">
            Ο ύπνος δεν είναι πολυτέλεια.
            <br />
            Είναι <span className="italic text-oak-600">βάση.</span>
          </h2>
          <p className="mt-6 max-w-md text-balance-pretty text-base leading-relaxed text-ink-500">
            Περνάμε το ένα τρίτο της ζωής μας ξαπλωμένοι. Γι&apos;αυτό
            αφιερώνουμε χρόνο να καταλάβουμε τον τρόπο που κοιμάστε πριν σας
            προτείνουμε στρώμα — όχι το πιο ακριβό, το σωστό.
          </p>
          <div className="mt-8">
            <Button href="/products/mattresses" variant="secondary">
              Βρείτε το στρώμα σας
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
