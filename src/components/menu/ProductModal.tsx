import { Minus, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import type { OptionChoice, Product } from "@/lib/menu-data";
import { cn } from "@/lib/utils";

type Selected = { groupId: string; choice: OptionChoice };

export function ProductModal({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { pick, t, money, dir } = useLang();
  const { add } = useCart();
  const isMobile = useIsMobile();
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState<Selected[]>([]);

  useEffect(() => {
    if (!product || !open) return;
    setQuantity(1);
    const defaults: Selected[] = [];
    product.optionGroups?.forEach((g) => {
      if (g.type === "single" && g.required && g.choices[0]) {
        defaults.push({ groupId: g.id, choice: g.choices[0] });
      }
    });
    setSelected(defaults);
  }, [product, open]);

  const unitPrice = useMemo(
    () => (product ? product.price + selected.reduce((s, o) => s + o.choice.price, 0) : 0),
    [product, selected],
  );

  if (!product) return null;

  const isChoiceOn = (groupId: string, choiceId: string) =>
    selected.some((s) => s.groupId === groupId && s.choice.id === choiceId);

  const toggleSingle = (groupId: string, choice: OptionChoice) => {
    setSelected((prev) => [...prev.filter((s) => s.groupId !== groupId), { groupId, choice }]);
  };

  const toggleMulti = (groupId: string, choice: OptionChoice) => {
    setSelected((prev) => {
      const on = prev.some((s) => s.groupId === groupId && s.choice.id === choice.id);
      return on
        ? prev.filter((s) => !(s.groupId === groupId && s.choice.id === choice.id))
        : [...prev, { groupId, choice }];
    });
  };

  const submit = () => {
    add(product, quantity, selected);
    onOpenChange(false);
  };

  const chromeDir = dir === "rtl" ? "ltr" : "rtl";

  const body = (
    <div className="flex max-h-[92dvh] flex-col overflow-hidden bg-white">
      <div className="os-titlebar shrink-0" dir={chromeDir}>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="grid size-7 place-items-center border border-white/40 bg-primary text-white"
          aria-label={pick("رجوع", "Back")}
        >
          <X className="size-4" strokeWidth={2.5} />
        </button>
        <span className="size-3 border border-white/30 bg-amber" />
        <span className="size-3 border border-white/30 bg-white/90" />
        <span className="ms-2 font-brand text-[10px] tracking-[0.16em] text-white/75">
          ITEM.EXE
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="relative border-b-4 border-black">
          <img
            src={product.image}
            alt={pick(product.nameAr, product.nameEn)}
            width={640}
            height={480}
            decoding="async"
            className="aspect-[5/4] w-full object-cover sm:aspect-[16/10]"
          />
          {product.popular && (
            <span className="sticker absolute top-3 start-3 z-10 bg-primary text-white">
              {pick("حار", "HOT")}
            </span>
          )}
          {!product.available && (
            <div className="absolute inset-0 grid place-items-center bg-ink/70 text-sm font-extrabold text-white">
              {t("soldOut")}
            </div>
          )}
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <div className="text-center">
            <p className="font-brand text-[10px] tracking-[0.18em] text-ink/45">ORDER.TXT</p>
            <h2 className="omranco-display mt-1 text-primary !text-[clamp(1.7rem,6vw,2.5rem)]">
              {pick(product.nameAr, product.nameEn)}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              {pick(product.descAr, product.descEn)}
            </p>
          </div>

          <p className="flex w-full items-center justify-center border-2 border-black bg-amber px-4 py-3 text-lg font-extrabold text-ink hard-shadow">
            {money(unitPrice)}
          </p>

          {product.optionGroups?.map((group) => (
            <section key={group.id} className="os-window">
              <div className="os-titlebar" dir={chromeDir}>
                <span className="size-2.5 border border-white/30 bg-primary" />
                <span className="size-2.5 border border-white/30 bg-amber" />
                <span className="size-2.5 border border-white/30 bg-white/90" />
                <span
                  dir={dir}
                  className={cn("text-xs font-extrabold text-white", dir === "rtl" ? "ml-auto" : "mr-auto")}
                >
                  {pick(group.nameAr, group.nameEn)}
                  {group.required ? " *" : ""}
                </span>
              </div>
              <div className="space-y-2 bg-white p-3">
                {group.choices.map((c) => {
                  const on = isChoiceOn(group.id, c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() =>
                        group.type === "single"
                          ? toggleSingle(group.id, c)
                          : toggleMulti(group.id, c)
                      }
                      className={cn(
                        "flex w-full items-center justify-start gap-3 border-2 border-black px-3 py-2.5 text-start",
                        on ? "bg-primary text-white hard-shadow-sm" : "bg-white hover:bg-amber",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center border-2 border-black text-[10px] font-extrabold",
                          on ? "bg-amber text-ink" : "bg-white",
                          group.type === "single" && "rounded-full",
                        )}
                        aria-hidden
                      >
                        {on ? "✓" : ""}
                      </span>
                      <span className="text-sm font-extrabold">{pick(c.nameAr, c.nameEn)}</span>
                      {c.price > 0 && (
                        <span className={cn("ms-auto text-sm font-extrabold", on ? "text-amber" : "text-primary")}>
                          +{money(c.price)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="shrink-0 border-t-4 border-black bg-white p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2">
          <div className="flex shrink-0 items-center border-2 border-black bg-white hard-shadow-sm">
            <button
              type="button"
              className="grid size-11 place-items-center font-extrabold hover:bg-amber"
              aria-label="-"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Minus className="size-4" />
            </button>
            <span className="min-w-8 border-x-2 border-black py-2 text-center text-base font-extrabold">
              {quantity}
            </span>
            <button
              type="button"
              className="grid size-11 place-items-center font-extrabold hover:bg-amber"
              aria-label="+"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <Plus className="size-4" />
            </button>
          </div>

          <button
            type="button"
            disabled={!product.available}
            onClick={submit}
            className="flex h-11 min-w-0 flex-1 items-center justify-center border-2 border-black bg-primary px-3 text-sm font-extrabold text-white hard-shadow transition active:translate-x-px active:translate-y-px active:shadow-none disabled:opacity-50"
          >
            <span className="truncate">
              {t("addToCart")} — {money(unitPrice * quantity)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange} shouldScaleBackground={false}>
        <DrawerContent className="overflow-hidden rounded-none border-2 border-black p-0 [&>div:first-child]:hidden">
          <DrawerTitle className="sr-only">{pick(product.nameAr, product.nameEn)}</DrawerTitle>
          {body}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg overflow-hidden rounded-none border-2 border-black p-0 [&>button]:hidden">
        <DialogTitle className="sr-only">{pick(product.nameAr, product.nameEn)}</DialogTitle>
        {body}
      </DialogContent>
    </Dialog>
  );
}
