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

function scheduleWhenIdle(fn: () => void, timeoutMs = 1800) {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };

  if (typeof w.requestIdleCallback === "function") {
    const id = w.requestIdleCallback(fn, { timeout: timeoutMs });
    return () => w.cancelIdleCallback?.(id);
  }

  const id = window.setTimeout(fn, Math.min(400, timeoutMs));
  return () => window.clearTimeout(id);
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

  // Defer attaching the video source until after first paint / idle — poster paints first.
  useEffect(() => {
    let cancelled = false;
    let cancelIdle: (() => void) | undefined;

    const arm = () => {
      cancelIdle = scheduleWhenIdle(() => {
        if (!cancelled) setVideoSrc(pickHeroVideoSrc());
      });
    };

    if (document.readyState === "complete") {
      arm();
    } else {
      window.addEventListener("load", arm, { once: true });
    }

    return () => {
      cancelled = true;
      cancelIdle?.();
      window.removeEventListener("load", arm);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) return;

    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    let cancelled = false;

    // iOS Low Power Mode, Android Data Saver and some in-app browsers block autoplay
    // until the user interacts with the page.
    const gestureEvents = ["pointerdown", "touchstart", "keydown"] as const;
    const removeGestureRetry = () => {
      gestureEvents.forEach((e) => window.removeEventListener(e, onGesture));
    };
    const onGesture = () => {
      removeGestureRetry();
      tryPlay();
    };

    const tryPlay = () => {
      if (cancelled) return;
      void v.play().then(
        () => {
          if (!cancelled) setVideoPlaying(true);
          removeGestureRetry();
        },
        () => {
          if (cancelled) return;
          gestureEvents.forEach((e) =>
            window.addEventListener(e, onGesture, { once: true, passive: true }),
          );
        },
      );
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

    // Explicit load after src is set via React
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
            src={videoSrc}
            muted
            loop
            playsInline
            autoPlay
            preload="none"
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
