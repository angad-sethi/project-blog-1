import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import BlogHero from '@/components/BlogHero';
import {loadBlogPost} from "@/helpers/file-helpers"
// import DivisionGroupsDemo from "@/components/DivisionGroupsDemo/index"
import CodeSnippet from "@/components/CodeSnippet/index"
import styles from './postSlug.module.css';
import dynamic from 'next/dynamic';
// const DivisionGroupsDemo = dynamic(() => import("@/components/DivisionGroupsDemo/index"), { loading: Spinner });
import Claps1 from '@/components/claps/Claps1';

export async function generateMetadata({ params }) {
  const post = await loadBlogPost(params.postSlug);
  const {frontmatter, content } = post;

  return {
    title: `${frontmatter.title} . Angad's Blog`,
    description:`${frontmatter.abstract}`
  };
}

async function BlogPost({params}) {
  const post = await loadBlogPost(params.postSlug);
const {frontmatter, content } = post;
  return (
    <article className={styles.wrapper}>
    <Claps1/>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
      <MDXRemote source={content} components={{pre: CodeSnippet}} />
      </div>
    </article>
  );
}

export default BlogPost;
