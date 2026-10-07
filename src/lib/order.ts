/**
 * Orders are sent by the customer from their own WhatsApp — the site only writes the message.
 */

import type { CartLine, Fulfillment } from "@/lib/cart";
import { ORDER_WHATSAPP, deliveryZones } from "@/lib/menu-constants";
import type { Branch } from "@/lib/menu-types";

export interface OrderDetails {
  customerName: string;
  phone: string;
  fulfillment: Fulfillment;
  branch?: Branch | undefined;
  areaId?: string | undefined;
  address?: string | undefined;
  landmark?: string | undefined;
  notes?: string | undefined;
  lines: CartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export interface LastOrder {
  id: string;
  total: number;
  fulfillment: Fulfillment;
  branchId?: string | undefined;
  whatsappUrl: string;
}

const STORAGE_KEY = "omranco.lastOrder";

export function createOrderId() {
  const time = Date.now().toString(36).slice(-3);
  const rand = Math.floor(Math.random() * 36 ** 2)
    .toString(36)
    .padStart(2, "0");
  return `${time}${rand}`.toUpperCase();
}

const DIVIDER = "━━━━━━━━━━━━━━";

export function buildOrderMessage(order: OrderDetails, orderId: string) {
  const where =
    order.fulfillment === "pickup"
      ? [`🏪 *استلام من:* ${order.branch?.nameAr ?? "الفرع"}`]
      : [
          `🛵 *توصيل:* ${deliveryZones.find((z) => z.id === order.areaId)?.nameAr ?? ""}`,
          order.address && `📍 *العنوان:* ${order.address}`,
          order.landmark && `🏷️ *علامة مميزة:* ${order.landmark}`,
        ].filter((line): line is string => Boolean(line));

  const items = order.lines.flatMap((l) => [
    `▪️ *${l.quantity}× ${l.nameAr}* — ${l.unitPrice * l.quantity} جنيه`,
    ...(l.options.length ? [`      ↳ ${l.options.map((o) => o.choice.nameAr).join("، ")}`] : []),
  ]);

  return [
    "🍔 *طلب جديد — عمرانكو برجر*",
    `🧾 رقم الطلب: *#${orderId}*`,
    DIVIDER,
    `👤 *الاسم:* ${order.customerName}`,
    `📞 *الموبايل:* ${order.phone}`,
    ...where,
    ...(order.notes ? [`📝 *ملاحظات:* ${order.notes}`] : []),
    DIVIDER,
    "🛒 *الطلبات:*",
    ...items,
    DIVIDER,
    `المجموع: ${order.subtotal} جنيه`,
    ...(order.deliveryFee ? [`التوصيل: ${order.deliveryFee} جنيه`] : []),
    `💰 *الإجمالي: ${order.total} جنيه*`,
    "💵 الدفع كاش عند الاستلام",
  ].join("\n");
}

export function orderWhatsAppUrl(order: OrderDetails, message: string) {
  const to = (order.fulfillment === "pickup" && order.branch?.whatsapp) || ORDER_WHATSAPP;
  return `https://api.whatsapp.com/send?phone=${to}&text=${encodeURIComponent(message)}`;
}

export function saveLastOrder(order: LastOrder) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    /* ignore */
  }
}

export function loadLastOrder(): LastOrder | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LastOrder;
  } catch {
    return null;
  }
}
