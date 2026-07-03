import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Επικοινωνία & Ραντεβού",
  description: `Επικοινωνήστε με το ${siteConfig.legalName} ή κλείστε δωρεάν ραντεβού στο κατάστημα στο Αίγιο.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    siteConfig.contact.mapsEmbedQuery,
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Αρχική", url: "/" }, { name: "Επικοινωνία", url: "/contact" }]} />
      <PageHero
        eyebrow="Επικοινωνία"
        title="Ελάτε να τα δούμε μαζί"
        description="Κλείστε δωρεάν ραντεβού, τηλεφωνήστε ή περάστε απευθείας από το κατάστημα στο Αίγιο."
        mediaLabel="Είσοδος καταστήματος"
      />

      <section className="py-24 md:py-32">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-12">
          <Reveal className="lg:col-span-3">
            <h2 className="mb-8 font-display text-2xl text-ink">Κλείστε ραντεβού</h2>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="space-y-10 rounded-sm border border-line bg-stone-100/60 p-8">
              <div>
                <p className="eyebrow mb-3">Κατάστημα</p>
                <address className="not-italic leading-relaxed text-ink-700">
                  {siteConfig.legalName}
                  <br />
                  {siteConfig.contact.address.full}
                </address>
              </div>

              <div>
                <p className="eyebrow mb-3">Τηλέφωνα</p>
                {siteConfig.contact.phones.map((p) => (
                  <p key={p.number}>
                    <a href={`tel:${p.number}`} className="text-ink-700 hover:text-ink">
                      {p.display}
                    </a>{" "}
                    <span className="text-ink-500">— {p.label}</span>
                  </p>
                ))}
              </div>

              <div>
                <p className="eyebrow mb-3">Email</p>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-ink-700 hover:text-ink">
                  {siteConfig.contact.email}
                </a>
              </div>

              <div>
                <p className="eyebrow mb-3">Ωράριο</p>
                {siteConfig.contact.hours.map((h) => (
                  <p key={h.days} className="text-ink-700">
                    {h.days}: {h.hours}
                  </p>
                ))}
              </div>

              <a
                href={siteConfig.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-oak-600 underline decoration-oak-100 underline-offset-4 hover:text-oak-800"
              >
                Άνοιγμα στο Google Maps →
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="aspect-16/9 overflow-hidden rounded-sm border border-line md:aspect-21/9">
            <iframe
              title={`Χάρτης — ${siteConfig.legalName}`}
              src={mapSrc}
              loading="lazy"
              className="h-full w-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
