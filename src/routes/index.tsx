import { createFileRoute } from "@tanstack/react-router";
import { AboutTeaserSection } from "@/components/home/AboutTeaserSection";
import { BranchesTeaserSection } from "@/components/home/BranchesTeaserSection";
import { HeroSection } from "@/components/home/HeroSection";
import { OffersPreviewSection } from "@/components/home/OffersPreviewSection";
import { OffersPromoBanner } from "@/components/home/OffersPromoBanner";
import { PopularItemsSection } from "@/components/home/PopularItemsSection";
import { QuickOrderSection } from "@/components/home/QuickOrderSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OMRANCO BURGER | عمرانكو برجر — المنصورة" },
      {
        name: "description",
        content: "جوعان؟ عمرانكو عنده الحل. اطلب برجر وسندوتشات من المنصورة أونلاين.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <OffersPromoBanner />
      <QuickOrderSection />
      <PopularItemsSection />
      <OffersPreviewSection />
      <AboutTeaserSection />
      <BranchesTeaserSection />
    </>
  );
}
