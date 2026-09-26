import { useLang } from "@/lib/i18n";

const WORDS = ["OMRANCO", "BURGER", "JUICY", "SMOKY", "MANSOURA", "YEAH YEAH"];

export function BrandTicker() {
  const { lang } = useLang();
  const row = [...WORDS, ...WORDS, ...WORDS, ...WORDS];

  return (
    <div className="overflow-hidden bg-primary text-primary-foreground" dir="ltr">
      <div className="animate-marquee flex w-max items-center gap-8 py-3 whitespace-nowrap sm:gap-10 sm:py-3.5">
        {row.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="font-brand text-lg tracking-[0.12em] text-white sm:text-xl"
          >
            {w}
            <span className="ms-8 text-white/40 sm:ms-10">■</span>
          </span>
        ))}
      </div>
      <span className="sr-only">{lang === "ar" ? "كلمات هوية عمرانكو" : "OMRANCO brand words"}</span>
    </div>
  );
}
