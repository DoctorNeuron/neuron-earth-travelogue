import React from 'react'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'
import classNames from 'classnames';
import SelectCurrency from './components/SelectCurrency';
import { useGlobalStore } from '@/utilities/store';
import NavMenuWrapper from './components/NavMenuWrapper';

export default function NavbarNew() {
  const [collapse, setCollapse] = useGlobalStore(s => [s.navbarCollapse, s.setNavbarCollapse]);
  
  return (
    <nav className={classNames('grid grid-rows-[5rem_auto_4rem] gap-2 bg-[#232529]', {
      'w-[16rem] max-md:w-[100%]': !collapse,
      'w-[2rem]': collapse
    })}>

      {/* Top */}
      <div className='flex justify-between'>
        <div className={classNames('p-4', { 'hidden': collapse })}>
          <p className='font-bold text-lg'>NeuLore</p>
          <p className='font-light text-sm'>Ola</p>
        </div>
        <div
          className={classNames('w-[2rem] flex items-center cursor-pointer bg-slate-900 justify-center')}
          onClick={setCollapse}
        >
          {collapse ? <ChevronRight /> : <ChevronLeft />}
        </div>
      </div>

      {/* Middle */}
      <div className={classNames({ 'hidden': collapse })}>
        <NavMenuWrapper/>
      </div>

      {/* Bottom */}
      <div className={classNames('p-2', { 'hidden': collapse })}>

        {/* Config */}
        <div>
          <SelectCurrency />
        </div>
      </div>

    </nav>
  )
}
