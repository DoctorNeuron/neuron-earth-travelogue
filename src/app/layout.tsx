"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import classNames from 'classnames'
import NavbarNew from '@/components/navbar-new/NavbarNew'
import { useGlobalStore } from '@/utilities/store'
import { SkeletonTheme } from 'react-loading-skeleton'

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const collapse = useGlobalStore(x => x.navbarCollapse);

  return (
    <html lang="en">
      <body className={classNames(inter.className, 'flex h-screen bg-[#1d1d1f]')}>
        <SkeletonTheme baseColor='#262729' highlightColor='#383a3d'>
          <NavbarNew />
          <main className={classNames('overflow-auto w-full', {
            'max-md:hidden': !collapse
          })}>
            <div className='m-9'>
              {children}
            </div>
          </main>
        </SkeletonTheme>
      </body>
    </html>
  )
}
