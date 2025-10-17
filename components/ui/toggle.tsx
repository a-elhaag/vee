import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/index";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-vee-red data-[state=on]:text-white data-[state=off]:glass-effect data-[state=off]:text-white/60 hover:data-[state=off]:text-white [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:ring-2 focus-visible:ring-vee-red outline-none whitespace-nowrap border data-[state=on]:border-vee-red data-[state=off]:border-white/10",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border-2 border-white/10 bg-transparent shadow-sm hover:glass-effect",
      },
      size: {
        default: "h-11 px-3 min-w-11 rounded-xl",
        sm: "h-9 px-2 min-w-9 rounded-lg",
        lg: "h-12 px-4 min-w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
