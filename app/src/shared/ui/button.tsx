import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      link: "btn-link",
      active: "btn-active",
      notActive: "btn-notActive",
      login: "btn-login",
      default: "btn-default",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      error: "btn-error",
      orange: "btn-orange",
      purple: "btn-purple",
      yellow: "btn-yellow",
      disconnect: "btn-disconnect",
      darkViolet: "btn-darkViolet",
      green: "btn-green",
      white: "btn-white",
      red: "btn-red",
      blue: "btn-blue",
      buyGreen: "btn-buyGreen",
      buyBlue: "btn-buyBlue",
      success: "btn-success",
      signIn: "btn-signIn",
      inactive: "btn-inactive",
      bonusTimer: "btn-bonusTimer",
      claimed: "btn-claimed",
    },
    size: {
      default: "btn-size-default",
      h15: "btn-size-h15",
      sm: "btn-size-sm",
      lg: "btn-size-lg",
      xl: "btn-size-xl",
      icon: "btn-size-icon",
      h13: "btn-size-h13",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
