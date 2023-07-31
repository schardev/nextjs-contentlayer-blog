import siteConfig from "@/lib/siteConfig";
import { allBlogPosts } from "contentlayer/generated";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = allBlogPosts.map((post) => ({
    url: `${siteConfig.url}/${post.slug}`,
    lastModified: post.lastmod ?? post.date,
  }));

  return [{ url: `${siteConfig.url}`, lastModified: new Date() }, ...blogs];
}
