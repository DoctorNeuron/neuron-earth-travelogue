"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import classNames from 'classnames'
import NavbarNew from '@/components/navbar-new/NavbarNew'
import { useGlobalStore } from '@/utilities/store'
import { SkeletonTheme } from 'react-loading-skeleton'
import ModalPhoto from '@/components/modal-photo/ModalPhoto'

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const collapse = useGlobalStore(x => x.navbarCollapse);

  return (
    <html lang="en">
      <body className={classNames(inter.className, 'bg-[#1d1d1f]')}>
        <div className='relative flex h-screen z-2'>
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
        </div>
        <div>
          {/* <ModalPhoto/> */}
        </div>
      </body>
    </html>
  )
}
