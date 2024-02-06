import React from 'react';

export interface VideoProps {
  source: string,
  mute: boolean
}

export default function Video(props: VideoProps) {
  return (
    <div>
      <video muted={props.mute} autoPlay={false}>
        <source src={props.source}/>
      </video>
    </div>
  )
}
