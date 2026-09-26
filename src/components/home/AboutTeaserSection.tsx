import { Link } from "@tanstack/react-router";
import mealImg from "@/assets/item-meal.jpg";
import { OsWindow } from "@/components/ui/OsWindow";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

export function AboutTeaserSection() {
  const { t, pick } = useLang();

  return (
    <section className="border-y-4 border-black bg-white py-12 sm:py-16">
      <div className="brand-container grid items-center gap-8 lg:grid-cols-2">
        <OsWindow title="ABOUT.TXT" bodyClassName="relative p-6 sm:p-8">
          <span className="sticker absolute -top-3 end-5 z-10 bg-primary text-white">
            OMRANCO
          </span>
          <p className="font-brand text-xs tracking-[0.18em] text-ink/45">BRAND STORY</p>
          <h2 className="omranco-display mt-2 text-primary !text-[clamp(1.75rem,4vw,2.75rem)] lg:origin-start">
            {t("aboutTitle")}
          </h2>
          <p className="mt-3 text-base font-extrabold text-ink">{t("slogan")}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base">{t("aboutBody")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="hero" className="h-11 px-6 font-extrabold">
              <Link to="/menu">{t("orderNow")}</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6 font-extrabold">
              <Link to="/branches">{t("branches")}</Link>
            </Button>
          </div>
        </OsWindow>

        <OsWindow title="FOOD.JPG" className="overflow-hidden">
          <img
            src={mealImg}
            alt={t("aboutTitle")}
            loading="lazy"
            width={900}
            height={700}
            className="aspect-[5/4] w-full object-cover"
          />
        </OsWindow>
      </div>
      <p className="sr-only">{pick("من المنصورة", "From Mansoura")}</p>
    </section>
  );
}
