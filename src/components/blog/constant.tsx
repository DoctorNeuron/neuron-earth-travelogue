import React from 'react';
import ImageCaption from './image-caption/ImageCaption';
import VideoPlayer from '../video-player/VideoPlayer';
import { ICurrency } from '@/utilities/store';
import Code from '../code/Code';

export const DefaultMarkdownComponents = {
  img: (pr: any) => {
    let realProps = pr as { src: string, alt: string };
    
    if ((/https:\/\/\w+/).test(pr.src)) return <ImageCaption src={realProps.src} caption={realProps.alt} externalSource={true} />
    
    let pathRegex = /([\.\.\/]+)([\w/\.-]+)/g;
    let start = pathRegex.exec(realProps.src) ?? [];
    let newPath = process.env.NEXT_PUBLIC_BLOG_URL + "blog/" + (start == null ? "" : start[2]);
    return <ImageCaption src={newPath} caption={realProps.alt} externalSource={false} />
  },
  Video: (pr: any) => {
    let realProps = pr as { src: string, alt: string };
    let pathRegex = /([\.\.\/]+)([\w/\.-]+)/g;
    let start = pathRegex.exec(realProps.src) ?? [];

    const isYoutube = pr.src.startsWith("https://youtu.be") ||
      pr.src.startsWith("https://youtube.com") ||
      pr.src.startsWith("https://www.youtube.com");

    let newPath = process.env.NEXT_PUBLIC_BLOG_URL + "blog/" + (start == null ? "" : start[2]);
    return <VideoPlayer url={isYoutube ? pr.src : newPath} title={pr.title ?? ''} />
  },
  p: (pr: any) => (<p className='text-justify mt-2 mb-2'>{pr.children}</p>),
  h1: (pr: any) => (<h1 className='font-bold text-4xl'>{pr.children}</h1>),
  h2: (pr: any) => (<h2 className='font-bold text-xl mt-8'>{pr.children}</h2>),
  h3: (pr: any) => (<h3 className='font-bold text-lg italic mb-4'>{pr.children}</h3>),
  ul: (pr: any) => (<ul className='text-justify gap-3'>{pr.children}</ul>),
  li: (pr: any) => (<li className='text-justify mb-4 last:mb-8 list-disc ml-5'>{pr.children}</li>),
  pre: (pr: any) => {
    let code = pr.children as React.Component<React.PropsWithChildren & { className: string }>;

    let a = code.props.className;
    a = a.replace("language-", "");
    return <Code code={String(code.props.children)} language={a}/>
  }
};

export const CurrencyOptions: ICurrency[] = [
  "-",
  "idr",
  "sgd",
  "usd",
  "sar",
  "try",
  "eur",
  "myr"
];
