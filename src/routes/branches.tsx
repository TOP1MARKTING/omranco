import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { branches } from "@/lib/menu-data";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "الفروع | OMRANCO BURGER" },
      {
        name: "description",
        content: "فروع عمرانكو برجر في المنصورة — حي الجامعة وشارع النخلة.",
      },
    ],
  }),
  component: BranchesPage,
});

function BranchesPage() {
  const { t, pick } = useLang();

  return (
    <div className="red-grid min-h-[70vh] py-8 sm:py-10">
      <div className="brand-container">
        <div className="mb-6 border-2 border-black bg-white p-4 hard-shadow sm:p-5 text-center">
          <p className="font-brand text-xs tracking-[0.18em] text-ink/45">BRANCHES.EXE</p>
          <h1 className="omranco-display mt-1 text-primary !text-[clamp(1.75rem,4vw,2.75rem)]">
            {t("branchesTitle")}
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {branches.map((b) => (
            <article key={b.id} className="border-2 border-black bg-white p-5 hard-shadow sm:p-6 text-center">
              <h2 className="text-2xl font-extrabold">{pick(b.nameAr, b.nameEn)}</h2>
              <p className="mt-3 flex items-start gap-2 text-muted-foreground justify-center">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                {pick(b.addressAr, b.addressEn)}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground justify-center">
                <Phone className="size-4 text-primary" />
                <span className="font-latin" dir="ltr">
                  {b.phone}
                </span>
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                <Button asChild variant="hero">
                  <a href={b.mapUrl} target="_blank" rel="noreferrer">
                    {t("showLocation")}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={`tel:${b.phone}`}>
                    <Phone />
                    {t("callBranch")}
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
