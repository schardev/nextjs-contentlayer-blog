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
      <h2 className="page-heading">{title}</h2>
      <div className={cn("post-grid", gridClassName)}>{children}</div>
    </Element>
  );
};

export default BlogPageLayout;
