import { AppRoutes } from '@/app/routes'
import React, { useContext, useState } from 'react'
import NavMenu from './components/NavMenu'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'
import classNames from 'classnames';
import { CollapseContext } from '@/app/layout';

export default function NavbarNew() {

  const collapseCtx = useContext(CollapseContext);

  return (
    <nav className={classNames({
      'w-[16rem] max-md:w-[100%]': !collapseCtx.state,
      'w-[2rem]': collapseCtx.state
    })}>

      {/* Top */}
      <div className='flex justify-between mb-3 h-16'>
        <div className={classNames('p-4', { 'hidden': collapseCtx.state })}>
          <p className='font-bold text-lg'>NeuLore</p>
          <p className='font-light text-sm'>Ola</p>
        </div>
        <div
          className={classNames('w-[2rem] h-full flex items-center cursor-pointer bg-slate-900 justify-center')}
          onClick={() => { collapseCtx.setState(!collapseCtx.state) }}
        >
          {collapseCtx.state ? <ChevronRight /> : <ChevronLeft />}
        </div>
      </div>

      {/* Middle */}
      <div className={classNames({ 'hidden': collapseCtx.state })}>
        {AppRoutes.map(x => (<NavMenu route={x} key={`0${x.name}`} depth={0} />))}
      </div>

    </nav>
  )
}
