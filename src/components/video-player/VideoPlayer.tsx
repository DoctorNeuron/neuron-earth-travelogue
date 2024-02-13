import React from 'react'

export interface VideoPlayerProps {
  url: string,
  title?: string
}

export default function VideoPlayer(props: VideoPlayerProps) {
  return (
    <div>
      <video controls={true} muted={true} className='w-full max-h-[300px]'>
        <source src={props.url} />
      </video>
      <p className="italic font-thin text-sm text-center">{props.title}</p>
    </div>
  )
}
