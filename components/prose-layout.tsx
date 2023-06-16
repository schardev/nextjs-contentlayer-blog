import { cn } from "@/lib/utils";

const ProseLayout = ({
  children,
  className,
  ...restProps
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("prose prose-custom lg:prose-lg", className)}
      {...restProps}>
      {children}
    </div>
  );
};

export default ProseLayout;
