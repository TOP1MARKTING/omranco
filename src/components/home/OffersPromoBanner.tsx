import { Link } from "@tanstack/react-router";
import { OsWindow } from "@/components/ui/OsWindow";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

export function OffersPromoBanner() {
  const { pick, t } = useLang();

  return (
    <section className="red-grid relative overflow-hidden py-12 sm:py-16">
      <div className="brand-container relative flex flex-col items-center text-center">
        <OsWindow title="OFFERS.APP" className="w-full max-w-2xl" bodyClassName="relative px-5 py-8 sm:px-10 sm:py-10">
          <span className="sticker absolute -top-2 start-4 z-10">{pick("جديد", "NEW")}</span>
          <span className="sticker absolute -bottom-2 end-6 z-10 rotate-6 bg-white">
            {pick("توصيل فقط", "DELIVERY")}
          </span>

          <p className="mb-3 font-brand text-xs tracking-[0.2em] text-ink/50">
            POP-UP DEAL
          </p>
          <h2 className="omranco-display text-primary !text-[clamp(1.6rem,5.5vw,2.85rem)]">
            {pick("جاهز تجرب عروض عمرانكو؟", "Ready for OMRANCO deals?")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm font-bold text-ink/65 sm:text-base">
            {pick(
              "عروض قوية على البوكسات والسندوتشات — اطلب دلوقتي.",
              "Bold deals on boxes & sandwiches — order now.",
            )}
          </p>
          <Button asChild variant="hero" className="mt-6 h-12 px-8 text-base">
            <Link to="/offers">{t("offers")}</Link>
          </Button>
        </OsWindow>
      </div>
    </section>
  );
}
