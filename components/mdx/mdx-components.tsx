import type { MDXComponents } from "mdx/types";
import MarkdownImage from "./mdx-image";
import MarkdownTable from "./mdx-table";
import MarkdownLink from "./mdx-link";
import MarkdownCodeTitles from "./mdx-code-titles";
import MarkdownPreCode from "./mdx-pre-code";
import Callout from "../callout";

const mdxComponents: MDXComponents = {
  // @ts-expect-error https://github.com/DefinitelyTyped/DefinitelyTyped/pull/65003
  img: MarkdownImage,
  a: MarkdownLink,
  div: MarkdownCodeTitles as any,
  pre: MarkdownPreCode,
  table: MarkdownTable,
  Callout,
};

export default mdxComponents;
