import React from 'react'
import { FoodReviewData, FoodReviewVendor } from '@/model/food-review';
import { notFound } from 'next/navigation';
import { fetchJson, fetchMarkdown } from '@/helper/markdown-helper';
import { TransportationList, TransportationMode } from '@/model/transportation';
import { CitationData, CitationList } from '@/model/citation';
import { Markdown } from '@/model/markdown';
import { serialize } from 'next-mdx-remote/serialize';
import BlogPage, { BlogPageProps } from '@/components/blog/blog-page/BlogPage';

interface MarkdownData {
  title: string,
  id: string,
  author: string,
  date: string,
  path: string,
  keywords: string[]
}

async function processContent(mat: Markdown) {
  const reviewPath = (mat.data.path as string).split('/')[0];

  const reviewFetch = await fetchJson<FoodReviewData>(`${reviewPath}/review`);
  if (!reviewFetch) return false;

  const transportFetch = await fetchJson<TransportationList>(`${reviewPath}/transportation`);
  if (!transportFetch) return false;

  const citationFetch = await fetchJson<CitationList>(`${reviewPath}/citation`);
  if (!citationFetch) return false;

  return {
    content: mat.content,
    review: reviewFetch[mat.data.date],
    transportation: transportFetch[mat.data.date],
    citation: citationFetch[mat.data.date],
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

export async function generateMetadata({ params }: { params: { route: string[] } }) {
  const route = params.route;
  let d = await fetchMarkdown(`blog/content/${route[0]}/${route[1]}`)
  if (d === false) return false;
  return {
    title: d.data.title
  }
}

export default async function TravelBlogPage({ params }: { params: { route: string[] } }) {
  const route = params.route;
  if (route.length !== 2) return notFound();

  const markdownData = await fetchMarkdown(`blog/content/${route[0]}/${route[1]}`);
  if (markdownData === false) return notFound();

  const finalData = await processContent(markdownData);
  if (finalData === false) return notFound();

  return (
    <BlogPage {...finalData}/>
  )
}
