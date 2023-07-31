import BlogPageLayout from "@/components/layout/blog-page-layout";
import PostPaginator from "@/components/post-paginator";
import config from "@/lib/siteConfig";
import { allSortedBlogs } from "@/lib/contentlayer";
import { notFound } from "next/navigation";

const totalPages = Math.ceil(allSortedBlogs.length / config.blog.postPerPage);

export const generateStaticParams = () => {
  const params = Array.from({ length: totalPages }).map((_, idx) => ({
    count: [`${idx + 1}`],
  }));
  return params;
};

const Page = ({ params }: { params: { count?: string[] } }) => {
  const count = params.count ? +params.count : 1;
  if (!Number.isInteger(count) || count > totalPages) return notFound();

  return (
    <BlogPageLayout title="All Blog Posts">
      <PostPaginator postPerPage={config.blog.postPerPage} page={count} />
    </BlogPageLayout>
  );
};

export default Page;
