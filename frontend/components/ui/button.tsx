import { forwardRef, ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 gap-2 transition-transform duration-200 ease-out hover:scale-105",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive-active",
        outline: "border border-input bg-background hover:bg-accent active:bg-border",
        secondary: "bg-secondary text-foreground hover:bg-secondary-hover active:bg-secondary-active border border-input",
        ghost: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-hover active:text-primary-active px-0",
      },
      size: {
        tiny: "h-7 px-2.5 text-xs [&>#icon-wrapper]:size-4",
        xs: "h-8 px-3 text-sm [&>#icon-wrapper]:size-4",
        sm: "h-9 px-3.5 text-base [&>#icon-wrapper]:size-5",
        default: "h-10 px-5 py-2 text-lg [&>#icon-wrapper]:size-5",
        medium: "h-10 px-5 py-2 text-xl [&>#icon-wrapper]:size-6",
        lg: "h-12 px-9 text-xl [&>#icon-wrapper]:size-6",
        xl: "h-16 px-11 text-3xl [&>#icon-wrapper]:size-8",
        "icon-tiny": "size-7 [&>#icon-wrapper]:size-4",
        "icon-xs": "size-8 [&>#icon-wrapper]:size-4",
        "icon-sm": "size-9 [&>#icon-wrapper]:size-5",
        "icon": "size-10 [&>#icon-wrapper]:size-5",
        "icon-medium": "size-10 [&>#icon-wrapper]:size-6",
        "icon-lg": "size-12 [&>#icon-wrapper]:size-6",
        "icon-xl": "size-16 [&>#icon-wrapper]:size-8",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: true,
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, rounded, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };