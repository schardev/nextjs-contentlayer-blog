import BrandIcon from "../brand-icon";

type MarkdownCodeTitlesProps = React.ComponentPropsWithoutRef<"div"> & {
  [key: `data-${string}`]: string;
};

const MarkdownCodeTitles = ({
  children,
  ...restProps
}: MarkdownCodeTitlesProps) => {
  if (!("data-rehype-pretty-code-title" in restProps))
    return <div {...restProps}>{children}</div>;

  const language = restProps["data-language"];

  return (
    <div {...restProps} className={"flex items-center gap-2"}>
      <BrandIcon
        brand={language}
        width="1em"
        height="1em"
        className="text-foreground-secondary"
      />
      <span>{children}</span>
    </div>
  );
};

export default MarkdownCodeTitles;
