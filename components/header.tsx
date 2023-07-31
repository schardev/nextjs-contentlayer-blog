import config from "@/lib/siteConfig";
import Link from "@/components/link";
import ThemeToggle from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/contexts/theme-provider";

const Header = () => {
  return (
    <ThemeProvider>
      <div
        className={cn(
          "sticky top-0 z-10 backdrop-blur-[10px] bg-background/80 shadow-sm",
          "transition-colors"
        )}>
        <header className={cn("max-w-container-center flex items-center py-4")}>
          <Link href="/" className={cn("text-lg font-bold mr-auto lg:text-xl")}>
            {config.title}
          </Link>
          <ThemeToggle />
        </header>
      </div>
    </ThemeProvider>
  );
};

export default Header;
