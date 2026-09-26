import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { categories } from "@/lib/menu-data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function QuickOrderSection() {
  const { t, pick } = useLang();
  const [active, setActive] = useState(categories[0]?.id ?? "");

  return (
    <section className="red-grid py-10 sm:py-14">
      <div className="brand-container">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-brand text-xs tracking-[0.18em] text-white/70">CATEGORIES</p>
            <h2 className="omranco-display mt-1 text-white !text-[clamp(1.5rem,4vw,2.25rem)]">
              {t("quickOrder")}
            </h2>
          </div>
          <span className="sticker bg-amber">{pick("اختار بسرعة", "PICK FAST")}</span>
        </div>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              data-active={active === cat.id}
              className="cat-pill shrink-0"
              onClick={() => setActive(cat.id)}
            >
              {pick(cat.nameAr, cat.nameEn)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/menu"
              search={{ category: cat.id }}
              className={cn(
                "os-window group block transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5",
                active === cat.id && "ring-2 ring-amber",
              )}
            >
              <div className="os-titlebar !min-h-0 !gap-1 !py-1">
                <span className="size-2 bg-primary" />
                <span className="size-2 bg-amber" />
                <span className="size-2 bg-white/80" />
              </div>
              <img
                src={cat.image}
                alt={pick(cat.nameAr, cat.nameEn)}
                loading="lazy"
                width={300}
                height={300}
                className="aspect-square w-full border-b-2 border-black object-cover"
              />
              <span className="block bg-white p-2 text-center text-xs font-extrabold sm:text-sm">
                {pick(cat.nameAr, cat.nameEn)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
