'use client'

import { DefaultMarkdownComponents } from '@/components/blog/constant'
import Citation from '@/components/citation/Citation'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import React, { useEffect, useState } from 'react'
import FoodReview from '@/components/blog/food-review/FoodReview'
import Transportation from '@/components/blog/transportation/Transportation'
import { FoodReviewVendor } from '@/model/food-review'
import { TransportationMode } from '@/model/transportation'
import { CitationData } from '@/model/citation'
import { MarkdownData } from '@/model/markdown'
import BlogTag from '../blog-tag/BlogTag'
import { DateTime } from 'luxon'
import ImageCaption from '../image-caption/ImageCaption'

export interface BlogPageProps {
  content: string,
  review?: { [key: string]: FoodReviewVendor },
  transportation?: { [key: string]: TransportationMode },
  citation?: { [key: string]: CitationData },
  data: MarkdownData,
  blogType: "blog" | "transit"
}

export default function BlogPage(props: BlogPageProps) {

  const [data, setData] = useState("");

  const usedComponents = {
    ...DefaultMarkdownComponents,
    FoodReview: (pr: any) => {
      let id = pr.id as string;
      return (props.review !== undefined) ? <FoodReview id={id} order={props.review[id]} /> : <></>
    },
    Transportation: (pr: any) => {
      let id = pr.id as string;
      return props.transportation === undefined ? <></> :
        props.transportation[id] !== null ? <Transportation id={id} data={props.transportation[id]} /> : <p>Not Found</p>;
    },
    Citation: (pr: any) => {
      let id = pr.id as string;
      return props.citation === undefined ? <></> : <Citation url={props.citation[id].url as string} id={id} />
    },
    h1: (pr: any) => {
      let luxonDate = DateTime.fromFormat(props.data.date, "dd-LL-yyyy");
      return (
        <div className='pb-4'>
          <h1 className='font-bold text-4xl'>{pr.children}</h1>
          <p className='italic'>{luxonDate.toFormat("DDDD")}</p>
          <div className='flex flex-wrap gap-2'>
            {props.data.keywords.map(x => (<BlogTag tag={x} key={x}/>))}
          </div>
        </div>
      )
    },
    img: (pr: any) => {
      let realProps = pr as { src: string, alt: string };
      
      if ((/https:\/\/\w+/).test(pr.src)) return <ImageCaption src={realProps.src} caption={realProps.alt} externalSource={true} />
      
      let pathRegex = /([\.\.\/]+)([\w/\.-]+)/g;
      let start = pathRegex.exec(realProps.src) ?? [];
      let newPath = process.env.NEXT_PUBLIC_BLOG_URL + `${props.blogType}/` + (start == null ? "" : start[2]);
      return <ImageCaption src={newPath} caption={realProps.alt} externalSource={false} />
    },
  };

  useEffect(() => {
    serialize(props.content).then(d => {setData(d.compiledSource)});
  });
  
  return (
    <div>
      { data.length > 0 && <MDXRemote compiledSource={data} components={usedComponents}></MDXRemote>}
    </div>
  )
}

