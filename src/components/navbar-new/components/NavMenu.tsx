import { IRoute } from '@/app/routes'
import classNames from 'classnames'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';

export default function NavMenu({ route, depth = 0 }: { route: IRoute, depth: number }) {

  const [collapse, setCollapse] = useState(false);
  const pathName = usePathname();

  // Kalau sudah end
  if (route.subroute == null) return (
    <Link href={route.path ?? "/"} className={classNames('text-white pr-2 flex h-8 items-center w-full cursor-pointer hover:border-b-2 hover:border-b-white no-underline text-sm', {
      'pl-4': depth === 0,
      'font-bold underline': pathName === route.path,
      'pl-6': depth === 1,
      'pl-8': depth === 2,
      'pl-10': depth === 3,
    })}>{route.name}</Link>
  )

  // Nesting route
  else return (
    <div className='flex flex-col'>
      <div className={classNames('pr-2 flex h-8 items-center w-full cursor-pointer justify-between bg-gray-900 text-sm', {
        'pl-4': depth === 0,
        'pl-6': depth === 1,
        'pl-8': depth === 2,
        'pl-10': depth === 3,
      })}
        onClick={() => { setCollapse(!collapse) }}
      >
        <p>{route.name}</p>
        {collapse ? <ChevronDown /> : <ChevronUp />}
      </div>
      <div className={classNames({ 'hidden': collapse })}>
        {route.subroute.map(x => (<NavMenu route={x} depth={depth + 1} key={`${depth + 1}${x.name}`} />))}
      </div>
    </div>

  )

}
