import React, { useState } from 'react'
import IconDiamond from '../icon/IconDiamond'
import { AppRoutes } from '@/app/routes'
import NavMenu from './components/NavMenu'
import { ChevronCompactLeft, ChevronCompactRight } from 'react-bootstrap-icons'
import classNames from 'classnames'
import Image from 'next/image';

export default function Navbar() {

  const [state, setState] = useState(true);
  const handleOnClickChevron = () => setState(!state);

  return(
    <div className={classNames('flex', {
      'w-[2rem] max-md:w-[2rem]': !state
    })}>
      <nav className={classNames('relative h-full w-[15rem] max-md:w-[12rem] min-h-svh grid grid-rows-[6rem_auto_5rem] bg-sky-900', {
        'hidden': !state
      })}>
        <IconDiamond className='z-0 absolute translate-x-[-24px] translate-y-[-24px]'/>
        
        {/* Top */}
        <div className='h-full z-10 relative'>
          {/* <div className='z-[5]'>
            <Image className='absolute w-full' src="/flag_ps.svg" alt='a' fill={true} />
          </div> */}
          <div className="p-4 z-[8]">
            <p className='font-bold text-2xl'>Neu-Lore</p>
            <p className='font-italic text-xs'>Happy reading</p>
          </div>
        </div>

        {/* Middle */}
        <div className='h-full z-10 flex flex-col'>
          {AppRoutes.map(x => (<NavMenu route={x} key={`0${x.name}`} depth={0}/>))}
        </div>

        {/* Bottom */}
        <div className='relative overflow-hidden h-full'>
          <IconDiamond className='z-0 absolute rotate-180 translate-x-16'/>
          <div className='p-4 relative'>
            <p className='text-sm font-light'>Find me here hehe</p>
          </div>
        </div>
      </nav>
      <div className="flex items-center cursor-pointer">
        <div
          className="bg-sky-900 h-16 w-8 p-1 flex items-center rounded-lg rounded-tl-none rounded-bl-none text-xl"
          onClick={handleOnClickChevron}
        >
          { !state ? (<ChevronCompactRight/>) : (<ChevronCompactLeft/>) }
        </div>
      </div>

    </div>
  )
}
