import { useGlobalStore } from '@/utilities/store'
import classnames from 'classnames'
import Image from 'next/image';
import React from 'react'
import { X } from 'react-bootstrap-icons'

export default function ModalPhoto() {

  const [pic, setPic] = useGlobalStore(x => [x.picturePopup, x.setPicturePopup]);

  return (
    <div className={classnames('absolute w-screen h-screen bg-black/50 z-4 top-0 left-0 flex justify-center items-center', {
      'hidden': pic === ""
    })} onClick={() => { setPic("") }}>
      <div className='bg-[#1e1f21] min-w-[400px] rounded-md shadow-inner' onClick={(e) => { e.stopPropagation() }}>
        <div className='border-b-2 border-b-gray-800 h-12 text-4xl flex justify-end items-center pl-2 pr-2'>
          <X className='cursor-pointer' onClick={() => { setPic("") }}/>
        </div>
        <div>
          <Image src={pic} alt="" width={500} height={700} className='overflow-hidden'/>
        </div>
      </div>
    </div>
  )
}
