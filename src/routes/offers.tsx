import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { offers } from "@/lib/menu-data";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "العروض | OMRANCO BURGER" },
      { name: "description", content: "عروض عمرانكو برجر في المنصورة." },
    ],
  }),
  component: OffersPage,
});

function OffersPage() {
  const { t, pick } = useLang();

  return (
    <div className="red-grid min-h-[70vh] py-8 sm:py-10">
      <div className="brand-container">
        <div className="mb-6 border-2 border-black bg-white p-4 hard-shadow sm:p-5">
          <p className="font-brand text-xs tracking-[0.18em] text-ink/45">DEALS.EXE</p>
          <h1 className="omranco-display mt-1 text-primary !text-[clamp(1.75rem,4vw,2.75rem)]">
            {t("offersTitle")}
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <article key={offer.id} className="overflow-hidden border-2 border-black bg-white hard-shadow">
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
              <div className="p-5">
                <h2 className="text-xl font-extrabold">{pick(offer.titleAr, offer.titleEn)}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {pick(offer.descAr, offer.descEn)}
                </p>
                <Button asChild variant="hero" className="mt-5 w-full">
                  <Link to="/menu">{t("orderNow")}</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
