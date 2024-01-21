import Image from 'next/image'
import React from 'react'

export interface ImageCaptionProps {
  src: string,
  caption: string
}

export default function ImageCaption(props: ImageCaptionProps) {
  return (
    <span className="flex justify-center items-center flex-col w-full mt-3 mb-3">
      <Image src={props.src} alt={props.caption} width={300} height={500} className='rounded-md mb-1'/>
      <span className="italic font-thin text-sm">{props.caption}</span>
    </span>
  )
}
