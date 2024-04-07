import React from 'react'

interface BlogTagProps
{
  tag: string
}

export default function BlogTag(props: BlogTagProps) {
  return (
    <div className='p-1 px-2 rounded-md bg-zinc-700 text-white text-xs'>
      {props.tag}
    </div>
  )
}
