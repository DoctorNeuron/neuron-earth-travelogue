"use client"

import React from 'react'
import ReactPlayer from 'react-player/lazy';

export interface VideoPlayerProps {
  url: string,
  title?: string
}

export default function VideoPlayer(props: VideoPlayerProps) {

  return (
    <div className='flex justify-center'>
      <ReactPlayer url={props.url} controls={true} muted={true} />
    </div>
  )
}
