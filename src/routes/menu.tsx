import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/menu/ProductCard";
import { DeferredProductModal } from "@/components/menu/DeferredProductModal";
import { Input } from "@/components/ui/input";
import { useLang } from "@/lib/i18n";
import { categories, products, type CategoryId, type Product } from "@/lib/menu-data";

/** Exact allowlist from the previous Zod enum (same as CategoryId). */
const MENU_SEARCH_CATEGORIES = [
  "beef",
  "chicken",
  "appetizers",
  "new",
  "mix",
  "combo",
  "extras",
  "kids",
] as const satisfies ReadonlyArray<CategoryId>;

export type MenuSearch = {
  category?: CategoryId;
  q?: string;
};

/**
 * Manual replacement for `z.object({ category: z.enum(...).optional(), q: z.string().optional() })`.
 * Same rules: optional fields, strip unknowns, throw on invalid present values (Zod `.parse`).
 */
function validateMenuSearch(search: Record<string, unknown>): MenuSearch {
  const result: MenuSearch = {};

  if (search.category !== undefined) {
    if (
      typeof search.category !== "string" ||
      !(MENU_SEARCH_CATEGORIES as readonly string[]).includes(search.category)
    ) {
      throw new Error("Invalid menu search category");
    }
    result.category = search.category;
  }

  if (search.q !== undefined) {
    if (typeof search.q !== "string") {
      throw new Error("Invalid menu search q");
    }
    result.q = search.q;
  }

  return result;
}

export const Route = createFileRoute("/menu")({
  validateSearch: validateMenuSearch,
  head: () => ({
    meta: [
      { title: "المنيو | OMRANCO BURGER" },
      {
        name: "description",
        content: "تصفح منيو عمرانكو برجر واطلب أونلاين — برجر، فرايد تشيكن، سندوتشات والمزيد.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { t, pick } = useLang();
  const { category: initialCategory, q: initialQ } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(initialQ ?? "");
  const [active, setActive] = useState<Product | null>(null);
  const category = initialCategory;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.categoryId !== category) return false;
      if (!q) return true;
      const hay = `${p.nameAr} ${p.nameEn} ${p.descAr} ${p.descEn}`.toLowerCase();
      return hay.includes(q);
    });
  }, [category, query]);

  const setCategory = (id?: CategoryId) => {
    navigate({
      search: (prev) => ({ ...prev, category: id }),
      replace: true,
    });
  };

  return (
    <div className="red-grid min-h-[70vh] py-8 sm:py-10">
      <div className="brand-container">
        <div className="mb-5 border-2 border-black bg-white p-4 hard-shadow sm:p-5">
          <p className="font-brand text-xs tracking-[0.18em] text-ink/45">MENU.EXE</p>
          <h1 className="omranco-display mt-1 text-primary !text-[clamp(1.75rem,4vw,2.75rem)]">
            {t("menu")}
          </h1>

          <div className="relative mt-4">
            <Search className="pointer-events-none absolute top-1/2 start-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => {
                navigate({
                  search: (prev) => ({ ...prev, q: query.trim() || undefined }),
                  replace: true,
                });
              }}
              placeholder={t("search")}
              className="h-11 rounded-none border-2 border-black ps-10 text-base hard-shadow-sm sm:h-12"
              aria-label={t("search")}
            />
          </div>

          <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar sm:-mx-5 sm:px-5">
            <button
              type="button"
              onClick={() => setCategory(undefined)}
              data-active={!category}
              className="cat-pill shrink-0"
            >
              {t("all")}
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                data-active={category === c.id}
                className="cat-pill shrink-0"
              >
                {pick(c.nameAr, c.nameEn)}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="border-2 border-black bg-white py-16 text-center font-extrabold hard-shadow">
            {t("noResults")}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={setActive} />
            ))}
          </div>
        )}
      </div>

      <DeferredProductModal
        product={active}
        open={!!active}
        onOpenChange={(o) => !o && setActive(null)}
      />
    </div>
  );
}
