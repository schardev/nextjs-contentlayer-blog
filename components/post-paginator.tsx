import { BlogPost } from "contentlayer/generated";
import PostPaginatorNav from "./post-paginator-nav";
import RenderPosts from "./render-posts";
import { allSortedBlogs } from "@/lib/contentlayer";

const PostPaginator = ({
  page,
  postPerPage,
  posts,
}: {
  page: number;
  postPerPage: number;
  posts?: BlogPost[];
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
        <PostPaginatorNav totalPages={totalPages} currentPage={currentPage} />
      )}
    </>
  );
};

export default PostPaginator;
