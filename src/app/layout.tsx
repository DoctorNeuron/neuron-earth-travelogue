"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { AppContext } from '@/model/context'
import Navbar from '@/components/navbar/Navbar'
import classNames from 'classnames'
import NavbarNew from '@/components/navbar-new/NavbarNew'

const inter = Inter({ subsets: ['latin'] });
export const CollapseContext = createContext<{ state: boolean, setState: Dispatch<SetStateAction<boolean>> }>({
  state: false,
  setState: () => {}
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [collapse, setCollapse] = useState(false);

  return (
    <CollapseContext.Provider value={{state: collapse, setState: setCollapse}}>
      <html lang="en">
        <body className={classNames(inter.className, 'flex h-screen')}>
          <NavbarNew />
          <main className={classNames('overflow-auto w-full', {
            'max-md:hidden': !collapse
          })}>
            <div className='m-9'>
              {children}
            </div>
          </main>
        </body>
      </html>
    </CollapseContext.Provider>
  )
}
