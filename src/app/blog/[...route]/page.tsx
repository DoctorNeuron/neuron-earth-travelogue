import React, { cache } from 'react'
import matter from 'gray-matter';
import { DateTime } from 'luxon';
import { MDXRemote } from 'next-mdx-remote/rsc';
import FoodReview from '../../../components/blog/food-review/FoodReview';
import ImageCaption from '@/components/blog/image-caption/ImageCaption';
import { useRouter } from 'next/router';

const BLOG_URL = "https://raw.githubusercontent.com/DoctorNeuron/neuron-earth-travelogue-content/master/";

interface MarkdownData {
  title: string,
  id: string,
  author: string,
  date: DateTime,
  path: string,
  keywords: string[]
}

const cacheData = cache(async () => {
  const res = await fetch(BLOG_URL + `blog/content/2024/january/20_multiple_places.md`);
  const mat = matter(await res.text());

  // cari data foodreview kalau ada
  const reviewPath = (mat.data.path as string).split('/');
  reviewPath.pop();
  const reviews = await (await fetch(`${BLOG_URL}${reviewPath.join('/')}/review.json`)).json()

  return {
    content: mat.content,
    review: reviews[mat.data.date],
    data: {
      title: mat.data.title,
      id: mat.data.id,
      author: mat.data.author,
      date: DateTime.fromISO(mat.data.date),
      path: mat.data.path,
      keywords: (mat.data.keywords as string).split("|")
    } as MarkdownData
  };
});

export async function generateMetadata() {
  return {
    title: (await cacheData()).data.title
  }
}

const usedComponents = {
  FoodReview: async (props: any) => {
    let id = props.id;
    let rev = (await cacheData())
    return <FoodReview id={id} order={rev.review[id]} />
  },
  img: (props: any) => {
    let realProps = props as { src: string, alt: string };
    let pathRegex = /([\.\.\/]+)([\w/\.-]+)/g;
    let start = pathRegex.exec(realProps.src) ?? [];
    let newPath = BLOG_URL + "blog/" + (start == null ? "" : start[2]);
    return <ImageCaption src={newPath} caption={realProps.alt} />
  },
  Image: (props: any) => {
    let realProps = props as { src: string, alt: string };
    let pathRegex = /([\.\.\/]+)([\w/\.-]+)/g;
    let start = pathRegex.exec(realProps.src) ?? [];
    let newPath = BLOG_URL + "blog/" + (start == null ? "" : start[2]);
    return <ImageCaption src={newPath} caption={realProps.alt} />
  },
  p: (props: any) => (<p className='text-justify mt-2 mb-2'>{props.children}</p>),
  h1: (props: any) => (<h1 className='font-bold text-4xl'>{props.children}</h1>),
  h2: (props: any) => (<h2 className='font-bold text-xl mt-8'>{props.children}</h2>),
  h3: (props: any) => (<h3 className='font-bold text-lg italic mb-4'>{props.children}</h3>),
}

export default async function BlogPage() {
  return (
    <div className="p-7">
      <MDXRemote source={(await cacheData()).content} components={usedComponents}></MDXRemote>
    </div>
  )
}
