import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import BlogHero from '@/components/BlogHero';
import {loadBlogPost} from "@/helpers/file-helpers"
// import DivisionGroupsDemo from "@/components/DivisionGroupsDemo/index"
import CodeSnippet from "@/components/CodeSnippet/index"
import styles from './postSlug.module.css';
import dynamic from 'next/dynamic';
// const DivisionGroupsDemo = dynamic(() => import("@/components/DivisionGroupsDemo/index"), { loading: Spinner });
import Clapswrapper from '@/components/claps/ClapsWrapper';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const post = await loadBlogPost(params.postSlug);
  if (!post) {
    return null;
  }

  const {frontmatter, content } = post;

  return {
    title: `${frontmatter.title} . Angad's Blog`,
    description:`${frontmatter.abstract}`
  };
}

async function BlogPost({params}) {
  const post = await loadBlogPost(params.postSlug);

  // If there is no blog post with the slug taken from the route
  // params, render a 404 page instead.
  if (!post) {
    notFound();
  }

const {frontmatter, content } = post;
  return (
    <article className={styles.wrapper}>
    <Clapswrapper/>
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
