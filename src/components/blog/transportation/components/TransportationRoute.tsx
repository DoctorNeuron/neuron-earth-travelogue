import React from 'react'

export default function TransportationRoute({ route } : { route: string[] }) {
  return (
    <div className='flex'>
      <div className='line'>
        {route.map(x => (<TransportationPoint name={x} key={x} />)) }
      </div>
    </div>
  )
}
