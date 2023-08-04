"use client";

import { Moon } from "@/lib/icons";
import { SunLight } from "iconoir-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";

const ThemeToggle = () => {
  const { theme, themes, resolvedTheme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Theme Toggle"
        className={cn(
          "text-sm align-middle p-2 rounded-md",
          "data-[state=open]:bg-background-secondary hover:bg-background-secondary",
        )}>
        {resolvedTheme === "dark" ? <Moon /> : <SunLight />}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className={cn(
          "z-20",
          "data-[state=open]:animate-slide-up-fade",
          "data-[state=closed]:animate-slide-down-fade",
        )}>
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={setTheme}
          className={cn(
            "[&>*]:capitalize",
            "bg-background-secondary p-1 rounded-md border shadow-md border-borders",
            "min-w-[120px]",
          )}>
          {themes.map((theme) => (
            <DropdownMenuRadioItem
              key={theme}
              value={theme}
              className={cn(
                "px-2 py-1 cursor-pointer rounded-md transition-colors",
                "hover:bg-background-tertiary hover:outline-none",
              )}>
              {theme}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
