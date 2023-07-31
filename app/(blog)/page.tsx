import BlogCard from "@/components/blog-card";
import BlogPageLayout from "@/components/layout/blog-page-layout";
import Link from "@/components/link";
import PostPaginator from "@/components/post-paginator";
import RenderPosts from "@/components/render-posts";
import { allSortedBlogs } from "@/lib/contentlayer";
import config from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

const Page = () => {
  if (!allSortedBlogs.length)
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-2xl lg:text-3xl mb-4">No posts found!</p>
        <p>
          See how to get started{" "}
          <Link
            href="https://github.com/schardev/nextjs-contentlayer-blog"
            className="text-accent text-lg"
            showIcon>
            here
          </Link>
        </p>
      </main>
    );

  const blogs = [...allSortedBlogs];
  const recentBlogs = blogs.splice(0, 4);
  const latestPost = recentBlogs.shift();
  const allPostsCount = config.blog.postPerPage - 4;

  return (
    <main>
      <BlogPageLayout title="Recent Blog Posts">
        {latestPost && (
          <BlogCard
            key={latestPost.title}
            title={latestPost.title}
            desc={latestPost.description}
            tags={latestPost.tags}
            date={latestPost.date}
            img={latestPost.image}
            href={`/${latestPost.slug}`}
            className={cn(
              // If sufficient blogs are present then make the most recent one
              // stand out from the rest
              recentBlogs.length >= 3 && [
                "lg:grid gap-8 grid-cols-2 lg:col-span-full",
                "lg:[&>img]:mb-0 lg:text-lg lg:[&_h3]:text-2xl lg:[&_h3+p]:mt-[1em]",
              ],
            )}
            priority
          />
        )}
        <RenderPosts posts={recentBlogs} />
      </BlogPageLayout>

      <hr className="border-borders my-8 lg:my-12" />

      {blogs.length > 0 && (
        <BlogPageLayout title="All Posts Posts">
          <PostPaginator
            posts={blogs}
            postPerPage={allPostsCount}
            page={1}
            pageLink="/page"
          />
        </BlogPageLayout>
      )}
    </main>
  );
};

export default Page;
