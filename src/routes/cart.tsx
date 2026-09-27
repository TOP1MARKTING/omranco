import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { CartLines, CartSummary } from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "السلة | OMRANCO BURGER" },
      { name: "description", content: "راجع سلة طلبك من عمرانكو برجر وأكمِل الطلب." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines } = useCart();
  const { t } = useLang();

  return (
    <div className="red-grid min-h-[70vh] py-8 sm:py-10">
      <div className="brand-container">
        <div className="mb-6 border-2 border-black bg-white p-4 hard-shadow sm:p-5">
          <p className="font-brand text-xs tracking-[0.18em] text-ink/45">CART.EXE</p>
          <h1 className="omranco-display mt-1 text-primary !text-[clamp(1.75rem,4vw,2.75rem)]">
            {t("cartPage")}
          </h1>
        </div>

        {lines.length === 0 ? (
          <div className="mx-auto w-full max-w-md border-2 border-black bg-white hard-shadow">
            <div className="flex flex-col items-center gap-3 bg-white px-6 py-12 text-center">
              <span className="grid size-16 place-items-center border-2 border-black bg-amber hard-shadow-sm">
                <ShoppingBag className="size-8 text-ink" />
              </span>
              <p className="omranco-display text-primary !text-[clamp(1.6rem,7vw,2.1rem)]">{t("emptyCart")}</p>
              <p className="text-sm text-muted-foreground">{t("emptyCartSub")}</p>
              <Button asChild variant="hero" className="mt-1">
                <Link to="/menu">{t("emptyCartCta")}</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="border-2 border-black bg-white p-4 hard-shadow">
              <CartLines />
            </div>
            <div className="space-y-3 lg:sticky lg:top-24 lg:self-start">
              <div className="border-2 border-black bg-white p-4 hard-shadow">
                <CartSummary />
              </div>
              <Button asChild variant="hero" size="lg" className="w-full">
                <Link to="/checkout">{t("checkout")}</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-white">
                <Link to="/menu">{t("continueShopping")}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
