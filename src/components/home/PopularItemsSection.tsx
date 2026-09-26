import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductModal } from "@/components/menu/ProductModal";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { products, type Product } from "@/lib/menu-data";

export function PopularItemsSection() {
  const { t, pick } = useLang();
  const [active, setActive] = useState<Product | null>(null);
  const popular = products.filter((p) => p.popular).slice(0, 8);

  return (
    <section className="border-y-4 border-black bg-white py-10 sm:py-14">
      <div className="brand-container">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-brand text-xs tracking-[0.18em] text-ink/45">BEST SELLERS</p>
            <h2 className="omranco-display mt-1 text-primary !text-[clamp(1.5rem,4vw,2.35rem)]">
              {t("popular")}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="sticker">{pick("الأكثر طلبًا", "TOP PICKS")}</span>
            <Button asChild variant="outline" className="h-9 px-4 text-xs font-extrabold">
              <Link to="/menu">{t("viewMenu")}</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {popular.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={setActive} />
          ))}
        </div>
      </div>

      <ProductModal product={active} open={!!active} onOpenChange={(o) => !o && setActive(null)} />
    </section>
  );
}
