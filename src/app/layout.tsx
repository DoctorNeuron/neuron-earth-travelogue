"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { createContext } from 'react'
import { AppContext } from '@/model/context'

const inter = Inter({ subsets: ['latin'] })

const context = createContext<AppContext>({ pictureModal: false, pictureSource: "" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='m-12'>{children}</main>
      </body>
    </html>
  )
}
