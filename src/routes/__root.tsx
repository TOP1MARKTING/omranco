import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { SiteLayout } from "@/components/layout/SiteLayout";
import { DeferredToaster } from "@/components/ui/DeferredToaster";
import { CartProvider } from "@/lib/cart";
import { LangProvider } from "@/lib/i18n";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-extrabold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-extrabold">الصفحة مش موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">Page not found / الصفحة غير موجودة</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-extrabold text-primary-foreground"
          >
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-extrabold">حصلت مشكلة في التحميل</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again or go home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-input bg-background px-4 py-2 text-sm font-bold"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<Record<string, never>>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OMRANCO BURGER | عمرانكو برجر — المنصورة" },
      {
        name: "description",
        content:
          "اطلب أونلاين من عمرانكو برجر في المنصورة — برجر، سندوتشات، وفرايد تشيكن.",
      },
      { name: "author", content: "OMRANCO BURGER" },
      { property: "og:title", content: "OMRANCO BURGER | عمرانكو برجر" },
      {
        property: "og:description",
        content: "برجر وسندوتشات وفرايد تشيكن في المنصورة — اطلب أونلاين.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_EG" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "OMRANCO BURGER" },
      {
        name: "twitter:description",
        content: "اطلب من عمرانكو برجر أونلاين — المنصورة",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        // Only families/weights used in CSS: Bebas (brand), Inter (LTR UI), Noto Kufi (headlines), Tajawal (body).
        // display=swap keeps text visible while faces load (FCP-friendly; slight CLS tradeoff accepted).
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;700&family=Noto+Kufi+Arabic:wght@700;800;900&family=Tajawal:wght@400;500;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LangProvider>
      <CartProvider>
        <SiteLayout>
          <Outlet />
        </SiteLayout>
        <DeferredToaster />
      </CartProvider>
    </LangProvider>
  );
}
