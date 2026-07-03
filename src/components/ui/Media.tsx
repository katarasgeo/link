import Image from "next/image";
import { cn } from "@/lib/utils";

const ratios: Record<string, string> = {
  square: "aspect-square",
  portrait: "aspect-3/4",
  tall: "aspect-2/3",
  landscape: "aspect-4/3",
  wide: "aspect-16/9",
  cinema: "aspect-21/9",
};

const tones: Record<string, string> = {
  stone: "from-stone-200 via-stone-100 to-paper",
  oak: "from-oak-100 via-stone-200 to-stone-100",
  ink: "from-ink-700 via-ink to-ink-700",
};

/**
 * Editorial placeholder for photography that hasn't been shot/sourced yet.
 * Pass `src` once real imagery is available and it renders a real next/image.
 */
export function Media({
  label,
  ratio = "landscape",
  tone = "stone",
  className,
  src,
  alt = "",
  priority = false,
  sizes,
}: {
  label?: string;
  ratio?: keyof typeof ratios;
  tone?: keyof typeof tones;
  className?: string;
  src?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", ratios[ratio], className)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "100vw"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label ? `Placeholder: ${label}` : "Photography placeholder"}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        tones[tone],
        ratios[ratio],
        className,
      )}
    >
      <div className="grain-overlay" />
      <span className="absolute left-5 top-5 h-4 w-4 border-l border-t border-ink/25 md:left-7 md:top-7" />
      <span className="absolute right-5 top-5 h-4 w-4 border-r border-t border-ink/25 md:right-7 md:top-7" />
      <span className="absolute bottom-5 left-5 h-4 w-4 border-b border-l border-ink/25 md:bottom-7 md:left-7" />
      <span className="absolute bottom-5 right-5 h-4 w-4 border-b border-r border-ink/25 md:bottom-7 md:right-7" />
      {label && (
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-ink-500 md:bottom-8">
          {label}
        </span>
      )}
    </div>
  );
}
