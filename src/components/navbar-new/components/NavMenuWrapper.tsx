import { IRoute } from '@/app/routes';
import React, { useEffect, useState } from 'react'
import NavMenu from './NavMenu';
import Skeleton from 'react-loading-skeleton';

const BLOG_URL = "http://localhost:12345/blog/";
async function getRoutes() {
  let data = await (await fetch(BLOG_URL + "routes.json")).json()
  return data["router"] as IRoute[];
}

export default function NavMenuWrapper() {
  const [route, setRoute] = useState<IRoute[]>([])

  useEffect(() => {
    fetch(BLOG_URL + "routes.json")
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
