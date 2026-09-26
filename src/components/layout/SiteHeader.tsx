import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", key: "home" },
  { to: "/menu", key: "menu" },
  { to: "/offers", key: "offers" },
  { to: "/branches", key: "branches" },
  { to: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const { t, lang, setLang } = useLang();
  const { count, setOpen } = useCart();
  const [navOpen, setNavOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.65rem,env(safe-area-inset-top))] sm:px-4 sm:pt-3 lg:px-0 lg:pt-0">
      <div className="pointer-events-auto mx-auto max-w-5xl overflow-hidden border-2 border-black bg-white hard-shadow lg:max-w-none lg:rounded-none lg:border-x-0 lg:border-t-0 lg:[box-shadow:0_4px_0_0_#000]">
        <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-1 px-1.5 sm:h-[3.75rem] sm:px-2 lg:px-6 xl:px-10">
          {/* Start (RTL = right): menu + desktop nav */}
          <div className="flex items-center justify-self-start gap-1">
            <Sheet open={navOpen} onOpenChange={setNavOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 shrink-0 border-2 border-black hard-shadow-sm lg:hidden"
                  aria-label={t("menu")}
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
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
                      onClick={() => setNavOpen(false)}
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
                        onClick={() => setNavOpen(false)}
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

            <nav className="hidden items-center gap-1.5 lg:flex">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "border-2 border-black px-3 py-1.5 text-sm font-extrabold transition-transform hover:-translate-x-px hover:-translate-y-px",
                    path === l.to
                      ? "bg-primary text-white hard-shadow-sm"
                      : "bg-white text-ink hover:bg-amber hard-shadow-sm",
                  )}
                >
                  {t(l.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center logo */}
          <Link to="/" className="justify-self-center">
            <Logo className="size-10 rounded-none sm:size-12" />
          </Link>

          {/* End actions */}
          <div className="flex items-center justify-end justify-self-end gap-1.5">
            <div className="hidden items-center border-2 border-black p-0.5 hard-shadow-sm sm:flex">
              {(["ar", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    "px-2.5 py-1 text-xs font-extrabold",
                    lang === l ? "bg-primary text-white" : "bg-white text-muted-foreground",
                  )}
                >
                  {l === "ar" ? "ع" : "EN"}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="relative size-9 shrink-0 border-2 border-black hard-shadow-sm"
              onClick={() => setOpen(true)}
              aria-label={t("cart")}
            >
              <ShoppingBag className="size-5" />
              {count > 0 && (
                <span className="animate-pop absolute -top-1.5 -end-1.5 grid min-w-5 place-items-center border-2 border-black bg-primary px-1 text-[10px] font-extrabold text-white">
                  {count}
                </span>
              )}
            </Button>

            <Button
              asChild
              variant="hero"
              className="hidden h-9 px-4 text-sm font-extrabold lg:inline-flex"
            >
              <Link to="/menu">{t("orderNow")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
