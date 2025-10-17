import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/index";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wide transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default:
          "bg-vee-red text-white shadow-soft hover:bg-[#DC143C] hover:shadow-vee-red transition-all duration-200 border-0",
        destructive:
          "bg-vee-red text-white shadow-soft hover:bg-[#DC143C] hover:shadow-vee-red-lg transition-all duration-200",
        outline:
          "border-2 border-vee-red bg-transparent text-vee-red hover:bg-vee-red hover:text-white transition-all duration-200",
        secondary:
          "glass-effect text-white border border-white/10 hover:border-vee-red/50 transition-all duration-200",
        ghost:
          "hover:glass-effect hover:text-vee-red transition-all duration-200",
        link: "text-vee-red underline-offset-4 hover:underline normal-case",
      },
      size: {
        default: "h-11 px-6 py-3 has-[>svg]:px-4 rounded-xl",
        sm: "h-9 px-4 py-2 has-[>svg]:px-3 rounded-lg text-xs",
        lg: "h-14 px-8 py-4 has-[>svg]:px-6 rounded-2xl text-base",
        icon: "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
