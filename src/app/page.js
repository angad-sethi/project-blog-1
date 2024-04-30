import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import {getBlogPostList} from "@/helpers/file-helpers"

async function Home() {
  const list = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Recently published:
      </h1>

      {list.map(list => <BlogSummaryCard
      key={list.key}
        slug={list.slug}
        title={list.title}
        abstract={list.abstract}
        publishedOn={list.publishedOn}
      />)
    }
    </div>
  );
}

export default Home;
