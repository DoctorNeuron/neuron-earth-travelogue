import { TransportationMode } from '@/model/transportation'
import { getCurrencyRate, transformMoney } from '@/utilities/currency'
import { useGlobalStore } from '@/utilities/store'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

export interface TransportationProps {
  id: string,
  data: TransportationMode
}

function TransportationPoint({ name, order, length }: { name: string, order: number, length: number }) {
  return (
    <div className='relative min-w-[7rem] max-w-[7rem] grid grid-rows-[1fr_2fr_1fr]'>

      {/* Content Even */}
      <div className='text-xs relative text-center font-bold'>{order % 2 === 0 && name}</div>

      {/* Point and Line */}
      <div className='flex justify-center pt-2 pb-2 items-center h-[40px]'>
        {/* Point */}
        <div className={classNames('bg-amber-300 border-white border-solid border-2 rounded-full relative',
          order === 0 || order === length - 1 ? 'w-[12px] h-[12px]' : 'w-[10px] h-[10px]'
        )}>
          {/* Line */}
          {
            order !== length - 1 &&
            <div className='absolute w-28 border-[1px] border-white border-solid z-1 top-1/2 left-2'></div>
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

  const [money, setMoney] = useState<{ [key: string]: number }>({});
  const currency = useGlobalStore(x => x.currency);
  
  useEffect(() => {
    getCurrencyRate(props.data.currency ?? "idr").then(o => setMoney(o));
  }, [props.data.currency]);

  return (
    <div className='w-full'>
      <div className={classNames('p-3 w-full rounded-lg flex flex-col border-spacing-5 border-2 border-slate-100', {
        'bg-gray-800': props.data.type === 'bus',
        'bg-green-900': props.data.type === 'mrt',
        'bg-orange-900': props.data.type === 'train-commuter'
      })}>
        <div className='flex justify-between'>
          <h1 className='font-bold'>{
            props.data.type === 'bus' ? "Bus" :
              props.data.type === 'lrt' ? "LRT" :
                props.data.type === 'mrt' ? "MRT" :
                  props.data.type === 'train-commuter' ? "Commuter Line" :
                    props.data.type === 'train' ? 'train' : ""
          }</h1>
          <h2 className='font-bold text-green-300'>{transformMoney(money, props.data.price, currency)}</h2>
        </div>

        {props.data.routes.map(r =>
          <div className='flex overflow-x-auto scrollbar-default pt-3 [&:not(:last-child)]:border-b-white/30 [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:py-2' key={r.name}>
            {r.route.map((x, idx, arr) => (<TransportationPoint name={x} key={idx} order={idx} length={arr.length} />))}
          </div>
        )}
      </div>
    </div>
  )
}
