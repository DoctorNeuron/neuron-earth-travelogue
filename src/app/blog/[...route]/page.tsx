import React from 'react'
import matter from 'gray-matter';
import { DateTime } from 'luxon';
import { MDXRemote } from 'next-mdx-remote/rsc';
import FoodReview from '../../../components/blog/food-review/FoodReview';
import { FoodReviewData, FoodReviewVendor } from '@/model/food-review';
import { notFound } from 'next/navigation';
import { fetchJson, fetchMarkdown } from '@/helper/markdown-helper';
import { DefaultMarkdownComponents } from '@/components/blog/constant';
import { TransportationList, TransportationMode } from '@/model/transportation';
import Transportation from '@/components/blog/transportation/Transportation';
import { CitationData, CitationList } from '@/model/citation';
import Citation from '@/components/citation/Citation';
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
  review: { [key: string]: FoodReviewVendor },
  transportation: { [key: string]: TransportationMode },
  citation: { [key: string]: CitationData },
  data: MarkdownData
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
      date: DateTime.fromISO(mat.data.date),
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

export default async function BlogPage({ params }: { params: { route: string[] } }) {
  const route = params.route;
  if (route.length !== 2) return notFound();

  const markdownData = await fetchMarkdown(`blog/content/${route[0]}/${route[1]}`);
  if (markdownData === false) return notFound();

  const finalData = await processContent(markdownData);
  if (finalData === false) return notFound();

  const usedComponents = {
    ...DefaultMarkdownComponents,
    FoodReview: async (pr: any) => {
      let id = pr.id as string;
      return <FoodReview id={id} order={finalData.review[id]} />
    },
    Transportation: (pr: any) => {
      let id = pr.id as string;
      return finalData.transportation[id] !== null ? <Transportation id={id} data={finalData.transportation[id]} /> : <p>Not Found</p>;
    },
    Citation: (pr: any) => {
      let id = pr.id as string;
      let citation = finalData.citation[id];
      return <Citation url={citation.url as string} id={id} />
    },
  };

  return (
    <div>
      <MDXRemote source={finalData.content} components={usedComponents}></MDXRemote>
    </div>
  )
}
