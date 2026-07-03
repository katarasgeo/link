import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { Faq } from "@/components/ui/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { categoryContent } from "@/lib/categories-data";

export function generateStaticParams() {
  return siteConfig.categories.map((c) => ({ slug: c.slug }));
}

function getCategory(slug: string) {
  return siteConfig.categories.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.name} — ${category.nameEn}`,
    description: category.blurb,
    alternates: { canonical: `/products/${slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  const content = categoryContent[slug];

  if (!category || !content) notFound();

  const otherCategories = siteConfig.categories.filter((c) => c.slug !== slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Αρχική", url: "/" },
          { name: "Προϊόντα", url: "/products" },
          { name: category.name, url: `/products/${slug}` },
        ]}
      />
      <PageHero
        eyebrow={`Προϊόντα — ${category.nameEn}`}
        title={category.name}
        description={content.story}
        mediaLabel={`${category.nameEn} — editorial φωτογράφηση`}
      />

      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="Ενδεικτική συλλογή"
            title="Επιλεγμένα κομμάτια"
            description="Μια γεύση από όσα θα βρείτε στο κατάστημα — η πλήρης συλλογή είναι πάντα μεγαλύτερη από ό,τι χωράει μια σελίδα."
          />
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {content.products.map((p, i) => (
              <ProductCard key={p.name} {...p} delay={(i % 3) * 0.08} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-stone-100/60 py-24 md:py-32">
        <Container>
          <SectionHeading eyebrow="Χαρακτηριστικά" title="Γιατί να το επιλέξετε" />
          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {content.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <h3 className="font-display text-lg text-ink">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Συχνές ερωτήσεις" title="Πριν αποφασίσετε" />
          <div className="mt-12">
            <Faq items={content.faq} />
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <p className="eyebrow mb-6">Δείτε επίσης</p>
          <div className="flex flex-wrap gap-3">
            {otherCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/products/${c.slug}`}
                className="rounded-full border border-line px-5 py-2.5 text-sm text-ink-700 transition-colors hover:border-ink hover:text-ink"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
