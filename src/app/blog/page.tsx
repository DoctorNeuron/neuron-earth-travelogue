import BlogPage from '@/components/blog/blog-page/BlogPage';
import { DefaultMarkdownComponents } from '@/components/blog/constant';
import { fetchMarkdown } from '@/helper/markdown-helper';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

export const metadata: Metadata = {
  title: "👀 Before you read my blog",
}

export default async function FAQPage() {
  const markdownData = await fetchMarkdown(`blog/readme`);
  if (markdownData === false) return notFound();

  return (
    <BlogPage { ...markdownData }/>
  )
}
