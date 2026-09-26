import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import type { OptionChoice, Product } from "@/lib/menu-data";

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
  const { pick, t, money } = useLang();
  const { add } = useCart();
  const isMobile = useIsMobile();
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState<Selected[]>([]);

  useEffect(() => {
    if (!product) return;
    setQuantity(1);
    const defaults: Selected[] = [];
    product.optionGroups?.forEach((g) => {
      if (g.type === "single" && g.required && g.choices[0]) {
        defaults.push({ groupId: g.id, choice: g.choices[0] });
      }
    });
    setSelected(defaults);
  }, [product]);

  const unitPrice = useMemo(
    () => (product ? product.price + selected.reduce((s, o) => s + o.choice.price, 0) : 0),
    [product, selected],
  );

  if (!product) return null;

  const toggleSingle = (groupId: string, choice: OptionChoice) =>
    setSelected((prev) => [...prev.filter((s) => s.groupId !== groupId), { groupId, choice }]);

  const toggleMulti = (groupId: string, choice: OptionChoice, on: boolean) =>
    setSelected((prev) =>
      on
        ? [...prev, { groupId, choice }]
        : prev.filter((s) => !(s.groupId === groupId && s.choice.id === choice.id)),
    );

  const submit = () => {
    add(product, quantity, selected);
    toast.success(t("addedToCart"), { description: pick(product.nameAr, product.nameEn) });
    onOpenChange(false);
  };

  const body = (
    <div className="flex max-h-[85vh] flex-col overflow-hidden bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <img
          src={product.image}
          alt={pick(product.nameAr, product.nameEn)}
          width={800}
          height={800}
          className="aspect-[16/10] w-full border-b-2 border-black object-cover"
        />
        <div className="space-y-5 p-5">
          <div>
            <h2 className="text-2xl font-extrabold">{pick(product.nameAr, product.nameEn)}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {pick(product.descAr, product.descEn)}
            </p>
            <p className="mt-3 inline-flex border-2 border-black bg-amber px-3 py-1.5 text-base font-extrabold text-ink hard-shadow-sm">
              {money(product.price)}
            </p>
          </div>

          {product.optionGroups?.map((group) => (
            <section key={group.id} className="border-2 border-black bg-white p-4 hard-shadow-sm">
              <h3 className="mb-3 text-sm font-extrabold">
                {pick(group.nameAr, group.nameEn)}
                {group.required && <span className="ms-2 text-xs text-primary">*</span>}
              </h3>

              {group.type === "single" ? (
                <RadioGroup
                  value={selected.find((s) => s.groupId === group.id)?.choice.id}
                  onValueChange={(v) => {
                    const c = group.choices.find((x) => x.id === v);
                    if (c) toggleSingle(group.id, c);
                  }}
                  className="space-y-2"
                >
                  {group.choices.map((c) => (
                    <label
                      key={c.id}
                      className="flex cursor-pointer items-center gap-3 border border-transparent px-2 py-2 hover:bg-amber/40"
                    >
                      <RadioGroupItem value={c.id} id={`${group.id}-${c.id}`} />
                      <span className="flex-1 text-sm font-bold">{pick(c.nameAr, c.nameEn)}</span>
                      {c.price > 0 && (
                        <span className="text-sm font-bold text-primary">+{money(c.price)}</span>
                      )}
                    </label>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-2">
                  {group.choices.map((c) => {
                    const on = selected.some(
                      (s) => s.groupId === group.id && s.choice.id === c.id,
                    );
                    return (
                      <label
                        key={c.id}
                        className="flex cursor-pointer items-center gap-3 px-2 py-2 hover:bg-amber/40"
                      >
                        <Checkbox
                          checked={on}
                          onCheckedChange={(v) => toggleMulti(group.id, c, v === true)}
                        />
                        <span className="flex-1 text-sm font-bold">{pick(c.nameAr, c.nameEn)}</span>
                        <span className="text-sm font-bold text-primary">+{money(c.price)}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      <div className="shrink-0 border-t-2 border-black bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-3">
          <div className="flex shrink-0 items-center border-2 border-black bg-white">
            <button
              type="button"
              className="grid size-11 place-items-center font-extrabold hover:bg-muted"
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
              className="grid size-11 place-items-center font-extrabold hover:bg-muted"
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
            className="flex h-11 min-w-0 flex-1 items-center justify-center border-2 border-black bg-primary px-3 text-sm font-extrabold text-white hard-shadow-sm transition active:translate-x-px active:translate-y-px active:shadow-none disabled:opacity-50"
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
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="overflow-hidden rounded-none border-2 border-black p-0">
          <DrawerTitle className="sr-only">{pick(product.nameAr, product.nameEn)}</DrawerTitle>
          {body}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg overflow-hidden rounded-none border-2 border-black p-0">
        <DialogTitle className="sr-only">{pick(product.nameAr, product.nameEn)}</DialogTitle>
        {body}
      </DialogContent>
    </Dialog>
  );
}
