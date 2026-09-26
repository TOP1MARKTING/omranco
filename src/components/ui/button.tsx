import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-2 border-black bg-primary text-primary-foreground hard-shadow hover:bg-primary/90 active:translate-x-px active:translate-y-px active:shadow-none",
        hero: "border-2 border-black bg-primary text-primary-foreground font-extrabold hard-shadow hover:bg-primary/90 active:translate-x-px active:translate-y-px active:shadow-none",
        ink: "border-2 border-black bg-ink text-ink-foreground hard-shadow hover:bg-ink/90",
        soft: "border-2 border-black bg-accent text-accent-foreground hard-shadow-sm hover:bg-accent/70 font-bold",
        destructive: "border-2 border-black bg-destructive text-destructive-foreground hard-shadow-sm hover:bg-destructive/90",
        outline:
          "border-2 border-black bg-white text-ink hard-shadow-sm hover:bg-ink hover:text-white",
        secondary: "border-2 border-black bg-secondary text-secondary-foreground hard-shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
