import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";
import SearchLight from "@/components/SearchLight";

import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers";

async function Home() {
  const list = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <SearchLight />

      {list.map((list) => (
        <BlogSummaryCard
          key={list.key}
          slug={list.slug}
          title={list.title}
          abstract={list.abstract}
          publishedOn={list.publishedOn}
        />
      ))}
    </div>
  );
}

export default Home;
