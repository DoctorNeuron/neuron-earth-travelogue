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

export interface BlogPageProps {
  content: string,
  review?: { [key: string]: FoodReviewVendor },
  transportation?: { [key: string]: TransportationMode },
  citation?: { [key: string]: CitationData },
  data: MarkdownData
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

