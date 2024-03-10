'use client'

import { DefaultMarkdownComponents } from '@/components/blog/constant'
import Citation from '@/components/citation/Citation'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import React, { useEffect, useState } from 'react'
import { BlogPageProps } from './page'
import FoodReview from '@/components/blog/food-review/FoodReview'
import Transportation from '@/components/blog/transportation/Transportation'

export interface BlogClientPageProps {
  data: BlogPageProps
}

export default function BlogClientPage(props: BlogClientPageProps) {

  const [data, setData] = useState("");

  const usedComponents = {
    ...DefaultMarkdownComponents,
    FoodReview: async (pr: any) => {
      let id = pr.id as string;
      return <FoodReview id={id} order={props.data.review[id]} />
    },
    Transportation: (pr: any) => {
      let id = pr.id as string;
      return props.data.transportation[id] !== null ? <Transportation id={id} data={props.data.transportation[id]} /> : <p>Not Found</p>;
    },
    // FoodReview: async (pr: any) => {
    //   return <p>Food Review</p>
    // },
    // Transportation: (pr: any) => {
    //   return <p>Transport</p>  
    // },
    Citation: (pr: any) => {
      let id = pr.id as string;
      let citation = props.data.citation[id];
      return <Citation url={citation.url as string} id={id} />
    },
  };

  useEffect(() => {
    serialize(props.data.content)
      .then(d => {
        console.log("Data");
        console.log(d);
        setData(d.compiledSource)
      }
      );
  });
  
  return (
    <div>
      { data.length > 0 && <MDXRemote compiledSource={data} components={usedComponents}></MDXRemote>}
    </div>
  )
}
