import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyCartBar } from "@/components/layout/StickyCartBar";
import { cn } from "@/lib/utils";

export function SiteLayout({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isHome = path === "/";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className={cn("flex-1", !isHome && "pt-[4.75rem] sm:pt-[5.25rem]")}>{children}</main>
      <SiteFooter />
      <div className="hidden lg:block">
        <StickyCartBar />
      </div>
      <CartDrawer />
    </div>
  );
}
