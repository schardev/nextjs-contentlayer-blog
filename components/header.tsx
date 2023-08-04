import config from "@/lib/siteConfig";
import Link from "@/components/link";
import ThemeToggle from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/contexts/theme-provider";

const navLinks = [
  { text: "Home", href: "/" },
  { text: "Blog", href: "/blog" },
];

const Header = () => {
  return (
    <ThemeProvider>
      <div
        className={cn(
          "sticky top-0 z-10 backdrop-blur-[10px] bg-background/80 shadow-sm",
          "transition-colors",
        )}>
        <header className={cn("max-w-container-center flex items-center py-4")}>
          <Link href="/" className={cn("text-lg font-bold mr-auto lg:text-xl")}>
            {config.title}
          </Link>
          <nav>
            <ul className={cn("flex items-center gap-4 md:gap-6 lg:gap-8")}>
              {navLinks.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="lg:text-lg lg:font-medium hover:text-accent">
                    {link.text}
                  </Link>
                </li>
              ))}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </ThemeProvider>
  );
};

export default Header;
