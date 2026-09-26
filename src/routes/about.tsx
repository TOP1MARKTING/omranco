import { createFileRoute, Link } from "@tanstack/react-router";
import burgerImg from "@/assets/item-burger.jpg";
import logoImg from "@/assets/omranco-logo.png";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن عمرانكو | OMRANCO BURGER" },
      {
        name: "description",
        content: "عمرانكو برجر من المنصورة — لحم بلدي وطعم صريح.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLang();

  return (
    <div className="red-grid min-h-[70vh] py-8 sm:py-10">
      <div className="brand-container grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
        <div className="border-2 border-black bg-white p-6 hard-shadow sm:p-8">
          <img
            src={logoImg}
            alt="OMRANCO BURGER"
            width={96}
            height={96}
            className="mb-4 size-20 border-2 border-black object-contain hard-shadow-sm"
          />
          <p className="font-brand text-xs tracking-[0.18em] text-ink/45">ABOUT.TXT</p>
          <h1 className="omranco-display mt-1 text-primary !text-[clamp(1.75rem,4vw,2.75rem)]">
            {t("aboutTitle")}
          </h1>
          <p className="mt-2 text-sm font-extrabold text-ink">{t("slogan")}</p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/70">{t("aboutBody")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="hero">
              <Link to="/menu">{t("orderNow")}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/branches">{t("branches")}</Link>
            </Button>
          </div>
        </div>
        <div className="overflow-hidden border-2 border-black hard-shadow">
          <img
            src={burgerImg}
            alt=""
            loading="lazy"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
