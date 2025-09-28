import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@shared/lib"

const headingVariants = cva(
  "text-base font-semibold text-left",
  {
    variants: {
      variant: {
        h2: "font-medium",
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, asChild = false, ...props }) => {
    const Comp = asChild ? Slot : "h2"
    return (
      <Comp
        className={cn(headingVariants({ variant, className }))}
        {...props}
      />
    )
  }
);
Heading.displayName = "Heading";

// export { Heading, headingVariants };
export { Heading };
