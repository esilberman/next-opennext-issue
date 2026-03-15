import { forwardRef, ComponentPropsWithoutRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    variant?: "default" | "small";
    miniKnob?: boolean;
  }
>(({ className, variant = "default", miniKnob = false, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group",
      !props.disabled && "cursor-pointer",
      props.orientation === "vertical" ? "flex-col h-full w-auto" : "h-auto w-full",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track 
      className={cn(
        "relative grow overflow-hidden rounded-full bg-secondary", // Rail color
        props.orientation === "vertical" ? "w-1 h-full" : "h-1 w-full",
        variant === "small" && (props.orientation === "vertical" ? "w-[3px]" : "h-[3px]")
      )}
    >
      <SliderPrimitive.Range 
        className={cn(
          "absolute bg-primary", // Track Infilled color
          props.orientation === "vertical" ? "w-full" : "h-full",
          props.disabled && "opacity-50"
        )} 
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb 
      className={cn(
        "block border-2 border-primary bg-background ring-offset-background transition-all focus-visible:outline-none disabled:pointer-events-none",
        props.disabled && "border-primary/50",
        miniKnob 
          ? "h-4 w-2 rounded-xs" 
          : variant === "small" 
            ? "h-4 w-4 rounded-full" 
            : "h-5 w-5 rounded-full",
        !props.disabled && "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2",
        !props.disabled && "group-hover:ring-6 group-hover:ring-primary/15 group-active:ring-8 group-active:ring-primary/20"
      )} 
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };