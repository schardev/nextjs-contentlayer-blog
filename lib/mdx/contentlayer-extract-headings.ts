import GithubSlugger from "github-slugger";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

type Headings = Array<{ depth: number; text: string; slug: string }>;

export default function extractHeadings(rawPostBody: string) {
  const slugger = new GithubSlugger();
  const tree = fromMarkdown(rawPostBody);
  const headings: Headings = [];
  visit(tree, "heading", (node) => {
    const text = toString(node);
    headings.push({
      depth: node.depth,
      slug: slugger.slug(text),
      text,
    });
  });
  slugger.reset();
  return headings;
}
