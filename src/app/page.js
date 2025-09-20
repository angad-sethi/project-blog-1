import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";
import SearchLight from "@/components/SearchLight";
import TabNavigation from "@/components/TabNavigation";

import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers";

async function Home() {
  const list = await getBlogPostList();

  return (
    <div>
      <TabNavigation />
      <div className={styles.wrapper}>
        <SearchLight label="Recently published" />

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
    </div>
  );
}

export default Home;
