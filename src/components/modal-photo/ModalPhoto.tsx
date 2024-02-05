import React from 'react'
import { X } from 'react-bootstrap-icons'

export default function ModalPhoto() {
  return (
    <div className='absolute w-screen h-screen bg-black/50 z-4 top-0 left-0 flex justify-center items-center'>
      <div className='bg-[#1e1f21] min-w-[400px] min-h-[600px] rounded-md shadow-inner'>
        <div className='border-b-2 border-b-gray-800 h-12 text-4xl flex justify-end items-center pl-2 pr-2'>
          <X className='cursor-pointer'/>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}
