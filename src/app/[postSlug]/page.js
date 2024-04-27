import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Spinner from "@/components/Spinner"
import BlogHero from '@/components/BlogHero';
import {loadBlogPost} from "@/helpers/file-helpers"
import CircularColorsDemo from "@/components/CircularColorsDemo/index"
// import DivisionGroupsDemo from "@/components/DivisionGroupsDemo/index"
import CodeSnippet from "@/components/CodeSnippet/index"
import styles from './postSlug.module.css';
import dynamic from 'next/dynamic';

const DivisionGroupsDemo = dynamic(() => import("@/components/DivisionGroupsDemo/index"), { loading: Spinner });

export async function generateMetadata({ params }) {
  const post = await loadBlogPost(params.postSlug);
  const {frontmatter, content } = post;

  return {
    title: `${frontmatter.title} . Bits & Bytes`,
    description:`${frontmatter.abstract}`
  };
}

async function BlogPost({params}) {
  const post = await loadBlogPost(params.postSlug);
const {frontmatter, content } = post;
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
      <MDXRemote source={content} components={{pre: CodeSnippet, DivisionGroupsDemo, CircularColorsDemo}} />
      </div>
    </article>
  );
}

export default BlogPost;
