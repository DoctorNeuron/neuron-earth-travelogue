import Link from 'next/link'
import React from 'react'

export interface CitationProps
{
  url: string,
  id: string
}

export default function Citation(props: CitationProps) {
  return (
    <span className='align-super text-blue-200 text-xs hover:underline'>
      <Link href={props.url} target='_blank'>{`[${props.id}]`}</Link>
    </span>
  )
}