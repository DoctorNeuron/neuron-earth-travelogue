import React, { cache } from 'react'
import matter from 'gray-matter';
import { DateTime } from 'luxon';
import { MDXRemote } from 'next-mdx-remote/rsc';
import FoodReview from '../../../components/blog/food-review/FoodReview';
import ImageCaption from '@/components/blog/image-caption/ImageCaption';
import { FoodReviewData, FoodReviewVendor } from '@/model/food-review';
import { notFound } from 'next/navigation';
import { BLOG_URL, fetchJson, fetchMarkdown } from '@/helper/markdown-helper';

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
  data: MarkdownData
}


async function processContent(mat: matter.GrayMatterFile<string>) {
  // cari data foodreview kalau ada
  const reviewPath = (mat.data.path as string).split('/');
  reviewPath.pop();

  const reviewFetch = await fetchJson<FoodReviewData>(`${reviewPath.join('/')}/review`);
  if (!reviewFetch) return false;

  return {
    content: mat.content,
    review: reviewFetch[mat.data.date],
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
  let d = await fetchMarkdown(`blog/content/${route[0]}/${route[1]}/${route[2]}`)
  if (d === false) return false;
  return {
    title: d.data.title
  }
}

export default async function BlogPage({ params }: { params: { route: string[] } }) {
  const route = params.route;
  if (route.length !== 3) return false;

  const markdownData = await fetchMarkdown(`blog/content/${route[0]}/${route[1]}/${route[2]}`);
  if (markdownData === false) return notFound();

  const finalData = await processContent(markdownData);
  if (finalData === false) return notFound();

  const usedComponents = {
    FoodReview: async (pr: any) => {
      let id = pr.id as string;
      return <FoodReview id={id} order={finalData.review[id]} />
    },
    img: (pr: any) => {
      let realProps = pr as { src: string, alt: string };
      let pathRegex = /([\.\.\/]+)([\w/\.-]+)/g;
      let start = pathRegex.exec(realProps.src) ?? [];
      let newPath = BLOG_URL + "blog/" + (start == null ? "" : start[2]);
      return <ImageCaption src={newPath} caption={realProps.alt} />
    },
    Image: (pr: any) => {
      let realProps = pr as { src: string, alt: string };
      let pathRegex = /([\.\.\/]+)([\w/\.-]+)/g;
      let start = pathRegex.exec(realProps.src) ?? [];
      let newPath = BLOG_URL + "blog/" + (start == null ? "" : start[2]);
      return <ImageCaption src={newPath} caption={realProps.alt} />
    },
    p: (pr: any) => (<p className='text-justify mt-2 mb-2'>{pr.children}</p>),
    h1: (pr: any) => (<h1 className='font-bold text-4xl'>{pr.children}</h1>),
    h2: (pr: any) => (<h2 className='font-bold text-xl mt-8'>{pr.children}</h2>),
    h3: (pr: any) => (<h3 className='font-bold text-lg italic mb-4'>{pr.children}</h3>),
  };

  return (
    <div>
      <MDXRemote source={finalData.content} components={usedComponents}></MDXRemote>
    </div>
  )
}
