import { Link, useRouterState } from "@tanstack/react-router";
import { Phone, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";

/**
 * Mobile-only floating order dock — replaces the generic 5-tab app bar.
 * Empty cart: منيو + اتصال. With items: open cart with total.
 */
export function MobileOrderDock() {
  const { t, money } = useLang();
  const { count, total, setOpen } = useCart();
  const path = useRouterState({ select: (s) => s.location.pathname });

  if (path === "/checkout" || path === "/order-success") return null;

  if (count > 0) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center gap-3 rounded-2xl bg-primary px-4 py-3.5 text-primary-foreground shadow-lg"
        >
          <span className="relative grid size-10 place-items-center rounded-xl bg-white/15">
            <ShoppingBag className="size-5" />
            <span className="absolute -top-1.5 -end-1.5 grid min-w-5 place-items-center rounded-full bg-ink px-1 text-[10px] font-extrabold text-white">
              {count}
            </span>
          </span>
          <span className="flex-1 text-start">
            <span className="block text-sm font-extrabold">{t("stickyCheckout")}</span>
            <span className="block text-xs text-white/80">{t("cart")}</span>
          </span>
          <span className="text-base font-extrabold">{money(total)}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2 lg:hidden">
      <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1.5 shadow-lg">
        <Link
          to="/menu"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-extrabold text-primary-foreground"
        >
          <UtensilsCrossed className="size-4" />
          {t("orderNow")}
        </Link>
        <a
          href="tel:01555218182"
          aria-label={t("phone")}
          className="grid size-11 place-items-center rounded-full text-foreground hover:bg-secondary"
        >
          <Phone className="size-5" />
        </a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("cart")}
          className="grid size-11 place-items-center rounded-full text-foreground hover:bg-secondary"
        >
          <ShoppingBag className="size-5" />
        </button>
      </div>
    </div>
  );
}
