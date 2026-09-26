import logoImg from "@/assets/omranco-logo.png";
import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <img
      src={logoImg}
      alt="OMRANCO BURGER"
      width={compact ? 48 : 140}
      height={compact ? 48 : 140}
      className={cn(
        "rounded-xl object-contain object-center",
        compact ? "size-10" : "size-[3.25rem] sm:size-14 md:size-16",
        className,
      )}
      decoding="async"
    />
  );
}
