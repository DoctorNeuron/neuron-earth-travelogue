import React from 'react'
import { DateTime } from 'luxon';
import { notFound } from 'next/navigation';
import { fetchMarkdown } from '@/helper/markdown-helper';
import { Markdown, MarkdownData } from '@/model/markdown';
import BlogPage, { BlogPageProps } from '@/components/blog/blog-page/BlogPage';


async function processContent(mat: Markdown) {
  const reviewPath = (mat.data.path as string).split('/');
  reviewPath.pop();

  return {
    content: mat.content,
    data: {
      title: mat.data.title,
      id: mat.data.id,
      author: mat.data.author,
      date: mat.data.date,
      path: mat.data.path,
      keywords: mat.data.keywords
    } as MarkdownData
  } as BlogPageProps;

}

export async function generateMetadata({ params }: { params: { route: string } }) {
  const route = params.route;
  let d = await fetchMarkdown(`transit/content/${route}`)
  if (d === false) return false;
  return {
    title: d.data.title
  }
}

export default async function TransitBlogPage({ params }: { params: { route: string } }) {
  const route = params.route;

  const markdownData = await fetchMarkdown(`transit/content/${route}`);
  if (markdownData === false) return notFound();

  const finalData = await processContent(markdownData);

  return (
    <BlogPage {...finalData} blogType='transit'/>
  )
}
