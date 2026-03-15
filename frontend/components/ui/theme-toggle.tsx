"use client";

import { Moon, Sun } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { type VariantProps } from "class-variance-authority";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ThemeToggleProps {
  size?: VariantProps<typeof buttonVariants>["size"];
  includeTooltip?: boolean;
}

export const ThemeToggle = ({ size = "icon", includeTooltip = false }: ThemeToggleProps) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const effective = theme === "system" ? systemTheme : theme;
  const toggleTheme = () => setTheme(effective === "dark" ? "light" : "dark");

  const button = (
    <Button
      variant="ghost"
      size={size}
      onClick={toggleTheme}
    >
      {!mounted || effective === "light" ? (
        <Moon className="h-5 w-5" fill="currentColor" />
      ) : (
        <Sun className="h-5 w-5" fill="currentColor" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );

  if (includeTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent align="center">
          <p>{!mounted || effective === 'dark' ? 'Light Mode' : 'Dark Mode'}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
};