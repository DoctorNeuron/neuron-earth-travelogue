import React from 'react'

export interface TransportationProps {
  name: string,
  routes: ITransportRoute[]
}

export interface ITransportRoute {
  name: string,
  color?: string,
  route: string[]
}

function TransportationPoint({ name, order, length }: { name: string, order: number, length: number }){
  return (
    <div className='relative min-w-[7rem] max-w-[7rem] grid grid-rows-[1fr_2fr_1fr]'>

      {/* Content Even */}
      <div className='text-xs relative text-center font-bold'>{order % 2 === 0 && name}</div>

      {/* Point and Line */}
      <div className='flex justify-center pt-3 pb-3 items-center'>
        {/* Point */}
        <div className='point w-[10px] h-[10px] bg-amber-300 border-white border-solid border-2 rounded-full relative'>
          {/* Line */}
          {
            order !== length - 1 &&
              <div className='absolute w-28 border-[1px] border-white border-solid z-1 top-0.5 left-2'></div>
          }
        </div>
      </div>

      {/* Content Odd */}
      <div className='text-xs relative text-center font-bold'>
        {order % 2 !== 0 && name}
      </div>
    </div>
  )
}

export default function Transportation(props: TransportationProps) {
  return (
    <div className='w-full'>
      <div className='bg-sky-600 p-3 w-full rounded-lg flex flex-col'>
        <div className='flex justify-between'>
          <h1 className='font-bold'>Bus</h1>
          <h2 className='font-bold text-green-300'>3500 IDR</h2>
        </div>
        <div className='flex overflow-x-scroll pt-3'>
          {props.routes[0].route.map((x, idx, arr) => (<TransportationPoint name={x} key={idx} order={idx} length={arr.length} />)) }
        </div>
      </div>
    </div>
  )
}
