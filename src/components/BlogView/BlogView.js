"use client";
import React, { useState, useEffect } from "react";
import BlogSummaryCard from "@/components/BlogSummaryCard";
import SearchLight from "@/components/SearchLight";
import styles from "./BlogView.module.css";
function BlogView({ cachedData, onDataLoaded }) {
  const [blogPosts, setBlogPosts] = useState(cachedData || null);

  useEffect(() => {
    if (!blogPosts) {
      // Lazy load blog posts
      fetch("/api/blog-posts")
        .then((res) => res.json())
        .then((data) => {
          setBlogPosts(data);
          // Cache data in parent component
          if (onDataLoaded) {
            onDataLoaded(data);
          }
        })
        .catch((error) => {
          console.error("Error loading blog posts:", error);
        });
    }
  }, [blogPosts, onDataLoaded]);

  return (
    <div className={styles.wrapper}>
      <SearchLight label="(kinda) Recently published" />
      {blogPosts &&
        blogPosts.map((post) => (
          <BlogSummaryCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            abstract={post.abstract}
            publishedOn={post.publishedOn}
          />
        ))}
    </div>
  );
}

export default BlogView;
