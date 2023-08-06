import BlogPageLayout from "@/components/layout/blog-page-layout";
import PostPaginator from "@/components/post-paginator";
import config from "@/lib/siteConfig";
import { allSortedBlogs } from "@/lib/contentlayer";
import { isArrayNotEmpty, nonNullable, slugify } from "@/lib/utils";
import { notFound } from "next/navigation";

export const generateStaticParams = () => {
  const allTags = allSortedBlogs
    .flatMap((post) => post.tags)
    .filter(nonNullable)
    .map((t) => slugify(t));
  return allTags.map((t) => ({ tag: [t] }));
};

const Page = ({ params }: { params: { tag?: string[] } }) => {
  if (!isArrayNotEmpty(params.tag)) notFound();

  const tag = params.tag[0];
  const posts = allSortedBlogs.filter(
    (post) => post.tags && post.tags.map((tag) => slugify(tag)).includes(tag),
  );

  return (
    <BlogPageLayout
      title={
        <>
          Showing posts with tag:{" "}
          <span className="underline underline-offset-[0.5ex] decoration-accent">
            {tag}
          </span>
        </>
      }>
      <PostPaginator
        posts={posts}
        postPerPage={config.blog.postPerPage}
        page={1}
        pageLink={`/blog/tags/${tag}/page`}
      />
    </BlogPageLayout>
  );
};

export default Page;
