import { Link, useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", key: "home" },
  { to: "/menu", key: "menu" },
  { to: "/offers", key: "offers" },
  { to: "/branches", key: "branches" },
  { to: "/contact", key: "contact" },
] as const;

export function MobileNavSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t, lang, setLang } = useLang();
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="top"
        overlayClassName="bg-black/45"
        className="left-3 right-3 top-[max(0.65rem,env(safe-area-inset-top))] z-[60] mx-auto h-auto max-h-[min(34rem,calc(100dvh-1.5rem))] w-auto max-w-md gap-0 overflow-hidden border-0 bg-transparent p-0 shadow-none data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top [&>button]:hidden"
      >
        <div className="os-window">
          <div className="os-titlebar" dir="ltr">
            <span className="size-3 border border-white/30 bg-primary" />
            <span className="size-3 border border-white/30 bg-amber" />
            <span className="size-3 border border-white/30 bg-white/90" />
            <span className="ms-2 font-brand text-[10px] tracking-[0.16em] text-white/75">
              MENU.EXE
            </span>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="ms-auto grid size-7 place-items-center border border-white/40 bg-primary text-white"
              aria-label="Close"
            >
              <X className="size-4" strokeWidth={2.5} />
            </button>
          </div>
          <SheetTitle className="sr-only">{t("menu")}</SheetTitle>
          <div className="flex justify-center border-b-2 border-black bg-white px-4 py-3">
            <Logo className="size-12" />
          </div>
          <nav className="flex flex-col gap-1 bg-white p-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "border-2 border-black px-4 py-3 text-base font-extrabold hard-shadow-sm",
                  path === l.to
                    ? "bg-primary text-white"
                    : "bg-white text-ink hover:bg-amber",
                )}
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>
          <div className="border-t-2 border-black bg-white px-4 py-4">
            <div className="flex border-2 border-black p-1">
              {(["ar", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    "flex-1 px-3 py-2.5 text-sm font-extrabold",
                    lang === l ? "bg-primary text-white" : "bg-white text-muted-foreground",
                  )}
                >
                  {l === "ar" ? "العربية" : "EN"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
