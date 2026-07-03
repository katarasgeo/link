import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  mediaLabel,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  mediaLabel: string;
}) {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <Container>
        <Reveal>
          <p className="eyebrow mb-5">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="max-w-3xl text-balance-pretty font-display text-5xl font-normal leading-[1.05] text-ink md:text-6xl lg:text-7xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-balance-pretty text-base leading-relaxed text-ink-500 md:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </Container>
      <Reveal delay={0.18} className="mt-14 md:mt-20">
        <Media ratio="cinema" label={mediaLabel} className="w-full" />
      </Reveal>
    </section>
  );
}
