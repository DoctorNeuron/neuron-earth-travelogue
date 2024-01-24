"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { createContext } from 'react'
import { AppContext } from '@/model/context'
import Navbar from '@/components/navbar/Navbar'
import classNames from 'classnames'

const inter = Inter({ subsets: ['latin'] })

const context = createContext<AppContext>({ pictureModal: false, pictureSource: "" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={classNames(inter.className, 'flex h-screen')}>
        <Navbar/>
        <main className='overflow-auto'>
          <div className='m-12'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
