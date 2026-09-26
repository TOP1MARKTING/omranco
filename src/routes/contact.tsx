import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { branches } from "@/lib/menu-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | OMRANCO BURGER" },
      {
        name: "description",
        content: "تواصل مع عمرانكو برجر — 01555218182 / 0502242474",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, pick } = useLang();

  return (
    <div className="red-grid min-h-[70vh] py-8 sm:py-10">
      <div className="brand-container">
        <div className="mb-6 border-2 border-black bg-white p-4 hard-shadow sm:p-5">
          <p className="font-brand text-xs tracking-[0.18em] text-ink/45">CONTACT.EXE</p>
          <h1 className="omranco-display mt-1 text-primary !text-[clamp(1.75rem,4vw,2.75rem)]">
            {t("contactTitle")}
          </h1>
          <p className="mt-3 max-w-lg text-sm font-bold text-ink/70 sm:text-base">
            {t("contactBody")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { tel: "01555218182", label: "01555218182" },
            { tel: "0502242474", label: "0502242474" },
          ].map((p) => (
            <a
              key={p.tel}
              href={`tel:${p.tel}`}
              className="flex items-center gap-3 border-2 border-black bg-white p-5 hard-shadow transition hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              <span className="grid size-12 place-items-center border-2 border-black bg-primary text-white hard-shadow-sm">
                <Phone className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-bold text-muted-foreground">{t("phone")}</span>
                <span className="font-latin text-lg font-extrabold" dir="ltr">
                  {p.label}
                </span>
              </span>
            </a>
          ))}
        </div>

        <h2 className="omranco-display mt-10 mb-4 text-white !text-[clamp(1.35rem,3vw,1.85rem)]">
          {t("branches")}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {branches.map((b) => (
            <article key={b.id} className="border-2 border-black bg-white p-5 hard-shadow">
              <h3 className="font-extrabold">{pick(b.nameAr, b.nameEn)}</h3>
              <p className="mt-2 flex gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                {pick(b.addressAr, b.addressEn)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="hero">
            <Link to="/menu">{t("orderNow")}</Link>
          </Button>
          <Button asChild variant="outline" className="bg-white">
            <Link to="/branches">{t("branches")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
