"use client"

import React from 'react'
import ReactPlayer from 'react-player'

export interface VideoPlayerProps {
  url: string,
  title?: string
}

export default function VideoPlayer(props: VideoPlayerProps) {

  const isYoutube = props.url.startsWith("https://youtu.be") ||
    props.url.startsWith("https://youtube.com") ||
    props.url.startsWith("https://www.youtube.com")

  return (
    <div>

      {!isYoutube &&
        <video controls={true} muted={true} className='w-full max-h-[300px]'>
          <source src={props.url} />
        </video>
      }
      {
        isYoutube &&
        <div className='flex justify-center'>
          <iframe
            width="560"
            height="315"
            src={props.url}
            title={props.title}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          >
          </iframe>
        </div>
      }
      <p className="italic font-thin text-sm text-center">{props.title}</p>
    </div>
  )
}
