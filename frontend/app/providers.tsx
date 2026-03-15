"use client";

import { ThemeProvider } from "next-themes";
import QueryProvider from "@/app/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      disableTransitionOnChange
      storageKey="theme"
    >
      <QueryProvider>
        <TooltipProvider delayDuration={200} >
          {children}
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}