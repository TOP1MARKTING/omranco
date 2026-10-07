/** Lightweight constants — safe for CartProvider / checkout without pulling menu-data. */

export const CURRENCY = { ar: "جنيه", en: "EGP" };

export const DELIVERY_FEE = 25;

/** Receives delivery orders, and pickup orders for branches without their own WhatsApp. */
export const ORDER_WHATSAPP = "201555218182";

export const deliveryZones = [
  { id: "z1", nameAr: "حي الجامعة", nameEn: "Hay El Gamaa" },
  { id: "z2", nameAr: "توريل", nameEn: "Toril" },
  { id: "z3", nameAr: "المشاية", nameEn: "El Mashaya" },
  { id: "z4", nameAr: "وسط البلد", nameEn: "Downtown Mansoura" },
  { id: "z5", nameAr: "جيهان", nameEn: "Gehan Street" },
];
