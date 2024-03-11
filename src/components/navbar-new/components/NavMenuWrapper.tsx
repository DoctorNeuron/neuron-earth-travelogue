import { IRoute } from '@/app/routes';
import React, { useEffect, useState } from 'react'
import NavMenu from './NavMenu';
import Skeleton from 'react-loading-skeleton';

const BLOG_URL =`${process.env.NEXT_PUBLIC_BLOG_URL}`;

export default function NavMenuWrapper() {
  const [route, setRoute] = useState<IRoute[]>([])

  useEffect(() => {
    fetch(BLOG_URL + "/routes.json", {
      cache: 'no-store'
    })
      .then(r => r.json())
      .then(d => {
        setRoute(d["router"] as IRoute[])
      })
  }, [])
  if (route.length > 0) return (
    <div>
      {route.map(x => (<NavMenu route={x} key={`0${x.name}`} depth={0} />))}
    </div>
  )

  else return (
    <div className='pl-2 pr-2'>
      <Skeleton height={400}/>
    </div>
  )
}
