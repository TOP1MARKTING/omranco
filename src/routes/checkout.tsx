import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Store, Truck } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { CartLines, CartSummary } from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { deliveryZones } from "@/lib/menu-constants";
import { branches } from "@/lib/menu-data";
import { buildOrderMessage, createOrderId, orderWhatsAppUrl, saveLastOrder } from "@/lib/order";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "إتمام الطلب | OMRANCO BURGER" },
      { name: "description", content: "أكمِل بياناتك وأكد طلبك من عمرانكو برجر." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, subtotal, deliveryFee, total, fulfillment, setFulfillment, clear } = useCart();
  const { t, pick, lang } = useLang();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [driverNotes, setDriverNotes] = useState("");
  const [branchId, setBranchId] = useState(branches[0]?.id ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isDelivery = fulfillment === "delivery";

  const canSubmit = useMemo(() => lines.length > 0, [lines.length]);

  if (!canSubmit) {
    return (
      <div className="red-grid min-h-[70vh] py-16">
        <div className="brand-container text-center">
          <div className="mx-auto max-w-md border-2 border-black bg-white p-8 hard-shadow">
            <h1 className="omranco-display text-primary !text-[clamp(1.5rem,4vw,2.25rem)]">
              {t("emptyCart")}
            </h1>
            <p className="mt-2 text-muted-foreground">{t("emptyCartSub")}</p>
            <Button asChild variant="hero" className="mt-6">
              <Link to="/menu">{t("viewMenu")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = t("required");
    if (!phone.trim() || phone.trim().length < 10) next.phone = t("required");
    if (isDelivery) {
      if (!area) next.area = t("required");
      if (!address.trim()) next.address = t("required");
    } else if (!branchId) {
      next.branchId = t("required");
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const details = {
      customerName: name.trim(),
      phone: phone.trim(),
      fulfillment,
      branch: isDelivery ? undefined : branches.find((b) => b.id === branchId),
      areaId: isDelivery ? area : undefined,
      address: isDelivery ? address.trim() : undefined,
      landmark: isDelivery ? landmark.trim() : undefined,
      notes: isDelivery ? driverNotes.trim() : undefined,
      lines,
      subtotal,
      deliveryFee,
      total,
    };
    const id = createOrderId();
    const whatsappUrl = orderWhatsAppUrl(details, buildOrderMessage(details, id));

    // Must open synchronously inside the submit gesture or mobile browsers block it.
    window.open(whatsappUrl, "_blank", "noopener");

    saveLastOrder({
      id,
      total,
      fulfillment,
      branchId: isDelivery ? undefined : branchId,
      whatsappUrl,
    });
    clear();
    navigate({ to: "/order-success" });
  };

  const sectionClass = "border-2 border-black bg-white p-5 hard-shadow";
  const inputClass = "h-11 rounded-none border-2 border-black";

  return (
    <div className="red-grid min-h-[70vh] py-8 sm:py-10">
      <div className="brand-container">
        <div className="mb-6 border-2 border-black bg-white p-4 hard-shadow sm:p-5 text-center">
          <p className="font-brand text-xs tracking-[0.18em] text-ink/45">CHECKOUT.EXE</p>
          <h1 className="omranco-display mt-1 text-primary !text-[clamp(1.75rem,4vw,2.75rem)]">
            {t("checkoutTitle")}
          </h1>
        </div>

        <form onSubmit={onSubmit} className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <section className={sectionClass}>
              <h2 className="mb-4 text-lg font-extrabold">{t("customerDetails")}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("name")}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("namePlaceholder")}
                    className={inputClass}
                    autoComplete="name"
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phone")}</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("phonePlaceholder")}
                    className={cn(inputClass, "font-latin")}
                    dir="ltr"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className="mb-4 text-lg font-extrabold">{t("orderType")}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {(
                  [
                    { id: "delivery", icon: Truck, label: t("deliveryType") },
                    { id: "pickup", icon: Store, label: t("pickupType") },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFulfillment(opt.id)}
                    className={cn(
                      "flex items-center gap-3 border-2 border-black p-4 text-start transition-colors hard-shadow-sm",
                      fulfillment === opt.id
                        ? "bg-primary text-white"
                        : "bg-white hover:bg-amber/40",
                    )}
                  >
                    <opt.icon className="size-6" />
                    <span className="font-extrabold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {isDelivery ? (
              <section className={sectionClass}>
                <h2 className="mb-4 text-lg font-extrabold">{t("deliveryDetails")}</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="area">{t("area")}</Label>
                    <select
                      id="area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="flex h-11 w-full rounded-none border-2 border-black bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="">{t("selectArea")}</option>
                      {deliveryZones.map((z) => (
                        <option key={z.id} value={z.id}>
                          {pick(z.nameAr, z.nameEn)}
                        </option>
                      ))}
                    </select>
                    {errors.area && <p className="text-xs text-destructive">{errors.area}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">{t("address")}</Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t("addressPlaceholder")}
                      className="min-h-24 rounded-none border-2 border-black"
                    />
                    {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="landmark">{t("landmark")}</Label>
                    <Input
                      id="landmark"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder={t("landmarkPlaceholder")}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">{t("driverNotes")}</Label>
                    <Textarea
                      id="notes"
                      value={driverNotes}
                      onChange={(e) => setDriverNotes(e.target.value)}
                      placeholder={t("notesPlaceholder")}
                      className="min-h-20 rounded-none border-2 border-black"
                    />
                  </div>
                </div>
              </section>
            ) : (
              <section className={sectionClass}>
                <h2 className="mb-4 text-lg font-extrabold">{t("pickBranch")}</h2>
                <div className="space-y-3">
                  {branches.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBranchId(b.id)}
                      className={cn(
                        "w-full border-2 border-black p-4 text-start hard-shadow-sm",
                        branchId === b.id ? "bg-amber" : "bg-white hover:bg-amber/30",
                      )}
                    >
                      <p className="font-extrabold">{pick(b.nameAr, b.nameEn)}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {pick(b.addressAr, b.addressEn)}
                      </p>
                    </button>
                  ))}
                </div>
                {errors.branchId && (
                  <p className="mt-2 text-xs text-destructive">{errors.branchId}</p>
                )}
              </section>
            )}

            <section className={sectionClass}>
              <h2 className="mb-3 text-lg font-extrabold">{t("payment")}</h2>
              <div className="border-2 border-black bg-amber px-4 py-3 font-extrabold text-ink">
                {t("cashOnDelivery")}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {lang === "ar"
                  ? "الدفع الإلكتروني هيتوفر لاحقًا."
                  : "Online payment will be added later."}
              </p>
            </section>
          </div>

          <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
            <div className={sectionClass}>
              <h2 className="mb-4 text-lg font-extrabold">{t("orderSummary")}</h2>
              <div className="mb-4 max-h-72 overflow-y-auto">
                <CartLines />
              </div>
              <CartSummary />
            </div>
            <Button type="submit" variant="hero" size="xl" className="w-full">
              {t("sendOnWhatsapp")} —{" "}
              {lang === "ar"
                ? `${total.toLocaleString("ar-EG")} جنيه`
                : `${total.toLocaleString("en-US")} EGP`}
            </Button>
            <p className="text-center text-xs font-bold text-white/85">{t("whatsappOrderHint")}</p>
          </aside>
        </form>
      </div>
    </div>
  );
}
