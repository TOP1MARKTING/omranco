import { Link } from "@tanstack/react-router";
import { OsWindow } from "@/components/ui/OsWindow";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

export function OffersPromoBanner() {
  const { pick, t } = useLang();

  return (
    <section className="red-grid relative py-12 sm:py-16">
      <div className="brand-container relative flex flex-col items-center text-center">
        <OsWindow
          className="w-full max-w-2xl !overflow-visible"
          bodyClassName="relative !overflow-visible px-4 pb-14 pt-12 sm:px-10 sm:pb-10 sm:pt-10"
        >
          <span className="sticker absolute top-3 start-3 z-10 text-[0.65rem] sm:-top-2 sm:start-4 sm:text-[0.7rem]">
            {pick("جديد", "NEW")}
          </span>
          <span className="sticker absolute bottom-3 end-3 z-10 rotate-6 bg-white text-[0.65rem] sm:-bottom-2 sm:end-6 sm:text-[0.7rem]">
            {pick("توصيل فقط", "DELIVERY")}
          </span>

          <p className="mb-2 font-brand text-[10px] tracking-[0.18em] text-ink/50 sm:mb-3 sm:text-xs sm:tracking-[0.2em]">
            POP-UP DEAL
          </p>
          <h2 className="omranco-display text-primary !text-[clamp(1.35rem,6.5vw,2.85rem)] !leading-[1.2]">
            {pick("جاهز تجرب عروض عمرانكو؟", "Ready for OMRANCO deals?")}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm font-bold leading-relaxed text-ink/65 sm:mt-4 sm:text-base">
            {pick(
              "عروض قوية على البوكسات والسندوتشات — اطلب دلوقتي.",
              "Bold deals on boxes & sandwiches — order now.",
            )}
          </p>
          <Button
            asChild
            variant="hero"
            className="mt-5 h-11 w-full max-w-[16rem] px-8 text-base sm:mt-6 sm:h-12 sm:w-auto"
          >
            <Link to="/offers">{t("offers")}</Link>
          </Button>
        </OsWindow>
      </div>
    </section>
  );
}
