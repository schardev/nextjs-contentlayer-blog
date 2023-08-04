"use client";

import { cn } from "@/lib/utils";
import { ArrowUp } from "iconoir-react";
import { useEffect, useState } from "react";

const ScrollButton = () => {
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const userHasScrolled = window.scrollY >= window.innerHeight / 2;
    setScrolled(userHasScrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <button
      className={cn(
        "fixed right-[--px-padding] bottom-[--px-padding]",
        "bg-background-secondary p-3 rounded-full",
        "border border-borders",
        "translate-y-4 transition-[transform,opacity] duration-300",
        scrolled
          ? "opacity-60 translate-y-0 hover:opacity-100"
          : "opacity-0 pointer-events-none",
      )}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <ArrowUp />
    </button>
  );
};

export default ScrollButton;
