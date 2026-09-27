import { lazy, Suspense, useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const CartDrawer = lazy(() =>
  import("@/components/cart/CartDrawer").then((m) => ({ default: m.CartDrawer })),
);

/**
 * Loads CartDrawer (Sheet / Radix dialog) only after the drawer is opened once.
 * CartProvider stays eager; only the heavy UI shell is deferred.
 */
export function DeferredCartDrawer() {
  const { isOpen } = useCart();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (isOpen) setLoad(true);
  }, [isOpen]);

  if (!load) return null;

  return (
    <Suspense fallback={null}>
      <CartDrawer />
    </Suspense>
  );
}
