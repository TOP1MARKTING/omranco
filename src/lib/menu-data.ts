/**
 * OMRANCO BURGER real menu — sourced from the restaurant printed menu.
 * Replace later with API/Firebase; keep these shapes as the UI contract.
 */

import burgerImg from "@/assets/item-burger.jpg";
import chickenImg from "@/assets/item-chicken.jpg";
import sandwichImg from "@/assets/item-sandwich.jpg";
import mealImg from "@/assets/item-meal.jpg";
import friesImg from "@/assets/item-fries.jpg";
import drinkImg from "@/assets/item-drink.jpg";
import sticksBurgerImg from "@/assets/sticks-burger.png";

export type CategoryId =
  | "beef"
  | "chicken"
  | "appetizers"
  | "new"
  | "mix"
  | "combo"
  | "extras"
  | "kids";

export interface Category {
  id: CategoryId;
  nameAr: string;
  nameEn: string;
  image: string;
}

export interface OptionChoice {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
}

export interface OptionGroup {
  id: string;
  nameAr: string;
  nameEn: string;
  type: "single" | "multi";
  required?: boolean;
  choices: OptionChoice[];
}

export interface Product {
  id: string;
  categoryId: CategoryId;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  price: number;
  oldPrice?: number;
  image: string;
  available: boolean;
  popular?: boolean;
  optionGroups?: OptionGroup[];
}

export interface Offer {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  badgeAr: string;
  badgeEn: string;
  image: string;
}

export interface Branch {
  id: string;
  nameAr: string;
  nameEn: string;
  addressAr: string;
  addressEn: string;
  phone: string;
  mapUrl: string;
}

export const CURRENCY = { ar: "جنيه", en: "EGP" };

export const categories: Category[] = [
  { id: "beef", nameAr: "برجر لحم", nameEn: "Beef Burger", image: burgerImg },
  { id: "chicken", nameAr: "برجر تشيكن", nameEn: "Chicken Burger", image: chickenImg },
  { id: "appetizers", nameAr: "مقبلات", nameEn: "Appetizers", image: friesImg },
  { id: "new", nameAr: "الجديد", nameEn: "New Items", image: mealImg },
  { id: "mix", nameAr: "مكس", nameEn: "Mix", image: sandwichImg },
  { id: "combo", nameAr: "كومبو", nameEn: "Combo", image: drinkImg },
  { id: "extras", nameAr: "إضافات", nameEn: "Extras", image: friesImg },
  { id: "kids", nameAr: "وجبات أطفال", nameEn: "Kids Meals", image: mealImg },
];

/** Beef menu uses Single (S) as base price; Double (D) is an add-on. */
function beefSize(single: number, double: number): OptionGroup {
  return {
    id: "size",
    nameAr: "الحجم",
    nameEn: "Size",
    type: "single",
    required: true,
    choices: [
      { id: "single", nameAr: "سنجل (S)", nameEn: "Single (S)", price: 0 },
      {
        id: "double",
        nameAr: "دوبل (D)",
        nameEn: "Double (D)",
        price: double - single,
      },
    ],
  };
}

const sauceExtras: OptionGroup = {
  id: "extras",
  nameAr: "إضافات",
  nameEn: "Extras",
  type: "multi",
  choices: [
    { id: "coleslaw", nameAr: "كول سلو", nameEn: "Coleslaw", price: 25 },
    { id: "cheddar", nameAr: "شيدر", nameEn: "Cheddar", price: 20 },
    { id: "ranch", nameAr: "رانش", nameEn: "Ranch", price: 20 },
    { id: "texas-hot", nameAr: "تكساس حار", nameEn: "Texas Hot", price: 20 },
    { id: "texas", nameAr: "تكساس عادي", nameEn: "Texas", price: 20 },
    { id: "sweet-chili", nameAr: "سويت شيلي", nameEn: "Sweet Chili", price: 20 },
    { id: "mayo", nameAr: "مايونيز", nameEn: "Mayonnaise", price: 20 },
    { id: "thousand", nameAr: "1000 جزيرة", nameEn: "1000 Island", price: 20 },
  ],
};

