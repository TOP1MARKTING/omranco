/**
 * Local mock order helpers — replace with API/backend later.
 */

import type { CartLine, Fulfillment } from "@/lib/cart";

export type OrderStatus =
  | "received"
  | "preparing"
  | "ready"
  | "on_the_way"
  | "delivered";

export interface MockOrder {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  fulfillment: Fulfillment;
  branchId?: string;
  area?: string;
  address?: string;
  landmark?: string;
  driverNotes?: string;
  payment: "cod";
  lines: CartLine[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
}

const STORAGE_KEY = "omranco.lastOrder";

export function saveLastOrder(order: MockOrder) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export function loadLastOrder(): MockOrder | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MockOrder;
  } catch {
    return null;
  }
}

export function createOrderId() {
  return String(1000 + Math.floor(Math.random() * 9000));
}
