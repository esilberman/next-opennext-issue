"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        standard: "bg-muted-foreground/10 p-1 text-primary font-normal",
        outline: "border border-outline-border bg-transparent p-0 text-primary font-normal",
        underline: "h-auto w-full justify-start rounded-none border-b bg-transparent p-0 mb-[-1px] text-primary font-normal",
        ghost: "h-auto w-full justify-start rounded-none bg-transparent p-0 text-primary font-normal",
      },
      size: {
        tiny: "h-7",
        xs: "h-8",
        sm: "h-9",
        default: "h-10",
        md: "h-10",
        lg: "h-12",
        xl: "h-16",
      },
    },
    compoundVariants: [
      {
        variant: "standard",
        size: "tiny",
        className: "p-0.5",
      },
      {
        variant: "standard",
        size: "xs",
        className: "p-0.5",
      },
    ],
    defaultVariants: {
      variant: "standard",
      size: "default",
    },
  }
)

const tabsTriggerVariants = cva(
  "inline-flex h-full items-center justify-center gap-1.5 whitespace-nowrap rounded-sm font-md ring-offset-background transition-all text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        standard: "data-[state=active]:bg-pure data-[state=active]:ring-1 data-[state=active]:ring-border",
        outline: "rounded-none border-r border-border last:border-r-0 first:rounded-l-[calc(var(--radius)-2px)] last:rounded-r-[calc(var(--radius)-2px)] data-[state=active]:outline-none data-[state=active]:first:rounded-l-[calc(var(--radius)-2px)] data-[state=active]:last:rounded-r-[calc(var(--radius)-2px)]", // data-[state=active]:bg-pure
        underline: "relative rounded-none border-b-2 border-transparent bg-transparent pb-3 pt-2 text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
        ghost: "relative rounded-none border-r border-border/80 last:border-r-0 bg-transparent text-muted-foreground shadow-none transition-none data-[state=active]:text-foreground data-[state=active]:shadow-none",
      },
      size: {
        tiny: "px-2 text-xs",
        xs: "px-2.5 text-xs",
        sm: "px-3 text-sm",
        default: "px-4 text-sm",
        md: "px-5 text-base",
        lg: "px-8 text-lg",
        xl: "px-10 text-xl",
      },
    },
    defaultVariants: {
      variant: "standard",
      size: "default",
    },
  }
)

const TabsListContext = React.createContext<VariantProps<typeof tabsListVariants>>({})

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TabsListContext.Provider value={{ variant, size }}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant, size, className }))}
      {...props}
    />
  </TabsListContext.Provider>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof tabsTriggerVariants>
>(({ className, variant, size, ...props }, ref) => {
  const context = React.useContext(TabsListContext)
  const resolvedVariant = variant ?? (context.variant as any)
  const resolvedSize = size ?? (context.size as any)

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant: resolvedVariant, size: resolvedSize, className }))}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }