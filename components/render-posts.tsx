import { BlogPost } from "@/.contentlayer/generated";
import BlogCard from "./blog-card";

const RenderPosts = ({ posts }: { posts: BlogPost[] }) => {
  return posts.map((post) => (
    <BlogCard
      key={post.title}
      title={post.title}
      desc={post.description}
      tags={post.tags}
      date={post.date}
      img={post.image}
      href={`/${post.slug}`}
    />
  ));
};

export default RenderPosts;
