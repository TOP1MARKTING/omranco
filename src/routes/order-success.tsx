import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { loadLastOrder, type OrderStatus } from "@/lib/order";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "تم استلام الطلب | OMRANCO BURGER" },
      { name: "description", content: "طلبك وصل لعمرانكو برجر." },
    ],
  }),
  component: OrderSuccessPage,
});

const STEPS: {
  id: OrderStatus;
  key:
    | "statusReceived"
    | "statusPreparing"
    | "statusReady"
    | "statusOnTheWay"
    | "statusDelivered";
}[] = [
  { id: "received", key: "statusReceived" },
  { id: "preparing", key: "statusPreparing" },
  { id: "ready", key: "statusReady" },
  { id: "on_the_way", key: "statusOnTheWay" },
  { id: "delivered", key: "statusDelivered" },
];

function OrderSuccessPage() {
  const { t, money } = useLang();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const order = loadLastOrder();
    if (order) {
      setOrderId(order.id);
      setTotal(order.total);
    }
  }, []);

  useEffect(() => {
    const timers = [1, 2, 3].map((i) =>
      window.setTimeout(() => setStatusIndex(i), i * 3500),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

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
          {orderId && (
            <p className="mt-4 inline-block border-2 border-black bg-amber px-4 py-2 text-sm font-extrabold">
              {t("orderNumber")} #{orderId}
              {total != null && <> · {money(total)}</>}
            </p>
          )}

          <ol className="mt-8 space-y-0 text-start">
            {STEPS.map((step, i) => {
              const done = i <= statusIndex;
              const current = i === statusIndex;
              return (
                <li key={step.id} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < STEPS.length - 1 && (
                    <span
                      className={cn(
                        "absolute start-[15px] top-8 h-[calc(100%-1.5rem)] w-0.5",
                        i < statusIndex ? "bg-primary" : "bg-border",
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 grid size-8 shrink-0 place-items-center border-2 border-black text-xs font-extrabold",
                      done ? "bg-primary text-white" : "bg-white text-muted-foreground",
                      current && "hard-shadow-sm",
                    )}
                  >
                    {done ? <Check className="size-4" strokeWidth={3} /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "pt-1 font-bold",
                      done ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {t(step.key)}
                  </span>
                </li>
              );
            })}
          </ol>

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