export const products: Product[] = [
  // ─── BEEF BURGER ───────────────────────────────────────────────
  {
    id: "beef-ya-omry",
    categoryId: "beef",
    nameAr: "يا عمري برجر",
    nameEn: "Ya Omry Burger",
    descAr: "عيش كايزر + ١٥٠جم لحم بلدي + صوص كريمي + رانش + مشروم فريش + بصل مكرمل + خيار مخلل.",
    descEn: "Kaiser bun, 150g baladi beef, cream sauce, ranch, fresh mushrooms, caramelized onions, pickles.",
    price: 165,
    image: burgerImg,
    available: true,
    popular: true,
    optionGroups: [beefSize(165, 240), sauceExtras],
  },
  {
    id: "beef-omranco",
    categoryId: "beef",
    nameAr: "عمرانكو برجر",
    nameEn: "Omranco Burger",
    descAr: "عيش كايزر + ١٥٠جم لحم بلدي + صوص شيدر + صوص تكساس + خس + بصل مكرمل + خيار مخلل.",
    descEn: "Kaiser bun, 150g baladi beef, cheddar sauce, Texas sauce, lettuce, caramelized onions, pickles.",
    price: 170,
    image: burgerImg,
    available: true,
    popular: true,
    optionGroups: [beefSize(170, 245), sauceExtras],
  },
  {
    id: "beef-classic",
    categoryId: "beef",
    nameAr: "كلاسيك برجر",
    nameEn: "Classic Burger",
    descAr: "عيش كايزر + ١٥٠جم لحم بلدي + طماطم مشوية + بصل مشوي + خس + خيار مخلل + صوص ١٠٠٠ جزيرة + صوص شيدر.",
    descEn: "Kaiser bun, 150g baladi beef, grilled tomatoes, grilled onions, lettuce, pickles, 1000 island, cheddar sauce.",
    price: 145,
    image: burgerImg,
    available: true,
    popular: true,
    optionGroups: [beefSize(145, 220), sauceExtras],
  },
  {
    id: "beef-ya-weily",
    categoryId: "beef",
    nameAr: "يا ويلي برجر",
    nameEn: "Ya Weily Burger",
    descAr: "عيش كايزر + ١٥٠جم لحم بلدي + سويت شيلي + خس + صوص حار + هاليبينو + صوص شيدر + خيار مخلل.",
    descEn: "Kaiser bun, 150g baladi beef, sweet chili, lettuce, hot sauce, jalapeño, cheddar sauce, pickles.",
    price: 170,
    image: burgerImg,
    available: true,
    optionGroups: [beefSize(170, 245), sauceExtras],
  },
  {
    id: "beef-onion",
    categoryId: "beef",
    nameAr: "أونيون بيف برجر",
    nameEn: "Onion Beef Burger",
    descAr: "عيش كايزر + ١٥٠جم لحم بلدي + صوص شيدر + خس + باربيكيو + أونيون رينجز + خيار مخلل + مايونيز.",
    descEn: "Kaiser bun, 150g baladi beef, cheddar sauce, lettuce, BBQ, onion rings, pickles, mayonnaise.",
    price: 175,
    image: burgerImg,
    available: true,
    optionGroups: [beefSize(175, 250), sauceExtras],
  },
  {
    id: "beef-infinity",
    categoryId: "beef",
    nameAr: "إنفينيتي برجر",
    nameEn: "Infinity Burger",
    descAr: "عيش كايزر + ١٥٠جم لحم بلدي + صوص شيدر + بيف بيكون + مشروم فريش + باربيكيو + خيار مخلل + خس + مايونيز.",
    descEn: "Kaiser bun, 150g baladi beef, cheddar sauce, beef bacon, mushrooms, BBQ, pickles, lettuce, mayo.",
    price: 190,
    image: burgerImg,
    available: true,
    popular: true,
    optionGroups: [beefSize(190, 265), sauceExtras],
  },
  {
    id: "beef-hotdog",
    categoryId: "beef",
    nameAr: "هوت دوج برجر",
    nameEn: "Hot Dog Burger",
    descAr: "عيش كايزر + ١٥٠جم لحم بلدي + صوص شيدر + هوت دوج + طماطم مشوية + بصل + كاتشب + خيار مخلل + خس + مايونيز.",
    descEn: "Kaiser bun, 150g baladi beef, cheddar sauce, hot dog, grilled tomatoes, onions, ketchup, pickles, lettuce, mayo.",
    price: 175,
    image: burgerImg,
    available: true,
    optionGroups: [beefSize(175, 250), sauceExtras],
  },
  {
    id: "beef-sticks",
    categoryId: "beef",
    nameAr: "ستيكس برجر",
    nameEn: "Sticks Burger",
    descAr: "عيش كايزر + ١٥٠جم لحم بلدي + صوص شيدر + موتزاريلا ستيكس + رانش + خيار مخلل + خس + مايونيز.",
    descEn: "Kaiser bun, 150g baladi beef, cheddar sauce, mozzarella sticks, ranch, pickles, lettuce, mayo.",
    price: 175,
    image: sticksBurgerImg,
    available: true,
    popular: true,
    optionGroups: [beefSize(175, 250), sauceExtras],
  },
  {
    id: "beef-texas-wrap",
    categoryId: "beef",
    nameAr: "تكساس بيف راب",
    nameEn: "Texas Beef Wrap",
    descAr: "عيش تورتيلا + ٧٥جم لحم بلدي مفروم + موزاريلا + طماطم مشوية + بصل مشوي + خيار مخلل + خس.",
    descEn: "Tortilla, 75g minced baladi beef, mozzarella, grilled tomatoes, grilled onions, pickles, lettuce.",
    price: 115,
    image: sandwichImg,
    available: true,
    optionGroups: [beefSize(115, 155)],
  },
  {
    id: "beef-demi-glace-wrap",
    categoryId: "beef",
    nameAr: "ديمي جلاس راب",
    nameEn: "Demi-Glace Wrap",
    descAr: "عيش تورتيلا + ١٥٠جم برجر لحم بلدي + صوص ديمي جلاس بالمشروم + خس + طماطم + بصل + صوص شيدر + موزاريلا.",
    descEn: "Tortilla, 150g baladi beef patty, mushroom demi-glace, lettuce, tomatoes, onions, cheddar sauce, mozzarella.",
    price: 160,
    image: sandwichImg,
    available: true,
  },

  // ─── CHICKEN BURGER ────────────────────────────────────────────
  {
    id: "chk-ranch",
    categoryId: "chicken",
    nameAr: "تشيكن رانش",
    nameEn: "Chicken Ranch",
    descAr: "عيش كايزر + قطعتين صدور دجاج مقلي + صوص جبنة + رومي مدخن + رانش + خس + مايونيز.",
    descEn: "Kaiser bun, two fried chicken breasts, cheese sauce, smoked turkey, ranch, lettuce, mayo.",
    price: 160,
    image: chickenImg,
    available: true,
    popular: true,
    optionGroups: [sauceExtras],
  },
  {
    id: "chk-coleslaw",
    categoryId: "chicken",
    nameAr: "كول سلو تشيكن",
    nameEn: "Coleslaw Chicken",
    descAr: "عيش كايزر + قطعتين صدور دجاج مقلي بتتبيلتنا + صوص شيدر + كول سلو + خس + مايونيز.",
    descEn: "Kaiser bun, two seasoned fried chicken breasts, cheddar sauce, coleslaw, lettuce, mayo.",
    price: 165,
    image: chickenImg,
    available: true,
    optionGroups: [sauceExtras],
  },
  {
    id: "chk-chili-crunchy",
    categoryId: "chicken",
    nameAr: "تشيلي كرانشي",
    nameEn: "Chili Crunchy",
    descAr: "عيش باجيت + قطعتين صدور دجاج + خس + مايونيز + سويت شيلي + رانش حار + صوص فيكتوريا.",
    descEn: "Baguette, two chicken breasts, lettuce, mayo, sweet chili, hot ranch, Victoria sauce.",
    price: 165,
    image: chickenImg,
    available: true,
    optionGroups: [sauceExtras],
  },
  {
    id: "chk-grilled-kaiser",
    categoryId: "chicken",
    nameAr: "جريند تشيكن كايزر",
    nameEn: "Grilled Chicken Kaiser",
    descAr: "عيش كايزر + قطعتين صدور دجاج مشوي + صوص شيدر + بيف بيكون + مشروم + باربيكيو + خس + مايونيز.",
    descEn: "Kaiser bun, two grilled chicken breasts, cheddar sauce, beef bacon, mushroom, BBQ, lettuce, mayo.",
    price: 170,
    image: chickenImg,
    available: true,
    popular: true,
    optionGroups: [sauceExtras],
  },
  {
    id: "chk-classic",
    categoryId: "chicken",
    nameAr: "كلاسيك تشيكن برجر",
    nameEn: "Classic Chicken Burger",
    descAr: "عيش كايزر + صدر دجاج كرسبي + مايونيز + صوص شيدر + خيار مخلل + خس.",
    descEn: "Kaiser bun, crispy chicken breast, mayo, cheddar sauce, pickles, lettuce.",
    price: 140,
    image: chickenImg,
    available: true,
    popular: true,
    optionGroups: [sauceExtras],
  },
  {
    id: "chk-cordon-kaiser",
    categoryId: "chicken",
    nameAr: "نيو كوردن بلو كايزر",
    nameEn: "New Cordon Bleu Kaiser",
    descAr: "عيش كايزر + دجاج محشي جبن + رومي مدخن + بيف بيكون + خس + مايونيز.",
    descEn: "Kaiser bun, cheese-stuffed fried chicken, smoked turkey, beef bacon, lettuce, mayo.",
    price: 170,
    image: chickenImg,
    available: true,
    optionGroups: [sauceExtras],
  },
  {
    id: "chk-mexican-grilled",
    categoryId: "chicken",
    nameAr: "مكسيكان تشيكن جريلد",
    nameEn: "Mexican Chicken Grilled",
    descAr: "عيش فينو + قطعتين دجاج جريلد + بصل مكرمل + هاليبينو + صوص شيدر + موزاريلا + مايونيز + خس.",
    descEn: "Fino bread, two grilled chicken, caramelized onions, jalapeño, cheddar sauce, mozzarella, mayo, lettuce.",
    price: 170,
    image: chickenImg,
    available: true,
    optionGroups: [sauceExtras],
  },
  {
    id: "chk-mexican-burger",
    categoryId: "chicken",
    nameAr: "مكسيكان تشيكن برجر",
    nameEn: "Mexican Chicken Burger",
    descAr: "عيش كايزر + برجر دجاج + مايونيز + خيار مخلل + بصل مكرمل + هاليبينو + شيدر + موزاريلا.",
    descEn: "Kaiser bun, chicken burger, mayo, pickles, caramelized onions, jalapeño, cheddar, mozzarella.",
    price: 150,
    image: chickenImg,
    available: true,
    optionGroups: [sauceExtras],
  },
  {
    id: "chk-country-wrap",
    categoryId: "chicken",
    nameAr: "كانتري تشيكن راب",
    nameEn: "Country Chicken Wrap",
    descAr: "عيش تورتيلا + قطعتين صدور دجاج مقلي + صوص تكساس + موزاريلا + خس + خيار مخلل + رانش + ذرة.",
    descEn: "Tortilla, two fried chicken breasts, Texas sauce, mozzarella, lettuce, pickles, ranch, corn.",
    price: 145,
    image: sandwichImg,
    available: true,
  },
  {
    id: "chk-fajita-wrap",
    categoryId: "chicken",
    nameAr: "تشيكن فاهيتا راب",
    nameEn: "Chicken Fajita Wrap",
    descAr: "عيش تورتيلا + قطعتين صدور دجاج جريلد + بصل مكرمل + فلفل ألوان + مشروم + موزاريلا.",
    descEn: "Tortilla, two grilled chicken breasts, caramelized onions, bell peppers, mushroom, mozzarella.",
    price: 150,
    image: sandwichImg,
    available: true,
  },
  {
    id: "chk-cheese-mushroom",
    categoryId: "chicken",
    nameAr: "جريند تشيكن تشيز أند مشروم",
    nameEn: "Grilled Chicken Cheese & Mushroom",
    descAr: "عيش فينو + قطعتين دجاج جريلد + بصل مكرمل + موزاريلا + مايونيز + خس + خيار مخلل + صوص شيدر.",
    descEn: "Fino bread, two grilled chicken, caramelized onions, mozzarella, mayo, lettuce, pickles, cheddar sauce.",
    price: 170,
    image: chickenImg,
    available: true,
    optionGroups: [sauceExtras],
  },
  {
    id: "chk-cordon-amo",
    categoryId: "chicken",
    nameAr: "كوردن بلو عمو وليد",
    nameEn: "Cordon Bleu Amo Walid",
    descAr: "عيش فينو + رول دجاج محشي جبن + بيكون + رومي مدخن + صوص شيدر + رانش + تكساس + خس + مايونيز.",
    descEn: "Fino bread, cheese-stuffed chicken roll, bacon, smoked turkey, cheddar, ranch, Texas, lettuce, mayo.",
    price: 175,
    image: chickenImg,
    available: true,
    popular: true,
    optionGroups: [sauceExtras],
  },
  {
    id: "chk-new",
    categoryId: "chicken",
    nameAr: "نيو تشيكن",
    nameEn: "New Chicken",
    descAr: "عيش فينو + فراخ كرانشي + طماطم + بصل أحمر + موزاريلا + كريمة.",
    descEn: "Fino bread, crunchy chicken, tomato, red onion, mozzarella, cream.",
    price: 170,
    image: chickenImg,
    available: true,
  },

  // ─── APPETIZERS ────────────────────────────────────────────────
  {
    id: "app-texas-fries-chk",
    categoryId: "appetizers",
    nameAr: "تكساس فرايز تشيكن",
    nameEn: "Texas Fries Chicken",
    descAr: "بطاطس تكساس مع تشيكن.",
    descEn: "Texas-style fries with chicken.",
    price: 155,
    image: friesImg,
    available: true,
    popular: true,
  },
  {
    id: "app-crunchy-start",
    categoryId: "appetizers",
    nameAr: "كرانشي ستارت",
    nameEn: "Crunchy Start",
    descAr: "تشكيلة مقبلات كرانشي.",
    descEn: "Crunchy starter mix.",
    price: 150,
    image: chickenImg,
    available: true,
  },
  {
    id: "app-mozzarella",
    categoryId: "appetizers",
    nameAr: "موتزاريلا ستيكس",
    nameEn: "Mozzarella Sticks",
    descAr: "أصابع موتزاريلا مقلية.",
    descEn: "Fried mozzarella sticks.",
    price: 55,
    image: friesImg,
    available: true,
  },
  {
    id: "app-onion-rings",
    categoryId: "appetizers",
    nameAr: "أونيون رينجز",
    nameEn: "Onion Rings",
    descAr: "حلقات بصل مقلية.",
    descEn: "Fried onion rings.",
    price: 55,
    image: friesImg,
    available: true,
  },
  {
    id: "app-omranco-fries",
    categoryId: "appetizers",
    nameAr: "بطاطس عمرانكو",
    nameEn: "Omranco Fries",
    descAr: "بطاطس عمرانكو الخاصة.",
    descEn: "Omranco special fries.",
    price: 90,
    image: friesImg,
    available: true,
    popular: true,
  },
  {
    id: "app-texas-beef",
    categoryId: "appetizers",
    nameAr: "تكساس بيف",
    nameEn: "Texas Beef",
    descAr: "تكساس بيف.",
    descEn: "Texas beef.",
    price: 155,
    image: burgerImg,
    available: true,
  },
  {
    id: "app-texas-chicken",
    categoryId: "appetizers",
    nameAr: "تكساس تشيكن",
    nameEn: "Texas Chicken",
    descAr: "تكساس تشيكن.",
    descEn: "Texas chicken.",
    price: 155,
    image: chickenImg,
    available: true,
  },
  {
    id: "app-texas-smoked",
    categoryId: "appetizers",
    nameAr: "تكساس سموكد",
    nameEn: "Texas Smoked",
    descAr: "تكساس سموكد.",
    descEn: "Texas smoked.",
    price: 155,
    image: sandwichImg,
    available: true,
  },
  {
    id: "app-texas-hotdog",
    categoryId: "appetizers",
    nameAr: "تكساس هوت دوج",
    nameEn: "Texas Hot Dog",
    descAr: "تكساس هوت دوج.",
    descEn: "Texas hot dog.",
    price: 125,
    image: sandwichImg,
    available: true,
  },

  // ─── NEW ITEMS ─────────────────────────────────────────────────
  {
    id: "new-pasta-burger",
    categoryId: "new",
    nameAr: "باستا برجر",
    nameEn: "Pasta Burger",
    descAr: "باستا برجر — جرب الجديد.",
    descEn: "Pasta burger — try what's new.",
    price: 150,
    image: mealImg,
    available: true,
    popular: true,
  },
  {
    id: "new-chicken-tandoori",
    categoryId: "new",
    nameAr: "تشيكن تندوري",
    nameEn: "Chicken Tandoori",
    descAr: "تشيكن تندوري.",
    descEn: "Chicken tandoori.",
    price: 140,
    image: chickenImg,
    available: true,
  },
  {
    id: "new-cheese-steak",
    categoryId: "new",
    nameAr: "فيليه تشيز ستيك",
    nameEn: "Cheese Steak Fillet",
    descAr: "فيليه تشيز ستيك.",
    descEn: "Cheese steak fillet.",
    price: 150,
    image: sandwichImg,
    available: true,
  },
  {
    id: "new-quesadilla",
    categoryId: "new",
    nameAr: "كاساديا فاهيتا دجاج",
    nameEn: "Chicken Fajita Quesadilla",
    descAr: "كاساديا فاهيتا دجاج.",
    descEn: "Chicken fajita quesadilla.",
    price: 140,
    image: sandwichImg,
    available: true,
  },
  {
    id: "new-sweet-corn",
    categoryId: "new",
    nameAr: "سويت كورن",
    nameEn: "Sweet Corn",
    descAr: "سويت كورن.",
    descEn: "Sweet corn.",
    price: 70,
    image: friesImg,
    available: true,
  },
  {
    id: "new-cheese-jalapeno",
    categoryId: "new",
    nameAr: "تشيز هالبينو ٥ قطع",
    nameEn: "Cheese Jalapeño 5 pcs",
    descAr: "تشيز هالبينو ٥ قطع.",
    descEn: "Cheese jalapeño — 5 pieces.",
    price: 65,
    image: friesImg,
    available: true,
  },

  // ─── MIX ───────────────────────────────────────────────────────
  {
    id: "mix-ya-lahooy",
    categoryId: "mix",
    nameAr: "يا لهووي",
    nameEn: "Ya Lahooy",
    descAr: "مكس يا لهووي.",
    descEn: "Ya Lahooy mix.",
    price: 220,
    image: mealImg,
    available: true,
    popular: true,
  },
  {
    id: "mix-ya-hayaty",
    categoryId: "mix",
    nameAr: "يا حياتي",
    nameEn: "Ya Hayaty",
    descAr: "مكس يا حياتي.",
    descEn: "Ya Hayaty mix.",
    price: 195,
    image: mealImg,
    available: true,
  },
  {
    id: "mix-sogok",
    categoryId: "mix",
    nameAr: "سجق برجر",
    nameEn: "Sogok Burger",
    descAr: "سجق برجر.",
    descEn: "Sausage burger mix.",
    price: 200,
    image: burgerImg,
    available: true,
  },
  {
    id: "mix-omranco",
    categoryId: "mix",
    nameAr: "عمرانكو مكس",
    nameEn: "Omranco Mix",
    descAr: "عمرانكو مكس.",
    descEn: "Omranco mix.",
    price: 210,
    image: mealImg,
    available: true,
    popular: true,
  },

  // ─── COMBO ─────────────────────────────────────────────────────
  {
    id: "combo-meal",
    categoryId: "combo",
    nameAr: "كومبو",
    nameEn: "Combo",
    descAr: "إضافة كومبو لطلبك.",
    descEn: "Add a combo to your order.",
    price: 45,
    image: mealImg,
    available: true,
  },
  {
    id: "combo-fries-s",
    categoryId: "combo",
    nameAr: "بطاطس صغيرة",
    nameEn: "Small Fries",
    descAr: "بطاطس صغيرة.",
    descEn: "Small fries.",
    price: 30,
    image: friesImg,
    available: true,
  },
  {
    id: "combo-fries-l",
    categoryId: "combo",
    nameAr: "بطاطس كبيرة",
    nameEn: "Large Fries",
    descAr: "بطاطس كبيرة.",
    descEn: "Large fries.",
    price: 40,
    image: friesImg,
    available: true,
  },
  {
    id: "combo-cola",
    categoryId: "combo",
    nameAr: "في كولا",
    nameEn: "V Cola",
    descAr: "في كولا.",
    descEn: "V Cola.",
    price: 25,
    image: drinkImg,
    available: true,
  },
  {
    id: "combo-maxi",
    categoryId: "combo",
    nameAr: "ماكسي",
    nameEn: "Maxi",
    descAr: "ماكسي.",
    descEn: "Maxi drink.",
    price: 20,
    image: drinkImg,
    available: true,
  },
  {
    id: "combo-big-cola-s",
    categoryId: "combo",
    nameAr: "بيج كولا صغير",
    nameEn: "Big Cola Small",
    descAr: "بيج كولا صغير.",
    descEn: "Small Big Cola.",
    price: 15,
    image: drinkImg,
    available: true,
  },
  {
    id: "combo-juice",
    categoryId: "combo",
    nameAr: "عصير",
    nameEn: "Juice",
    descAr: "عصير.",
    descEn: "Juice.",
    price: 15,
    image: drinkImg,
    available: true,
  },
  {
    id: "combo-water",
    categoryId: "combo",
    nameAr: "مياه صغيرة",
    nameEn: "Small Water",
    descAr: "مياه صغيرة.",
    descEn: "Small water.",
    price: 10,
    image: drinkImg,
    available: true,
  },

  // ─── EXTRAS ────────────────────────────────────────────────────
  {
    id: "ex-coleslaw",
    categoryId: "extras",
    nameAr: "كول سلو",
    nameEn: "Coleslaw",
    descAr: "إضافة كول سلو.",
    descEn: "Coleslaw side.",
    price: 25,
    image: friesImg,
    available: true,
  },
  {
    id: "ex-cheddar",
    categoryId: "extras",
    nameAr: "شيدر",
    nameEn: "Cheddar",
    descAr: "صوص شيدر.",
    descEn: "Cheddar sauce.",
    price: 20,
    image: friesImg,
    available: true,
  },
  {
    id: "ex-ranch",
    categoryId: "extras",
    nameAr: "رانش",
    nameEn: "Ranch",
    descAr: "صوص رانش.",
    descEn: "Ranch sauce.",
    price: 20,
    image: friesImg,
    available: true,
  },
  {
    id: "ex-texas-hot",
    categoryId: "extras",
    nameAr: "تكساس حار",
    nameEn: "Texas Hot",
    descAr: "صوص تكساس حار.",
    descEn: "Hot Texas sauce.",
    price: 20,
    image: friesImg,
    available: true,
  },
  {
    id: "ex-texas",
    categoryId: "extras",
    nameAr: "تكساس عادي",
    nameEn: "Texas",
    descAr: "صوص تكساس.",
    descEn: "Texas sauce.",
    price: 20,
    image: friesImg,
    available: true,
  },
  {
    id: "ex-sweet-chili",
    categoryId: "extras",
    nameAr: "سويت شيلي",
    nameEn: "Sweet Chili",
    descAr: "صوص سويت شيلي.",
    descEn: "Sweet chili sauce.",
    price: 20,
    image: friesImg,
    available: true,
  },
  {
    id: "ex-mayo",
    categoryId: "extras",
    nameAr: "مايونيز",
    nameEn: "Mayonnaise",
    descAr: "مايونيز.",
    descEn: "Mayonnaise.",
    price: 20,
    image: friesImg,
    available: true,
  },
  {
    id: "ex-thousand",
    categoryId: "extras",
    nameAr: "١٠٠٠ جزيرة",
    nameEn: "1000 Island",
    descAr: "صوص ١٠٠٠ جزيرة.",
    descEn: "1000 Island sauce.",
    price: 20,
    image: friesImg,
    available: true,
  },

  // ─── KIDS MEALS ────────────────────────────────────────────────
  {
    id: "kids-beef",
    categoryId: "kids",
    nameAr: "وجبة أطفال بيف برجر",
    nameEn: "Kids Beef Burger Meal",
    descAr: "بيف برجر أطفال + عصير.",
    descEn: "Kids beef burger with juice.",
    price: 100,
    image: burgerImg,
    available: true,
  },
  {
    id: "kids-fried",
    categoryId: "kids",
    nameAr: "وجبة أطفال فرايد تشيكن",
    nameEn: "Kids Fried Chicken Meal",
    descAr: "فرايد تشيكن أطفال + عصير.",
    descEn: "Kids fried chicken with juice.",
    price: 100,
    image: chickenImg,
    available: true,
  },
  {
    id: "kids-chicken-burger",
    categoryId: "kids",
    nameAr: "وجبة أطفال تشيكن برجر",
    nameEn: "Kids Chicken Burger Meal",
    descAr: "تشيكن برجر أطفال + عصير.",
    descEn: "Kids chicken burger with juice.",
    price: 100,
    image: chickenImg,
    available: true,
  },
];

