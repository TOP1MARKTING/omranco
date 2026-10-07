import { Link } from "@tanstack/react-router";
import { ExternalLink, Instagram, Phone } from "lucide-react";
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
        <a
          href="https://www.top1markting.com/"
          target="_blank"
          rel="noreferrer"
          aria-label={pick("الموقع من تنفيذ Top1Markting", "Website by Top1Markting")}
          className="mt-3 inline-flex items-center gap-2 rounded-full border-2 border-black bg-white py-1 ps-2 pe-3 shadow-[3px_3px_0_var(--color-primary)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-primary)] active:translate-x-px active:translate-y-px active:shadow-none"
        >
          <img
            src="/top1markting-mark.png"
            alt=""
            width={132}
            height={96}
            loading="lazy"
            decoding="async"
            className="h-5 w-auto"
          />
          <span className="text-[11px] font-bold text-ink/50">{pick("تنفيذ", "By")}</span>
          <span dir="ltr" className="font-latin-ui text-[13px] font-extrabold tracking-tight text-ink">
            Top<span className="text-primary">1</span>Markting
          </span>
          <ExternalLink className="size-3 text-ink/45" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
