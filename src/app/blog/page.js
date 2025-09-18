import React from "react";
import BlogSummaryCard from "@/components/BlogSummaryCard";
import { getBlogPostList } from "@/helpers/file-helpers";
import styles from "./blog.module.css";

async function BlogPage() {
  const list = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Blog Posts</h1>
        <p className={styles.subtitle}>
          Thoughts, ideas, and insights about frontend development
        </p>
      </header>

      <div className={styles.postsList}>
        {list.map((post) => (
          <BlogSummaryCard
            key={post.key}
            slug={post.slug}
            title={post.title}
            abstract={post.abstract}
            publishedOn={post.publishedOn}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogPage;
