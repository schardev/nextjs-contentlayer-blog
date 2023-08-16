import { cn } from "@/lib/utils";

const BlogPageLayout = ({
  children,
  title,
  className,
  gridClassName,
  as: Element = "section",
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  gridClassName?: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) => {
  return (
    <Element className={className}>
      <h2 className="text-xl lg:text-2xl font-bold mb-8 lg:mb-12">{title}</h2>
      <div
        className={cn(
          "grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-12",
          gridClassName,
        )}>
        {children}
      </div>
    </Element>
  );
};

export default BlogPageLayout;
