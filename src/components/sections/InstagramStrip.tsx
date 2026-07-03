import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

export function InstagramStrip() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow mb-4">Έμπνευση</p>
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Ακολουθήστε μας @biokarpetaigio
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-oak-600 underline decoration-oak-100 underline-offset-4 hover:text-oak-800"
            >
              Δείτε στο Instagram →
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Reveal key={i} delay={(i % 6) * 0.05}>
              <Media ratio="square" tone={i % 2 === 0 ? "stone" : "oak"} label="IG" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
