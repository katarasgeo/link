import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

export function CategoryGrid() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Οι συλλογές μας"
          title="Έξι κατηγορίες, μία φιλοσοφία"
          description="Κάθε κομμάτι επιλέγεται με το ίδιο κριτήριο: να αντέχει στον χρόνο, να νιώθεται σωστό στο χέρι και να ομορφαίνει τον χώρο σας."
        />

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={(i % 3) * 0.08}>
              <Link href={`/products/${cat.slug}`} className="group block">
                <div className="overflow-hidden rounded-sm">
                  <div className="transition-transform duration-700 ease-out group-hover:scale-105">
                    <Media ratio="portrait" label={cat.nameEn} />
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-ink">{cat.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{cat.blurb}</p>
                  </div>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-ink-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink"
                  >
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
