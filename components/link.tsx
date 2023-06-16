import { ArrowTr } from "iconoir-react";
import { default as NextLink } from "next/link";
import { forwardRef } from "react";

type LinkProps = React.ComponentPropsWithoutRef<"a"> & {
  showIcon?: boolean;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, showIcon = false, href = "", ...restProps },
  forwardedRef
) {
  // TODO: use regex instead of `startWith`
  const isRouterLink = href.startsWith("/");
  const isExternalLink = href.startsWith("https") || href.startsWith("http");
  // const isAnchorLink = href.startsWith("#");
  const Link = isRouterLink ? NextLink : "a";

  return (
    <Link
      href={href}
      ref={forwardedRef}
      {...(isExternalLink
        ? {
            rel: "noopener noreferrer nofollow",
          }
        : {})}
      {...restProps}>
      {children}
      {isExternalLink && showIcon && (
        <span className="inline-flex text-[0.7em]">
          <ArrowTr />
        </span>
      )}
    </Link>
  );
});

export default Link;
