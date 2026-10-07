import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

/** Full-quality source — desktop / large screens */
const HERO_VIDEO = "/hero-mix.mp4";
/** Lighter encode — phones */
const HERO_VIDEO_MOBILE = "/hero-mix-mobile.mp4";
/** Immediate LCP paint — shown under the video until playback starts */
const HERO_POSTER = "/hero-poster.jpg";
const POSTER_W = 960;
const POSTER_H = 1706;

function readViewportHeight() {
  if (typeof window === "undefined") return undefined;
  return Math.round(window.innerHeight);
}

function pickHeroVideoSrc() {
  if (typeof window === "undefined") return HERO_VIDEO;
  return window.matchMedia("(max-width: 768px)").matches ? HERO_VIDEO_MOBILE : HERO_VIDEO;
}

export function HeroSection() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroHeight, setHeroHeight] = useState<number | undefined>(undefined);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const updateHeight = () => setHeroHeight(readViewportHeight());
    updateHeight();

    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
    };
  }, []);

  // Poster paints first (SSR); the video starts loading right after hydration.
  useEffect(() => {
    setVideoSrc(pickHeroVideoSrc());
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) return;

    // iOS only autoplays when muted/playsinline are already set before the source loads.
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.src = videoSrc;

    let cancelled = false;
    let errorRetries = 0;

    // iOS Low Power Mode, Android Data Saver and some in-app browsers block autoplay
    // until a user activation; touchstart/pointerdown on touch screens don't count as one.
    const gestureEvents = ["pointerup", "touchend", "click", "keydown"] as const;
    let gestureArmed = false;
    const removeGestureRetry = () => {
      if (!gestureArmed) return;
      gestureArmed = false;
      gestureEvents.forEach((e) => window.removeEventListener(e, onGesture));
    };
    const armGestureRetry = () => {
      if (gestureArmed) return;
      gestureArmed = true;
      gestureEvents.forEach((e) => window.addEventListener(e, onGesture, { passive: true }));
    };
    const onGesture = () => tryPlay();

    const tryPlay = () => {
      if (cancelled || document.visibilityState !== "visible") return;
      const p = v.play();
      if (!p) return;
      p.then(
        () => {
          if (!cancelled) setVideoPlaying(true);
          removeGestureRetry();
        },
        () => {
          if (!cancelled) armGestureRetry();
        },
      );
    };

    const onError = () => {
      if (cancelled || errorRetries >= 2) return;
      errorRetries += 1;
      // Mobile encode failed → fall back to the main file, otherwise retry the same one.
      const next = videoSrc === HERO_VIDEO_MOBILE ? HERO_VIDEO : videoSrc;
      window.setTimeout(() => {
        if (cancelled) return;
        v.src = `${next}${errorRetries > 1 ? `?r=${errorRetries}` : ""}`;
        v.load();
        tryPlay();
      }, 800 * errorRetries);
    };

    const pause = () => {
      v.pause();
    };

    const onCanPlay = () => tryPlay();
    const onPlaying = () => {
      if (cancelled) return;
      setVideoPlaying(true);
      removeGestureRetry();
    };
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("loadeddata", onCanPlay);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("error", onError);

    v.load();
    tryPlay();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) tryPlay();
        else pause();
      },
      { threshold: 0.2 },
    );
    io.observe(v);

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
      else pause();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      removeGestureRetry();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("loadeddata", onCanPlay);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("error", onError);
      pause();
    };
  }, [videoSrc]);

  return (
    <section
      className="relative flex shrink-0 overflow-hidden bg-ink"
      style={{
        height: heroHeight ? `${heroHeight}px` : "100dvh",
        minHeight: heroHeight ? `${heroHeight}px` : "100dvh",
      }}
    >
      <div className="absolute inset-0 z-0">
        {/* Instant LCP candidate — fixed box via absolute fill (no CLS) */}
        <img
          src={HERO_POSTER}
          alt=""
          width={POSTER_W}
          height={POSTER_H}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {videoSrc ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: videoPlaying ? 1 : 0 }}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            poster={HERO_POSTER}
            aria-hidden={videoPlaying ? undefined : true}
          />
        ) : null}

        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      </div>

      <div className="brand-container relative z-10 flex h-full w-full flex-col items-center justify-end pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[calc(4.5rem+env(safe-area-inset-top))] text-center sm:pb-16 lg:pb-20">
        <h1 className="omranco-display max-w-3xl whitespace-pre-line text-primary drop-shadow-sm">
          {t("heroTitle")}
        </h1>

        <p className="mt-3 max-w-md text-sm font-bold text-white/90 sm:mt-4 sm:text-base">
          {t("heroSub")}
        </p>

        <div className="mt-5 flex w-full max-w-sm flex-col gap-3 sm:mt-8 sm:max-w-md sm:flex-row sm:justify-center">
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
