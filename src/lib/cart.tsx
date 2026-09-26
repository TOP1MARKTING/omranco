import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DELIVERY_FEE, type OptionChoice, type Product } from "@/lib/menu-data";

export type Fulfillment = "delivery" | "pickup";

export interface CartLine {
  lineId: string;
  productId: string;
  nameAr: string;
  nameEn: string;
  image: string;
  unitPrice: number;
  quantity: number;
  options: { groupId: string; choice: OptionChoice }[];
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  fulfillment: Fulfillment;
  setFulfillment: (f: Fulfillment) => void;
  isOpen: boolean;
  setOpen: (o: boolean) => void;
  add: (
    product: Product,
    quantity: number,
    options: { groupId: string; choice: OptionChoice }[],
  ) => void;
  setQuantity: (lineId: string, q: number) => void;
  remove: (lineId: string) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "omranco.cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [fulfillment, setFulfillment] = useState<Fulfillment>("delivery");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const add = useCallback<CartCtx["add"]>((product, quantity, options) => {
    const signature = options
      .map((o) => `${o.groupId}:${o.choice.id}`)
      .sort()
      .join("|");
    const lineId = `${product.id}__${signature}`;
    const unitPrice = product.price + options.reduce((s, o) => s + o.choice.price, 0);
    setLines((prev) => {
      const existing = prev.find((l) => l.lineId === lineId);
      if (existing) {
        return prev.map((l) =>
          l.lineId === lineId ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [
        ...prev,
        {
          lineId,
          productId: product.id,
          nameAr: product.nameAr,
          nameEn: product.nameEn,
          image: product.image,
          unitPrice,
          quantity,
          options,
        },
      ];
    });
  }, []);

  const setQuantity = useCallback((lineId: string, q: number) => {
    setLines((prev) =>
      q <= 0
        ? prev.filter((l) => l.lineId !== lineId)
        : prev.map((l) => (l.lineId === lineId ? { ...l, quantity: q } : l)),
    );
  }, []);

  const remove = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartCtx>(() => {
    const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
    const deliveryFee =
      lines.length && fulfillment === "delivery" ? DELIVERY_FEE : 0;
    const discount = 0;
    return {
      lines,
      count: lines.reduce((s, l) => s + l.quantity, 0),
      subtotal,
      deliveryFee,
      discount,
      total: subtotal + deliveryFee - discount,
      fulfillment,
      setFulfillment,
      isOpen,
      setOpen,
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [lines, isOpen, fulfillment, add, setQuantity, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
