import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";

export function CartLines() {
  const { lines, setQuantity, remove } = useCart();
  const { pick, money, t } = useLang();

  return (
    <ul className="space-y-3">
      {lines.map((line) => (
        <li key={line.lineId} className="flex gap-3 border-2 border-black bg-white p-3 hard-shadow-sm">
          <img
            src={line.image}
            alt={pick(line.nameAr, line.nameEn)}
            loading="lazy"
            width={160}
            height={160}
            className="size-20 shrink-0 border-2 border-black object-cover"
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate text-sm font-extrabold">{pick(line.nameAr, line.nameEn)}</h3>
              <button
                type="button"
                onClick={() => remove(line.lineId)}
                aria-label={t("remove")}
                className="border-2 border-black p-1 hover:bg-primary hover:text-white"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            {line.options.length > 0 && (
              <p className="truncate text-xs text-muted-foreground">
                {line.options.map((o) => pick(o.choice.nameAr, o.choice.nameEn)).join("، ")}
              </p>
            )}
            <div className="mt-auto flex items-center justify-between gap-2 pt-2">
              <div className="flex items-center border-2 border-black">
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7 rounded-none"
                  aria-label="-"
                  onClick={() => setQuantity(line.lineId, line.quantity - 1)}
                >
                  <Minus />
                </Button>
                <span className="w-6 border-x-2 border-black text-center text-sm font-extrabold">
                  {line.quantity}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7 rounded-none"
                  aria-label="+"
                  onClick={() => setQuantity(line.lineId, line.quantity + 1)}
                >
                  <Plus />
                </Button>
              </div>
              <span className="border-2 border-black bg-amber px-2 py-1 text-xs font-extrabold text-ink">
                {money(line.unitPrice * line.quantity)}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CartSummary() {
  const { subtotal, deliveryFee, discount, total } = useCart();
  const { t, money } = useLang();
  const row = "flex items-center justify-between text-sm";

  return (
    <div className="space-y-2 border-2 border-black bg-amber/30 p-4">
      <div className={row}>
        <span className="font-bold text-muted-foreground">{t("subtotal")}</span>
        <span className="font-extrabold">{money(subtotal)}</span>
      </div>
      <div className={row}>
        <span className="font-bold text-muted-foreground">{t("delivery")}</span>
        <span className="font-extrabold">{money(deliveryFee)}</span>
      </div>
      <div className={row}>
        <span className="font-bold text-muted-foreground">{t("discount")}</span>
        <span className="font-extrabold">- {money(discount)}</span>
      </div>
      <div className="mt-2 flex items-center justify-between border-t-2 border-black pt-3 text-base">
        <span className="font-extrabold">{t("total")}</span>
        <span className="border-2 border-black bg-primary px-2 py-1 font-extrabold text-white">
          {money(total)}
        </span>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { isOpen, setOpen, lines } = useCart();
  const { t, lang } = useLang();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side={lang === "ar" ? "left" : "right"}
        className="flex w-full flex-col gap-0 border-2 border-black p-0 sm:max-w-md [&>button]:hidden"
      >
        <div className="flex items-center justify-between border-b-2 border-black bg-ink px-5 py-4 text-white">
          <SheetTitle className="text-lg font-extrabold text-white">{t("cart")}</SheetTitle>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="border border-white/40 bg-primary px-2 py-1 text-xs font-extrabold"
          >
            ✕
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-white p-8 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" />
            <p className="text-lg font-extrabold">{t("emptyCart")}</p>
            <p className="text-sm text-muted-foreground">{t("emptyCartSub")}</p>
            <Button asChild variant="hero" onClick={() => setOpen(false)}>
              <Link to="/menu">{t("viewMenu")}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto bg-white p-4">
              <CartLines />
            </div>
            <div className="space-y-3 border-t-2 border-black bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <CartSummary />
              <Button asChild variant="hero" size="lg" className="w-full" onClick={() => setOpen(false)}>
                <Link to="/checkout">{t("checkout")}</Link>
              </Button>
              <Button asChild variant="outline" className="w-full" onClick={() => setOpen(false)}>
                <Link to="/cart">{t("cartPage")}</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
