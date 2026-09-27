import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ar" | "en";

const STORAGE_KEY = "omranco.lang";

const dict = {
  brand: { ar: "عمرانكو برجر", en: "OMRANCO BURGER" },
  home: { ar: "الرئيسية", en: "Home" },
  menu: { ar: "المنيو", en: "Menu" },
  offers: { ar: "العروض", en: "Offers" },
  about: { ar: "عن عمرانكو", en: "About" },
  branches: { ar: "الفروع", en: "Branches" },
  contact: { ar: "تواصل معنا", en: "Contact" },
  account: { ar: "حسابي", en: "Account" },
  orderNow: { ar: "اطلب الآن", en: "Order now" },
  viewMenu: { ar: "شوف المنيو", en: "View menu" },
  cart: { ar: "السلة", en: "Cart" },
  heroTitle: { ar: "جاهز تجرب\nعروض عمرانكو؟", en: "Ready to try\nOMRANCO offers?" },
  heroSub: {
    ar: "اختار أكلك واطلبه دلوقتي",
    en: "Pick your food and order now",
  },
  quickOrder: { ar: "اختار أكلك", en: "Pick your food" },
  popular: { ar: "الأكثر طلبًا", en: "Most ordered" },
  offersTitle: { ar: "جرب الجديد", en: "Try what's new" },
  search: { ar: "دور على أكلك...", en: "Search for your food..." },
  all: { ar: "الكل", en: "All" },
  addToCart: { ar: "أضف للسلة", en: "Add to cart" },
  soldOut: { ar: "غير متاح حاليًا", en: "Currently unavailable" },
  quantity: { ar: "الكمية", en: "Quantity" },
  subtotal: { ar: "الإجمالي الفرعي", en: "Subtotal" },
  delivery: { ar: "التوصيل", en: "Delivery" },
  discount: { ar: "الخصم", en: "Discount" },
  total: { ar: "الإجمالي", en: "Total" },
  checkout: { ar: "إتمام الطلب", en: "Checkout" },
  emptyCart: { ar: "سلتك فاضية", en: "Your cart is empty" },
  emptyCartSub: { ar: "ابدأ من المنيو واختار أكلك.", en: "Start from the menu and pick your food." },
  remove: { ar: "حذف", en: "Remove" },
  currency: { ar: "جنيه", en: "EGP" },
  demoData: {
    ar: "بيانات تجريبية — هتتبدل بالمنيو الحقيقي",
    en: "Demo data — to be replaced with the real menu",
  },
  addedToCart: { ar: "تمت الإضافة للسلة", en: "Added to cart" },
  callBranch: { ar: "اتصل بالفرع", en: "Call branch" },
  showLocation: { ar: "عرض الموقع", en: "Show location" },
  noResults: { ar: "مفيش نتائج للبحث ده", en: "No results for this search" },
  checkoutTitle: { ar: "إتمام الطلب", en: "Checkout" },
  customerDetails: { ar: "بيانات العميل", en: "Customer details" },
  name: { ar: "الاسم", en: "Name" },
  phone: { ar: "رقم الموبايل", en: "Mobile number" },
  orderType: { ar: "نوع الطلب", en: "Order type" },
  deliveryType: { ar: "توصيل", en: "Delivery" },
  pickupType: { ar: "استلام من الفرع", en: "Pickup from branch" },
  deliveryDetails: { ar: "بيانات التوصيل", en: "Delivery details" },
  area: { ar: "المنطقة", en: "Area" },
  address: { ar: "العنوان بالتفصيل", en: "Full address" },
  landmark: { ar: "علامة مميزة", en: "Landmark" },
  driverNotes: { ar: "ملاحظات للسائق", en: "Notes for driver" },
  payment: { ar: "طريقة الدفع", en: "Payment method" },
  cashOnDelivery: { ar: "الدفع عند الاستلام", en: "Cash on delivery" },
  orderSummary: { ar: "ملخص الطلب", en: "Order summary" },
  confirmOrder: { ar: "تأكيد الطلب", en: "Confirm order" },
  required: { ar: "مطلوب", en: "Required" },
  cartPage: { ar: "سلة الطلبات", en: "Your cart" },
  addMoreFood: { ar: "زود أكل يا عمري", en: "Add more food" },
  continueShopping: { ar: "كمّل تسوق", en: "Continue shopping" },
  orderSuccessTitle: { ar: "طلبك وصل لعمرانكو ❤️", en: "Your order reached OMRANCO ❤️" },
  orderSuccessSub: { ar: "هنبدأ تجهيز طلبك دلوقتي.", en: "We'll start preparing your order now." },
  orderNumber: { ar: "رقم الطلب", en: "Order number" },
  statusReceived: { ar: "تم استلام الطلب", en: "Order received" },
  statusPreparing: { ar: "جاري التحضير", en: "Preparing" },
  statusReady: { ar: "جاهز", en: "Ready" },
  statusOnTheWay: { ar: "في الطريق", en: "On the way" },
  statusDelivered: { ar: "تم التوصيل", en: "Delivered" },
  backHome: { ar: "الرجوع للرئيسية", en: "Back home" },
  aboutTitle: { ar: "عمرانكو برجر", en: "OMRANCO BURGER" },
  aboutBody: {
    ar: "من المنصورة — سندوتشات وذكريات. لحم بلدي، طعم صريح، وفرعين جاهزين تستلم أو توصّل.",
    en: "From Mansoura — sandwiches and memories. Local beef, honest taste, two branches for pickup or delivery.",
  },
  slogan: {
    ar: "بنبني سندوتشات، بنبني ذكريات",
    en: "Building sandwiches, building memories",
  },
  followIg: { ar: "إنستجرام عمرانكو", en: "OMRANCO on Instagram" },
  contactTitle: { ar: "تواصل معنا", en: "Contact us" },
  contactBody: {
    ar: "كلمنا على الأرقام دي أو زور أقرب فرع.",
    en: "Call us on these numbers or visit the nearest branch.",
  },
  selectArea: { ar: "اختار المنطقة", en: "Select area" },
  stickyCheckout: { ar: "إتمام الطلب", en: "Checkout" },
  itemsInCart: { ar: "منتجات في السلة", en: "items in cart" },
  pickBranch: { ar: "اختار الفرع", en: "Choose branch" },
  namePlaceholder: { ar: "مثال: أحمد محمد", en: "e.g. Ahmed Mohamed" },
  phonePlaceholder: { ar: "01xxxxxxxxx", en: "01xxxxxxxxx" },
  addressPlaceholder: { ar: "الشارع، العمارة، الدور...", en: "Street, building, floor..." },
  landmarkPlaceholder: { ar: "جنب مسجد / صيدلية...", en: "Near mosque / pharmacy..." },
  notesPlaceholder: { ar: "أي ملاحظات للتوصيل...", en: "Any delivery notes..." },
  emptyCartCta: { ar: "شوف المنيو", en: "View menu" },
  branchesTitle: { ar: "فروع عمرانكو", en: "OMRANCO branches" },
  offersDemo: {
    ar: "عروض تجريبية — هتتبدل بالعروض الحقيقية",
    en: "Demo offers — to be replaced with real promotions",
  },
} as const;

export type TKey = keyof typeof dict;

interface LangCtx {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  t: (k: TKey) => string;
  pick: (ar: string, en: string) => string;
  money: (n: number) => string;
}

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo<LangCtx>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      t: (k) => dict[k][lang],
      pick: (ar, en) => (lang === "ar" ? ar : en),
      money: (n) =>
        lang === "ar"
          ? `${n.toLocaleString("ar-EG")} جنيه`
          : `${n.toLocaleString("en-US")} EGP`,
    }),
    [lang, setLang],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
