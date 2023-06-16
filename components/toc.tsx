"use client";

import Link from "@/components/link";
import { cn, isArrayNotEmpty } from "@/lib/utils";
import { NavArrowRight } from "iconoir-react";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";

type TocProps = {
  contents: Array<{ text: string; slug: string; depth: number }>;
  className?: string;
};

export const TocMobile = ({ contents, className }: TocProps) => {
  if (!isArrayNotEmpty(contents)) return null;

  return (
    <div className={cn("my-6", className)}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          className={cn(
            "flex gap-2 items-center text-sm text-[--color-body]",
            "bg-[--color-toc-button-bg] border border-borders",
            "py-2 pr-[0.5em] pl-[1em] rounded-global font-medium",
            "[&>svg]:data-[state=open]:rotate-90 [&>svg]:text-xs"
          )}>
          <span>On this page</span>
          <NavArrowRight />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          loop
          // don't autofocus back to the trigger when clicked
          onCloseAutoFocus={(e) => e.preventDefault()}
          align="start"
          sideOffset={10}
          avoidCollisions={false}
          className={cn(
            "w-[calc(var(--radix-dropdown-menu-content-available-width)-var(--px-padding))]",
            "lg:w-fit xl:hidden",
            "data-[state=open]:animate-slide-up-fade",
            "data-[state=closed]:animate-slide-down-fade"
          )}>
          <nav
            className={cn(
              "bg-[--color-toc-button-bg] text-[--color-body]",
              "border border-borders rounded-global p-4",
              "min-w-[50vw] max-h-[50vh] overflow-y-auto",
              "max-xl:shadow-md"
            )}>
            <ul>
              {contents.map((e) => {
                if (e.depth > 2) return;
                return (
                  <li key={e.text} className="hover:text-accent">
                    <DropdownMenuItem key={e.text} asChild>
                      <Link
                        href={`#${e.slug}`}
                        className="p-2 block hover:outline-none">
                        {e.text}
                      </Link>
                    </DropdownMenuItem>
                  </li>
                );
              })}
            </ul>
          </nav>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const TocDesktop = ({ contents, className }: TocProps) => {
  const [hash, setHash] = useState("");
  const allAnchorLinksRef = useRef<NodeListOf<HTMLElement>>();
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    allAnchorLinksRef.current = document.querySelectorAll("h2[id]");
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHash(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );
    allAnchorLinksRef.current.forEach((e) => observerRef.current?.observe(e));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  if (!contents.length) return null;
  return (
    <div className={className}>
      <nav className="pl-8">
        <p className="text-xl pb-4 font-medium">On this page</p>
        <ul className={cn("max-lg:shadow-md bg-transparent p-0")}>
          {contents.map((e) => {
            if (e.depth > 2) return;
            return (
              <li key={e.text}>
                <Link
                  href={`#${e.slug}`}
                  className={cn(
                    "block p-2 text-[--color-body] hover:text-accent px-4 py-2",
                    "border-l-2 border-l-borders",
                    "[&.active]:border-l-accent [&.active]:text-accent",
                    hash === e.slug && "active"
                  )}>
                  {e.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default TocDesktop;
