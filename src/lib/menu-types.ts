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
  price: number;
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
