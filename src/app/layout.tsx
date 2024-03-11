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
      <body suppressHydrationWarning={true} className={classNames(inter.className, 'bg-[#1d1d1f]', 'scrollbar-thumb-slate-600 scrollbar-track-slate-200')}>
        <SkeletonTheme baseColor='#262729' highlightColor='#383a3d'>  
          <div className='relative flex h-screen z-2'>
              <NavbarNew />
              <main className={classNames('overflow-auto w-full scrollbar-default', {
                'max-md:hidden': !collapse
              })}>
                <div className='m-9'>
                  {children}
                </div>
              </main>
          </div>
          <div>
            <ModalPhoto/>
          </div>
        </SkeletonTheme>
      </body>
    </html>
  )
}
