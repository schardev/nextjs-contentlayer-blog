import { visit } from "unist-util-visit";
import { Heading, Root } from "mdast";

/* code taken from https://github.com/syntax-tree/mdast-normalize-headings with slight modifications */
export default function remarkNormalizeHeadings() {
  const max = 6;

  return (tree: Root) => {
    const all: Array<Heading> = [];
    let multiple = false;
    let heading: Heading | undefined;

    visit(tree, "heading", function (node) {
      all.push(node);
      if (node.depth === 1) {
        if (heading) multiple = true;
        else heading = node;
      }
    });

    // If there are multiple H1 headings increase their depth by one
    if (multiple) {
      let index = -1;
      while (++index < all.length) {
        const heading = all[index];
        if (heading.depth < max) {
          heading.depth++;
        }
      }
    } else if (heading) {
      heading.depth++;
    }
  };
}
