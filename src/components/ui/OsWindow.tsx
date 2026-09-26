import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Retro OS window chrome — Pop-Art fast-food UI container. */
export function OsWindow({
  title,
  children,
  className,
  bodyClassName,
  glass = false,
  frameless = false,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  glass?: boolean;
  /** No outer border / hard shadow — glass panel only */
  frameless?: boolean;
}) {
  return (
    <div
      className={cn(
        glass ? "os-window-glass" : "os-window",
        frameless && "border-0 shadow-none",
        className,
      )}
    >
      <div
        className={cn(
          "os-titlebar",
          glass && "border-white/25 bg-black/55 backdrop-blur-md",
        )}
        dir="ltr"
      >
        <span className="grid size-3 place-items-center border border-white/30 bg-primary text-[8px] leading-none text-white">
          ×
        </span>
        <span className="grid size-3 place-items-center border border-white/30 bg-amber text-[8px] leading-none text-ink">
          −
        </span>
        <span className="grid size-3 place-items-center border border-white/30 bg-white/90 text-[7px] leading-none text-ink">
          □
        </span>
        {title ? (
          <span className="ms-2 truncate font-brand text-[10px] tracking-[0.16em] text-white/75 sm:text-[11px]">
            {title}
          </span>
        ) : null}
      </div>
      <div className={cn(glass ? "bg-transparent" : "bg-white", bodyClassName)}>{children}</div>
    </div>
  );
}
