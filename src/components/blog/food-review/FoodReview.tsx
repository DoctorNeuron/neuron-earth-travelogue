import { FoodReviewOrder, FoodReviewVendor } from '@/model/food-review'
import React from 'react'

export interface FoodReviewProps {
  id: string,
  order: FoodReviewVendor
}

export default function FoodReview(props: FoodReviewProps) {

  const sumOrders = props.order.orders.reduce<number>((acc, val) => acc + val.price, 0)
  const taxOrders = props.order.tax ? Math.round(sumOrders * props.order.tax / 100) : 0;

  const renderOrders = (order: FoodReviewOrder) => (
    <span className='flex flex-col border-b-2 pt-2 pb-2'>
      <span className='flex justify-between text-lg'>
        <span className='font-bold'>{order.name}</span>
        <span className='font-bold text-green-300'>{order.price} IDR</span>
      </span>
      <span className='italic text-xs'>{order.notes}</span>
      <span className='grid grid-cols-2'>
        <span>Taste ✨: {'⭐'.repeat(order.taste)} = {order.taste}/10</span>
        <span className='text-right'>Worthiness 🛒: {'⭐'.repeat(order.worthiness)} = {order.worthiness}/10</span>
      </span>
    </span>
  )
  
  return (
    <div className='w-full bg-gray-800 min-h-14 rounded-lg border-spacing-5 border-2 border-slate-100 p-5'>
      <h4 className='text-xl text-white font-bold'>{props.order.name}</h4>
      { props.order.notes && <h2 className='italic text-sm font-thin'>Tax: {props.order.notes}</h2> }
      { props.order.tax && <h2 className='italic text-sm font-thin'>Tax: {props.order.tax}</h2> }
      <br />
      <span>
        <span className='grid grid-cols-[3fr_5fr_5fr_5fr]'>
          <p>Hygiene 🚿:</p>
          <p>{'⭐'.repeat(props.order.hygiene)}</p>
          <p> = {props.order.hygiene}/10</p>
        </span>
        <span className='grid grid-cols-[3fr_5fr_5fr_5fr]'>
          <p>Service 😀:</p>
          <p>{'⭐'.repeat(props.order.service ?? 7)}</p>
          <p> = {props.order.service ?? 7}/10</p>
        </span>
      </span>
      <br />
      {props.order.orders.map(x => renderOrders(x))}
      <br />
      {props.order.tax &&
        <>
          <span className='flex justify-between'>
            <span>Subtotal</span>
            <span className='text-green-300'>{sumOrders} IDR</span>
          </span>
          <span className='flex justify-between'>
            <span>Tax({props.order.tax})</span>
            <span className='text-green-300'>{taxOrders} IDR</span>
          </span>
          <hr />
        </>
      }
      <span className='flex justify-between text-xl font-bold'>
        <span>Total</span>
        <span className='text-green-300'>{sumOrders + taxOrders} IDR</span>
      </span>

    </div>
  )
}
