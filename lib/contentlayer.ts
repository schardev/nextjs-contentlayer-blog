import { allBlogPosts } from "contentlayer/generated";

/** Returns all blog posts sorted by date (latest first) */
export const allSortedBlogs = [
  ...allBlogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  ),
];
