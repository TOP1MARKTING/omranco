import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

const HERO_VIDEO = "/hero-mix.mp4";

export function HeroSection() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;

    const tryPlay = () => {
      void v.play().catch(() => {
        window.setTimeout(() => void v.play().catch(() => {}), 300);
      });
    };

    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section className="relative flex h-[100dvh] max-h-[100dvh] min-h-[100dvh] overflow-hidden bg-ink supports-[height:100svh]:h-svh supports-[height:100svh]:max-h-svh supports-[height:100svh]:min-h-svh">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      </div>

      <div className="brand-container relative z-10 flex h-full w-full flex-col items-center justify-end pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[calc(4.5rem+env(safe-area-inset-top))] text-center sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
        <h1 className="omranco-display max-w-3xl text-primary drop-shadow-sm">
          {t("heroTitle")}
        </h1>

        <p className="mt-3 max-w-md text-sm font-bold text-white/90 sm:mt-4 sm:text-base">
          {t("heroSub")}
        </p>

        <div className="mt-5 flex w-full max-w-sm flex-col gap-3 pb-2 sm:mt-8 sm:max-w-md sm:flex-row sm:justify-center sm:pb-0">
          <Button asChild variant="hero" className="h-12 flex-1 text-base sm:flex-none sm:px-10">
            <Link to="/menu">{t("orderNow")}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 flex-1 border-2 border-white bg-transparent text-base text-white hover:bg-white hover:text-ink sm:flex-none sm:px-8"
          >
            <Link to="/offers">{t("offers")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
