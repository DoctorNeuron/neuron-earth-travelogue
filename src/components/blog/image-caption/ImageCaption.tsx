'use client'

import { useGlobalStore } from '@/utilities/store'
import Image from 'next/image'
import React from 'react'

export interface ImageCaptionProps {
  src: string,
  caption: string,
  externalSource: boolean
}

export default function ImageCaption(props: ImageCaptionProps) {

  const setPic = useGlobalStore(x => x.setPicturePopup);
  return (
    <>
      <span className="flex justify-center items-center flex-col w-full mt-3 mb-3">
        <Image src={props.src} alt={props.caption} width={0} height={0} onClick={() => { setPic(props.src) }} sizes={"70vw"} className='rounded-md mb-1 cursor-pointer w-auto max-h-[400px]' />
        <span className="italic font-thin text-sm">{props.caption}</span>
        { props.externalSource && <span className="italic font-thin text-sm"><a className='hover:underline' href={props.src}>Source</a></span>}
      </span>
    </>
  )
}
