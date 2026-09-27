import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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
  const { t, lang, dir, pick } = useLang();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side={lang === "ar" ? "left" : "right"}
        className="flex w-full flex-col gap-0 border-2 border-black p-0 sm:max-w-md [&>button]:hidden"
      >
        <div className="os-titlebar shrink-0" dir="ltr">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-7 place-items-center border border-white/40 bg-primary text-white"
            aria-label={pick("إغلاق", "Close")}
          >
            <X className="size-4" strokeWidth={2.5} />
          </button>
          <span className="size-3 border border-white/30 bg-amber" />
          <span className="size-3 border border-white/30 bg-white/90" />
          <span className="ms-2 font-brand text-[10px] tracking-[0.16em] text-white/75">CART.EXE</span>
          <SheetTitle className={cn("text-sm font-extrabold text-white", dir === "rtl" && "ms-auto")}>
            {t("cart")}
          </SheetTitle>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center bg-white p-6">
            <div className="w-full max-w-sm border-2 border-black bg-white hard-shadow">
              <div className="flex flex-col items-center gap-3 bg-white px-6 py-8 text-center">
                <span className="grid size-16 place-items-center border-2 border-black bg-amber hard-shadow-sm">
                  <ShoppingBag className="size-8 text-ink" />
                </span>
                <p className="omranco-display text-primary !text-[clamp(1.6rem,7vw,2.1rem)]">{t("emptyCart")}</p>
                <p className="text-sm text-muted-foreground">{t("emptyCartSub")}</p>
                <Button asChild variant="hero" className="mt-1" onClick={() => setOpen(false)}>
                  <Link to="/menu">{t("viewMenu")}</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-1 flex-col overflow-y-auto bg-white p-4">
              <CartLines />
              <p className="omranco-display mt-auto py-8 text-center text-primary !text-[clamp(1.35rem,6vw,1.85rem)]">
                بالهنا يا عمري
              </p>
            </div>
            <div className="space-y-3 border-t-2 border-black bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <CartSummary />
              <Button asChild variant="hero" size="lg" className="w-full" onClick={() => setOpen(false)}>
                <Link to="/checkout">{t("checkout")}</Link>
              </Button>
              <Button asChild variant="outline" className="w-full" onClick={() => setOpen(false)}>
                <Link to="/menu">{t("addMoreFood")}</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
