import config from "@/lib/siteConfig";
import Link from "@/components/link";

const MarkdownLink = ({
  target,
  href = "",
  ...restProps
}: React.ComponentPropsWithoutRef<"a">) => {
  const isExternalLink = href.startsWith("https");
  const linkTarget =
    isExternalLink && config.blog.openAllExternalLinksInNewTab
      ? "_blank"
      : target;
  return (
    <Link showIcon={true} href={href} target={linkTarget} {...restProps} />
  );
};

export default MarkdownLink;
