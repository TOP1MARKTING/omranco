import { lazy, Suspense } from "react";
import type { Product } from "@/lib/menu-types";

const ProductModal = lazy(() =>
  import("@/components/menu/ProductModal").then((m) => ({ default: m.ProductModal })),
);

type Props = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Loads ProductModal (Vaul / Radix) only when a product is selected.
 */
export function DeferredProductModal({ product, open, onOpenChange }: Props) {
  if (!open || !product) return null;

  return (
    <Suspense fallback={null}>
      <ProductModal product={product} open={open} onOpenChange={onOpenChange} />
    </Suspense>
  );
}
