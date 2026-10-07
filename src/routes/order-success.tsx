import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { branches } from "@/lib/menu-data";
import { loadLastOrder, type LastOrder } from "@/lib/order";

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "تم استلام الطلب | OMRANCO BURGER" },
      { name: "description", content: "طلبك وصل لعمرانكو برجر." },
    ],
  }),
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const { t, money, pick } = useLang();
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    setOrder(loadLastOrder());
  }, []);

  const branch = order?.branchId ? branches.find((b) => b.id === order.branchId) : undefined;

  return (
    <div className="red-grid min-h-[70vh] py-10 sm:py-14">
      <div className="brand-container flex flex-col items-center text-center">
        <div className="w-full max-w-lg border-2 border-black bg-white p-6 hard-shadow sm:p-8">
          <div className="mx-auto mb-5 grid size-16 place-items-center border-2 border-black bg-primary text-white hard-shadow-sm">
            <Check className="size-8" strokeWidth={3} />
          </div>
          <p className="font-brand text-xs tracking-[0.18em] text-ink/45">ORDER.OK</p>
          <h1 className="omranco-display mt-1 text-primary !text-[clamp(1.75rem,4vw,2.5rem)]">
            {t("orderSuccessTitle")}
          </h1>
          <p className="mt-3 text-muted-foreground">{t("orderSuccessSub")}</p>
          {order && (
            <p className="mt-5 inline-block border-2 border-black bg-amber px-4 py-2 text-sm font-extrabold">
              {t("orderNumber")} <span dir="ltr">#{order.id}</span> — {money(order.total)}
            </p>
          )}
          {branch && (
            <p className="mt-3 text-sm font-bold text-ink/70">
              {pick(branch.nameAr, branch.nameEn)}
            </p>
          )}
          {order?.whatsappUrl && (
            <Button asChild variant="outline" className="mt-5 w-full bg-white">
              <a href={order.whatsappUrl} target="_blank" rel="noreferrer">
                {t("openWhatsappAgain")}
              </a>
            </Button>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero">
              <Link to="/">{t("backHome")}</Link>
            </Button>
            <Button asChild variant="outline" className="bg-white">
              <Link to="/menu">{t("viewMenu")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
