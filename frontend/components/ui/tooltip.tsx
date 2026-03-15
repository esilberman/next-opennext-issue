import { forwardRef, ComponentPropsWithoutRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, align = "center", collisionPadding = 8, avoidCollisions = true, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      align={align}
      collisionPadding={collisionPadding}
      avoidCollisions={avoidCollisions}
      className={cn(
        "z-[9999] overflow-hidden rounded-md border bg-[oklch(0.205_0_0)] px-3 py-1.5 text-sm text-[oklch(0.985_0_0)] shadow-md",
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        "border-[oklch(1_0_0_/_10%)] dark:bg-[oklch(0.97_0_0)] dark:text-[oklch(0.205_0_0)] dark:border-[oklch(0.922_0_0)]",
        className,
      )}
      {...props}
    >
      {props.children}
      <TooltipPrimitive.Arrow
        width={10}
        height={6}
        className={cn(
          "fill-[oklch(0.205_0_0)] stroke-[oklch(1_0_0_/_10%)]",
          "dark:fill-[oklch(0.97_0_0)] dark:stroke-[oklch(0.922_0_0)]",
        )}
        style={{ strokeWidth: 1 }}
      />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };