import { FoodReviewOrder, FoodReviewVendor } from '@/model/food-review'
import { transformCurrency } from '@/utilities/currency';
import { ICurrency } from '@/utilities/store';
import { cookies } from 'next/headers';
import React from 'react'

export interface FoodReviewProps {
  id: string,
  order: FoodReviewVendor
}

export default async function FoodReview(props: FoodReviewProps) {

  const cookieCurrency = (cookies().get('currency')?.value ?? "-") as ICurrency;
  const sum = props.order.orders.reduce<number>((acc, val) => acc + val.price, 0);
  const tax = props.order.tax ? Math.round(sum * props.order.tax / 100) : 0;
  const total = sum + tax;
  const sumText = await transformCurrency(sum, "idr", cookieCurrency);
  const taxText = await transformCurrency(tax, "idr", cookieCurrency);
  const totalText = await transformCurrency(total, "idr", cookieCurrency);


  // Menu
  const renderOrders = async (order: FoodReviewOrder) => {
    const pr = await transformCurrency(order.price, "idr", cookieCurrency);
    return (
      <span className='flex flex-col border-b-2 pt-2 pb-2'>
        <span className='flex justify-between text-lg gap-4'>
          <span className='font-bold'>{order.name}</span>
          <span className='font-bold text-green-300 text-right'>{pr}</span>
        </span>
        <span className='italic text-xs'>{order.notes}</span>
        <span className='flex justify-between gap-5 max-md:grid-cols-1 max-md:grid-rows-2 max-md:gap-3'>
          <span>Taste ✨: {'⭐'.repeat(order.taste)} = {order.taste}/10</span>
          <span className='min-lg:text-right'>Worthiness 🛒: {'⭐'.repeat(order.worthiness)} = {order.worthiness}/10</span>
        </span>
      </span>
    )
  }

  return (
    <div className='w-full bg-gray-800 min-h-14 rounded-lg border-spacing-5 border-2 border-slate-100 p-5'>
      <h4 className='text-xl text-white font-bold'>{props.order.name}</h4>
      {props.order.notes && <h2 className='italic text-sm font-thin'>Tax: {props.order.notes}</h2>}
      {props.order.tax && <h2 className='italic text-sm font-thin'>Tax: {props.order.tax}</h2>}
      <br />
      <span className='max-md:flex max-md:flex-col max-md:gap-3'>
        <span className='grid grid-cols-[3fr_5fr_5fr_5fr] max-md:flex'>
          <p>Hygiene 🚿:</p>
          <p>{'⭐'.repeat(props.order.hygiene)}</p>
          <p className='max-md:hidden'> = {props.order.hygiene}/10</p>
        </span>
        <span className='grid grid-cols-[3fr_5fr_5fr_5fr] max-md:flex'>
          <p>Service 😀:</p>
          <p>{'⭐'.repeat(props.order.service ?? 7)}</p>
          <p className='max-md:hidden'> = {props.order.service ?? 7}/10</p>
        </span>
      </span>
      <br />
      {props.order.orders.map(x => renderOrders(x))}
      <br />
      {props.order.tax &&
        <>
          <span className='flex justify-between'>
            <span>Subtotal</span>
            <span className='text-green-300'>{sumText}</span>
          </span>
          <span className='flex justify-between'>
            <span>Tax({props.order.tax})</span>
            <span className='text-green-300'>{taxText}</span>
          </span>
          <hr />
        </>
      }
      <span className='flex justify-between text-xl font-bold'>
        <span>Total</span>
        <span className='text-green-300'>{totalText}</span>
      </span>

    </div>
  )
}
