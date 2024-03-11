import { useGlobalStore } from '@/utilities/store'
import classnames from 'classnames'
import Image from 'next/image';
import React, { useState } from 'react'
import { X } from 'react-bootstrap-icons'
import Skeleton from 'react-loading-skeleton';

export default function ModalPhoto() {

  const [pic, setPic] = useGlobalStore(x => [x.picturePopup, x.setPicturePopup]);
  const [enlarge, setEnlarge] = useState(false);
  const [load, setLoad] = useState(false);

  const closeModal = () => {
    setPic("");
    setEnlarge(false);
    setLoad(false);
  }

  return (
    <div className={classnames('absolute w-screen h-screen bg-black/70 z-4 top-0 left-0 flex justify-center items-center overflow-y-scroll', {
      'hidden': pic === ""
    })} onClick={closeModal}>
      <div className='bg-[#1e1f21] min-w-[400px] rounded-md shadow-inner mt-3 mb-3 border-white border-[2px]' onClick={(e) => { e.stopPropagation() }}>
        <div className='border-b-2 border-b-gray-800 h-12 text-4xl flex justify-end items-center pl-2 pr-2'>
          <X className='cursor-pointer' onClick={closeModal} />
        </div>
        <div className='overflow-scroll scrollbar-default rounded-bl-md rounded-br-md w-[800px] max-h-[80vh]'>
          <div className={classnames({
            'hidden': !load
          })}>
            <Image src={pic} alt="" width={0} height={0} sizes='100vw'
              onLoad={() => setLoad(true)}
              className={classnames('w-full h-auto', {
                'origin-top-left scale-150': enlarge
              })}
              onClick={() => setEnlarge(!enlarge)} />
            <p></p>
          </div>
          <div className={classnames('', {
            'hidden': load
          })}>
            <Skeleton height={"60vh"}/>
          </div>
        </div>
      </div>
    </div>
  )
}
