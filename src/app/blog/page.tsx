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

  const usedComponents = {
    ...DefaultMarkdownComponents,
    h3: (props: any) => (<h3 className='font-bold text-lg mb-4 mt-4'>{props.children}</h3>),
    p: (props: any) => (<p className='text-justify mt-4 mb-4'>{props.children}</p>)
  }

  return (
    <BlogPage { ...markdownData }/>
  )
}
