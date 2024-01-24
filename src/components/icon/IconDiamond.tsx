import React from 'react'

export default function IconDiamond({ className } : { className: string }) {
  return (
    <svg width="160" height="160" className={className + ' z-0'}>
      <polygon points="0 0, 0 160, 160 80, 80 0" className='fill-white/15'/>
    </svg>
  )
}
