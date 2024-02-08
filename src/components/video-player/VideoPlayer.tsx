

import React from 'react'

export interface VideoPlayerProps {
  url: string
}

export default function VideoPlayer(props: VideoPlayerProps) {
  return (
    <div>
      <video controls={true} muted={true} className='w-full max-h-[300px]'>
        <source src={props.url} />
      </video>
    </div>
  )
}
