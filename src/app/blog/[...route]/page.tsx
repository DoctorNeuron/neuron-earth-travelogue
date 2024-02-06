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
  transportation: { [key: string]: TransportationMode }
  data: MarkdownData
}

async function processContent(mat: matter.GrayMatterFile<string>) {
  const reviewPath = (mat.data.path as string).split('/');
  reviewPath.pop();

  const reviewFetch = await fetchJson<FoodReviewData>(`${reviewPath.join('/')}/review`);
  if (!reviewFetch) return false;

  const transportFetch = await fetchJson<TransportationList>(`${reviewPath.join('/')}/transportation`);
  if (!transportFetch) return false;

  // console.log(transportFetch[mat.data.date]['bus-1'].routes);

  return {
    content: mat.content,
    review: reviewFetch[mat.data.date],
    transportation: transportFetch[mat.data.date],
    data: {
      title: mat.data.title,
      id: mat.data.id,
      author: mat.data.author,
      date: DateTime.fromISO(mat.data.date),
      path: mat.data.path,
      keywords: (mat.data.keywords as string).split("|")
    } as MarkdownData
  } as BlogPageProps;

}

export async function generateMetadata({params}: {params: {route: string[]}}) {
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

  const usedComponents = { ...DefaultMarkdownComponents,
    FoodReview: async (pr: any) => {
      let id = pr.id as string;
      return <FoodReview id={id} order={finalData.review[id]} />
    },
    Transportation: (pr: any) => {
      let id = pr.id as string;
      return finalData.transportation[id] !== null ? <Transportation id={id} data={finalData.transportation[id]}/> : <p>Not Found</p>;
    },
  };

  return (
    <div>
      <MDXRemote source={finalData.content} components={usedComponents}></MDXRemote>
    </div>
  )
}
