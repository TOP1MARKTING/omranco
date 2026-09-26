import { MapPin, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { OsWindow } from "@/components/ui/OsWindow";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { branches } from "@/lib/menu-data";

export function BranchesTeaserSection() {
  const { t, pick } = useLang();

  return (
    <section className="border-t-4 border-black bg-white py-10 sm:py-14">
      <div className="brand-container">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-brand text-xs tracking-[0.18em] text-ink/45">LOCATIONS</p>
            <h2 className="omranco-display mt-1 text-primary !text-[clamp(1.5rem,4vw,2.25rem)]">
              {t("branchesTitle")}
            </h2>
          </div>
          <Button asChild variant="outline" className="h-9 px-4 text-xs font-extrabold">
            <Link to="/branches">{t("branches")}</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {branches.map((b, i) => (
            <OsWindow key={b.id} title={`BRANCH_0${i + 1}.EXE`} bodyClassName="p-5">
              <h3 className="text-lg font-extrabold">{pick(b.nameAr, b.nameEn)}</h3>
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                {pick(b.addressAr, b.addressEn)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild variant="hero" size="sm">
                  <a href={b.mapUrl} target="_blank" rel="noreferrer">
                    {t("showLocation")}
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={`tel:${b.phone}`}>
                    <Phone />
                    {t("callBranch")}
                  </a>
                </Button>
              </div>
            </OsWindow>
          ))}
        </div>
      </div>
    </section>
  );
}