/** Featured from the printed "جرب الجديد" section — real menu items. */
export const offers: Offer[] = [
  {
    id: "o-pasta",
    titleAr: "باستا برجر",
    titleEn: "Pasta Burger",
    descAr: "من قسم الجديد في منيو عمرانكو — ١٥٠ جنيه.",
    descEn: "From OMRANCO new items — 150 EGP.",
    badgeAr: "جرب الجديد",
    badgeEn: "Try the new",
    image: mealImg,
  },
  {
    id: "o-mix",
    titleAr: "عمرانكو مكس",
    titleEn: "Omranco Mix",
    descAr: "مكس عمرانكو — ٢١٠ جنيه.",
    descEn: "Omranco mix — 210 EGP.",
    badgeAr: "مكس",
    badgeEn: "Mix",
    image: mealImg,
  },
  {
    id: "o-kids",
    titleAr: "وجبات أطفال",
    titleEn: "Kids Meals",
    descAr: "بيف أو فرايد تشيكن أو تشيكن برجر — ١٠٠ جنيه.",
    descEn: "Beef, fried chicken or chicken burger — 100 EGP.",
    badgeAr: "١٠٠ جنيه",
    badgeEn: "100 EGP",
    image: burgerImg,
  },
];

export const branches: Branch[] = [
  {
    id: "b1",
    nameAr: "فرع حي الجامعة",
    nameEn: "Hay El Gamaa Branch",
    addressAr: "حي الجامعة، بجوار وكالة أبو راية، المنصورة",
    addressEn: "Hay El Gamaa, next to Abu Raya agency, Mansoura",
    phone: "01555218182",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=حي+الجامعة+المنصورة",
  },
  {
    id: "b2",
    nameAr: "فرع شارع النخلة",
    nameEn: "El Nakhla Street Branch",
    addressAr: "شارع النخلة، خلف محطة الغاز، المنصورة",
    addressEn: "El Nakhla Street, behind the gas station, Mansoura",
    phone: "0502242474",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=شارع+النخلة+المنصورة",
  },
];

export const DELIVERY_FEE = 25;

export const deliveryZones = [
  { id: "z1", nameAr: "حي الجامعة", nameEn: "Hay El Gamaa" },
  { id: "z2", nameAr: "توريل", nameEn: "Toril" },
  { id: "z3", nameAr: "المشاية", nameEn: "El Mashaya" },
  { id: "z4", nameAr: "وسط البلد", nameEn: "Downtown Mansoura" },
  { id: "z5", nameAr: "جيهان", nameEn: "Gehan Street" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const CATEGORY_IDS = categories.map((c) => c.id);
