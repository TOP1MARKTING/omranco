import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, type ReactNode } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { OffersPromoBanner } from "@/components/home/OffersPromoBanner";

const QuickOrderSection = lazy(() =>
  import("@/components/home/QuickOrderSection").then((m) => ({
    default: m.QuickOrderSection,
  })),
);
const PopularItemsSection = lazy(() =>
  import("@/components/home/PopularItemsSection").then((m) => ({
    default: m.PopularItemsSection,
  })),
);
const OffersPreviewSection = lazy(() =>
  import("@/components/home/OffersPreviewSection").then((m) => ({
    default: m.OffersPreviewSection,
  })),
);
const AboutTeaserSection = lazy(() =>
  import("@/components/home/AboutTeaserSection").then((m) => ({
    default: m.AboutTeaserSection,
  })),
);
const BranchesTeaserSection = lazy(() =>
  import("@/components/home/BranchesTeaserSection").then((m) => ({
    default: m.BranchesTeaserSection,
  })),
);

/** Same surface as the real section so deferred load does not collapse layout. */
function SectionSlot({
  className,
  minHeight,
  children,
}: {
  className: string;
  minHeight: string;
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<div className={className} style={{ minHeight }} aria-hidden />}>
      {children}
    </Suspense>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OMRANCO BURGER | عمرانكو برجر — المنصورة" },
      {
        name: "description",
        content: "جوعان؟ عمرانكو عنده الحل. اطلب برجر وسندوتشات من المنصورة أونلاين.",
      },
    ],
    links: [
      // LCP: start poster fetch ASAP (img already has fetchPriority=high)
      { rel: "preload", as: "image", href: "/hero-poster.jpg", type: "image/jpeg" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <OffersPromoBanner />
      <SectionSlot className="red-grid" minHeight="22rem">
        <QuickOrderSection />
      </SectionSlot>
      <SectionSlot className="border-y-4 border-black bg-white" minHeight="28rem">
        <PopularItemsSection />
      </SectionSlot>
      <SectionSlot className="red-grid" minHeight="24rem">
        <OffersPreviewSection />
      </SectionSlot>
      <SectionSlot className="border-y-4 border-black bg-white" minHeight="18rem">
        <AboutTeaserSection />
      </SectionSlot>
      <SectionSlot className="border-t-4 border-black bg-white" minHeight="20rem">
        <BranchesTeaserSection />
      </SectionSlot>
    </>
  );
}
