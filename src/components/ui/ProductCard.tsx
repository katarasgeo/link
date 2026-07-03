import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";

export function ProductCard({
  name,
  note,
  price,
  delay = 0,
}: {
  name: string;
  note: string;
  price: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="group">
        <div className="overflow-hidden rounded-sm">
          <div className="transition-transform duration-700 ease-out group-hover:scale-105">
            <Media ratio="portrait" label={name} />
          </div>
        </div>
        <h3 className="mt-5 font-display text-xl text-ink">{name}</h3>
        <p className="mt-1 text-sm text-ink-500">{note}</p>
        <p className="mt-2 text-sm font-medium text-oak-600">{price}</p>
      </article>
    </Reveal>
  );
}
