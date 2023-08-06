import { BlogPost } from "contentlayer/generated";
import RenderPosts from "./render-posts";
import { allSortedBlogs } from "@/lib/contentlayer";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "iconoir-react";
import Link from "./link";

const PaginatorButton = ({
  pageLink,
  disable = false,
  children,
}: {
  children: React.ReactNode;
  pageLink: string;
  disable?: boolean;
}) => {
  return (
    <Link
      href={pageLink}
      className={cn("flex gap-2 text-sm p-2", disable && "hidden")}>
      {children}
    </Link>
  );
};

const PostPaginatorNav = ({
  currentPage,
  totalPages,
  pageLink,
}: {
  currentPage: number;
  totalPages: number;
  pageLink: string;
}) => {
  return (
    <nav className="flex flex-col items-center gap-5 pt-4">
      <PaginatorButton
        pageLink={`${pageLink}/${currentPage - 1}`}
        disable={currentPage === 1}>
        <ArrowLeft />
        <span>Previous</span>
      </PaginatorButton>
      <ol className="[&>li]:inline-block">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNumber = idx + 1;
          return (
            <li key={pageNumber}>
              <Link
                href={`${pageLink}/${pageNumber}`}
                className={cn(
                  "w-10 h-10 flex justify-center items-center rounded-md",
                  currentPage === pageNumber &&
                    "bg-background-secondary border border-borders pointer-events-none",
                )}>
                {pageNumber}
              </Link>
            </li>
          );
        })}
      </ol>
      <PaginatorButton
        pageLink={`${pageLink}/${currentPage + 1}`}
        disable={currentPage === totalPages}>
        <span>Next</span>
        <ArrowRight />
      </PaginatorButton>
    </nav>
  );
};

const PostPaginator = ({
  page,
  postPerPage,
  posts,
  pageLink = "/blog/page",
}: {
  page: number;
  postPerPage: number;
  posts?: BlogPost[];
  pageLink?: string;
}) => {
  const currentPage = page <= 1 ? 1 : page;
  const blogs = Array.isArray(posts) ? posts : allSortedBlogs;
  const totalPages = Math.ceil(blogs.length / postPerPage);
  const toSlice = currentPage === 1 ? 0 : postPerPage * (currentPage - 1);
  const postsToShow = blogs.slice(toSlice, postPerPage * currentPage);

  return (
    <>
      <RenderPosts posts={postsToShow} />
      {totalPages > 1 && (
        <PostPaginatorNav
          totalPages={totalPages}
          currentPage={currentPage}
          pageLink={pageLink}
        />
      )}
    </>
  );
};

export default PostPaginator;
