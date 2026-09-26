import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import type { Product } from "@/lib/menu-data";

export function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (p: Product) => void;
}) {
  const { pick, t, money } = useLang();
  const { lines, add, setQuantity } = useCart();

  const simpleLine = lines.find((l) => l.lineId === `${product.id}__`);
  const hasOptions = !!product.optionGroups?.length;

  const handleAdd = () => {
    if (hasOptions) {
      onOpen(product);
      return;
    }
    add(product, 1, []);
    toast.success(t("addedToCart"), { description: pick(product.nameAr, product.nameEn) });
  };

  return (
    <article className="flex h-full flex-col overflow-hidden border-2 border-black bg-white hard-shadow">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative block w-full border-b-2 border-black"
        aria-label={pick(product.nameAr, product.nameEn)}
      >
        <img
          src={product.image}
          alt={pick(product.nameAr, product.nameEn)}
          loading="lazy"
          width={800}
          height={800}
          className="aspect-square w-full object-cover"
        />
        {product.oldPrice && (
          <span className="sticker absolute top-3 start-3 z-10">
            -{Math.round(100 - (product.price / product.oldPrice) * 100)}%
          </span>
        )}
        {product.popular && !product.oldPrice && (
          <span className="sticker absolute top-3 start-3 z-10 bg-primary text-white">
            {pick("هيت", "HOT")}
          </span>
        )}
        {!product.available && (
          <div className="absolute inset-0 grid place-items-center bg-ink/70 text-xs font-extrabold text-white">
            {t("soldOut")}
          </div>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 text-sm font-extrabold leading-snug">
          {pick(product.nameAr, product.nameEn)}
        </h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {pick(product.descAr, product.descEn)}
        </p>

        <div className="mt-auto flex flex-col gap-2.5 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="inline-flex items-center border-2 border-black bg-amber px-2.5 py-1.5 text-sm font-extrabold leading-none text-ink hard-shadow-sm">
              {money(product.price)}
            </span>
            {product.oldPrice ? (
              <span className="text-xs font-bold text-muted-foreground line-through">
                {money(product.oldPrice)}
              </span>
            ) : null}
          </div>

          {simpleLine ? (
            <div className="flex w-full items-center justify-between border-2 border-black bg-white hard-shadow-sm">
              <Button
                size="icon"
                variant="ghost"
                className="size-9 rounded-none"
                aria-label="-"
                onClick={() => setQuantity(simpleLine.lineId, simpleLine.quantity - 1)}
              >
                <Minus />
              </Button>
              <span className="text-sm font-extrabold">{simpleLine.quantity}</span>
              <Button
                size="icon"
                variant="ghost"
                className="size-9 rounded-none"
                aria-label="+"
                onClick={() => setQuantity(simpleLine.lineId, simpleLine.quantity + 1)}
              >
                <Plus />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="hero"
              disabled={!product.available}
              onClick={handleAdd}
              className="h-10 w-full text-xs sm:text-sm"
            >
              <Plus className="size-3.5" />
              {t("addToCart")}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
