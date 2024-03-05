import React from 'react'
import matter from 'gray-matter';
import { DateTime } from 'luxon';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { fetchMarkdown } from '@/helper/markdown-helper';
import { DefaultMarkdownComponents } from '@/components/blog/constant';
import { Markdown } from '@/model/markdown';

interface MarkdownData {
  title: string,
  id: string,
  author: string,
  date: DateTime,
  path: string,
  keywords: string[]
}

interface BlogPageProps {
  content: string,
  // citation: { [key: string]: CitationData },
  data: MarkdownData
}

async function processContent(mat: Markdown) {
  const reviewPath = (mat.data.path as string).split('/');
  reviewPath.pop();

  return {
    content: mat.content,
    data: {
      title: mat.data.title,
      id: mat.data.id,
      author: mat.data.author,
      date: DateTime.fromISO(mat.data.date),
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

export default async function BlogPage({ params }: { params: { route: string } }) {
  const route = params.route;

  const markdownData = await fetchMarkdown(`transit/content/${route}`);
  if (markdownData === false) return notFound();

  const finalData = await processContent(markdownData);

  return (
    <div>
      <MDXRemote source={finalData.content} components={DefaultMarkdownComponents}></MDXRemote>
    </div>
  )
}
