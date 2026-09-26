import { useRouterState } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";

export function StickyCartBar() {
  const { count, total, setOpen } = useCart();
  const { t, money } = useLang();
  const path = useRouterState({ select: (s) => s.location.pathname });

  if (count === 0) return null;
  if (path === "/checkout" || path === "/cart" || path === "/order-success") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 hidden px-6 lg:block">
      <div className="pointer-events-auto ms-auto flex max-w-sm justify-end">
        <Button
          variant="hero"
          size="lg"
          className="w-full"
          onClick={() => setOpen(true)}
        >
          <ShoppingBag className="shrink-0" />
          <span className="min-w-0 flex-1 truncate text-start text-sm sm:text-base">
            {t("stickyCheckout")}
            <span className="opacity-80"> · {count}</span>
          </span>
          <span className="shrink-0 border border-white/40 bg-white/15 px-2 py-0.5 text-sm sm:text-base">
            {money(total)}
          </span>
        </Button>
      </div>
    </div>
  );
}
