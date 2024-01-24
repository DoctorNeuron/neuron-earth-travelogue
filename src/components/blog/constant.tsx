import { BLOG_URL } from '@/helper/markdown-helper';
import React from 'react';
import ImageCaption from './image-caption/ImageCaption';

export const DefaultMarkdownComponents = {
  img: (pr: any) => {
    console.log(pr.src);
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
  ul: (props: any) => (<ul className='text-justify gap-3'>{props.children}</ul>),
  li: (props: any) => (<li className='text-justify mb-4 last:mb-8'>{props.children}</li>),

};