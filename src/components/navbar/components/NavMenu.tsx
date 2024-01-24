import { IRoute } from '@/app/routes'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavMenu({ route, depth = 0 } : { route: IRoute, depth: number }) {

  const pathName = usePathname();
  
  if (route.subroute == null) return (
    <a className={classNames('flex h-12 items-center w-full cursor-pointer', {
      'bg-blue-400/30 hover:bg-blue-200/30 pl-4': depth == 0,
      'font-bold underline bg-yellow-400/50': pathName == route.path,
      'hover:underline': depth > 0,
      'pl-6': depth == 1,
      'pl-8': depth == 2,
      'pl-10': depth == 3,
    })} href={route.path}>{route.name}</a>
  )
  

  else return (
    <div className='flex flex-col'>
      <p className={classNames('flex h-12 items-center w-full cursor-pointer', {
        'bg-blue-400/30 hover:bg-blue-200/30 pl-4': depth == 0,
        'hover:underline': depth > 0,
        'pl-6': depth == 1,
        'pl-8': depth == 2,
        'pl-10': depth == 3,
      })}>{route.name}</p>
      <div className=''>
        {route.subroute.map(x => (<NavMenu route={x} depth={depth + 1} key={`${depth+1}${x.name}`}/>))}
      </div>
    </div>

  )
  
}
