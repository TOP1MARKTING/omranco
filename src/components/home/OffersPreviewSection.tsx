import { Link } from "@tanstack/react-router";
import { OsWindow } from "@/components/ui/OsWindow";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { offers } from "@/lib/menu-data";

export function OffersPreviewSection() {
  const { t, pick } = useLang();

  return (
    <section className="red-grid py-10 sm:py-14">
      <div className="brand-container">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-brand text-xs tracking-[0.18em] text-white/70">DEALS</p>
            <h2 className="omranco-display mt-1 text-white !text-[clamp(1.5rem,4vw,2.25rem)]">
              {t("offersTitle")}
            </h2>
          </div>
          <Button asChild variant="outline" className="h-9 bg-white px-4 text-xs font-extrabold">
            <Link to="/offers">{t("offers")}</Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {offers.map((offer, i) => (
            <Link key={offer.id} to="/menu" search={{ category: "new" }} className="block">
              <OsWindow title={`DEAL_0${i + 1}.EXE`} className="h-full transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5">
                <div className="relative border-b-2 border-black">
                  <img
                    src={offer.image}
                    alt={pick(offer.titleAr, offer.titleEn)}
                    loading="lazy"
                    width={800}
                    height={500}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <span className="sticker absolute top-3 start-3 z-10">
                    {pick(offer.badgeAr, offer.badgeEn)}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-extrabold">{pick(offer.titleAr, offer.titleEn)}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {pick(offer.descAr, offer.descEn)}
                  </p>
                </div>
              </OsWindow>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
