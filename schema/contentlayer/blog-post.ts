// esbuild  (which contentlayer uses behind the scenes) doesn't support ts path aliases
// @see - https://github.com/evanw/esbuild/issues/394
import { slugify } from "../../lib/utils";
import extractHeadings from "../../lib/mdx/contentlayer-extract-headings";
import { defineDocumentType } from "contentlayer/source-files";

const BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  contentType: "mdx",
  filePathPattern: "blog/**/*.mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    description: {
      type: "string",
      description: "Short description of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date when the post was published",
      required: true,
    },
    lastmod: {
      type: "date",
      description: "The date when the post was last modified",
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "Post tags",
    },
    image: {
      type: "string",
      description: "Heading image",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => slugify(post._raw.sourceFileName.replace(".mdx", "")),
    },
    headings: {
      type: "json",
      description: "All headings from the post",
      resolve: (post) => extractHeadings(post.body.raw),
    },
  },
}));

export default BlogPost;
