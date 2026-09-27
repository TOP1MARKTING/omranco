import { Link } from "@tanstack/react-router";
import { Instagram, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useLang } from "@/lib/i18n";

export function SiteFooter() {
  const { t, pick } = useLang();

  return (
    <footer className="mt-10 border-t-4 border-black bg-ink text-ink-foreground">
      <div className="brand-container grid gap-8 py-10 text-center md:grid-cols-3 md:text-start">
        <div className="flex flex-col items-center md:items-start">
          <Logo className="rounded-none" />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            {pick(
              "برجر وسندوتشات في المنصورة — لحم بلدي.",
              "Burgers and sandwiches in Mansoura — local beef.",
            )}
          </p>
          <a
            href="https://www.instagram.com/omranco_burger/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 border-2 border-white/25 bg-white/5 px-3 py-2 text-sm font-bold text-white transition-colors hover:border-primary hover:bg-primary"
          >
            <Instagram className="size-4" />
            @omranco_burger
          </a>
        </div>

        <nav className="flex flex-col items-center text-sm md:items-start">
          <p className="mb-3 font-brand text-xs tracking-[0.18em] text-primary-bright">
            LINKS.EXE
          </p>
          <ul className="space-y-2 text-white/70">
            <li>
              <Link to="/menu" className="font-bold hover:text-white">
                {t("menu")}
              </Link>
            </li>
            <li>
              <Link to="/offers" className="font-bold hover:text-white">
                {t("offers")}
              </Link>
            </li>
            <li>
              <Link to="/branches" className="font-bold hover:text-white">
                {t("branches")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="font-bold hover:text-white">
                {t("contact")}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col items-center text-sm md:items-start">
          <p className="mb-3 font-brand text-xs tracking-[0.18em] text-primary-bright">
            CALL.EXE
          </p>
          <ul className="flex flex-col items-center gap-2 md:items-start">
            <li>
              <a
                href="tel:01555218182"
                className="inline-flex items-center gap-2 border-2 border-white/25 bg-white/5 px-3 py-2 font-bold text-white hover:border-primary hover:bg-primary"
              >
                <Phone className="size-4" />
                <span dir="ltr">01555218182</span>
              </a>
            </li>
            <li>
              <a
                href="tel:0502242474"
                className="inline-flex items-center gap-2 border-2 border-white/25 bg-white/5 px-3 py-2 font-bold text-white hover:border-primary hover:bg-primary"
              >
                <Phone className="size-4" />
                <span dir="ltr">0502242474</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-white/15 py-4 text-center text-xs text-white/45">
        <p>© {new Date().getFullYear()} OMRANCO BURGER</p>
        <p className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span>{pick("الموقع من تنفيذ", "Website by")}</span>
          <a
            href="https://www.top1markting.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center border-2 border-black bg-primary px-3 text-xs font-extrabold text-white hard-shadow transition hover:bg-primary/90 active:translate-x-px active:translate-y-px active:shadow-none"
          >
            Top1Markting
          </a>
        </p>
      </div>
    </footer>
  );
}
