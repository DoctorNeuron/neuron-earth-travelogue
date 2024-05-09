"use client"

import React, { useRef, useState } from 'react'
import { OnProgressProps } from 'react-player/base';
import ReactPlayer, { ReactPlayerProps } from 'react-player/lazy';

export interface VideoPlayerProps {
  url: string,
  title?: string,

  start?: number,
  end?: number
}

interface VideoPlayerState {
  paused: boolean
}

export default function VideoPlayer(props: VideoPlayerProps) {

  const [videoPlayer, setVideoPlayer] = useState<VideoPlayerState>({
    paused: true
  });

  const videoRef = useRef<ReactPlayer>(null);

  function handleOnReady() {
    videoRef.current?.seekTo(props.start ?? 0);
  }

  function handleOnProgress(state: OnProgressProps) {
    if (!!props.end && Math.floor(state.playedSeconds) > props.end) {
      videoRef.current?.seekTo(props.start ?? 0)
      setVideoPlayer({ paused: true });
    }
    if (!!props.start && Math.floor(state.playedSeconds) < props.start) {
      videoRef.current?.seekTo(props.start ?? 0);
      setVideoPlayer({ paused: false });
    }
  }
  
  function handleOnSeek(seconds: number) {
    setVideoPlayer({ paused: false });
    if (!!props.end && Math.floor(seconds) > props.end) videoRef.current?.seekTo(props.start ?? 0);
    if (!!props.start && Math.floor(seconds) < props.start) videoRef.current?.seekTo(props.start ?? 0);
  }

  return (
    <div className='flex justify-center'>
      <ReactPlayer url={props.url}
        ref={videoRef}
        controls={true}
        muted={true}
        playing={!videoPlayer.paused}
        onProgress={(!props.end && !props.start) ? () => {} : handleOnProgress}
        onReady={(!props.end && !props.start) ? () => {} : handleOnReady}
        onSeek={(!props.end && !props.start) ? () => {} : handleOnSeek}
      />
    </div>
  )
}
