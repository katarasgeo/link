export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg text-ink marker:content-none">
            <span>{item.q}</span>
            <span
              aria-hidden
              className="shrink-0 text-xl text-ink-500 transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <dd className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-500">{item.a}</dd>
        </details>
      ))}
    </dl>
  );
}
