'use client'

import { FoodReviewOrder, FoodReviewVendor } from '@/model/food-review';
import { getCurrencyRate, transformMoney } from '@/utilities/currency';
import { useGlobalStore } from '@/utilities/store';
import React, { useEffect, useState } from 'react';

export interface FoodReviewProps {
  id: string,
  order: FoodReviewVendor
}

export default function FoodReview(props: FoodReviewProps) {

  const [money, setMoney] = useState<{ [key: string]: number }>({});
  const currency = useGlobalStore(x => x.currency);

  useEffect(() => {
    getCurrencyRate(props.order.currency ?? "idr").then(o => setMoney(o));
  }, [props.order.currency])

  const sum = props.order.orders.reduce<number>((acc, val) => acc + val.price, 0);
  const tax = props.order.tax ? Math.round(sum * props.order.tax / 100) : 0;
  const total = sum + tax;

  const renderOrders = (order: FoodReviewOrder) => {
    const pr = transformMoney(money, order.price, currency);
    return (
      <span className='flex flex-col border-b-2 pt-2 pb-2' key={order.name}>
        <span className='flex justify-between text-lg gap-4'>
          <span className='font-bold'>{order.name}</span>
          <span className='font-bold text-green-300 text-right'>{pr}</span>
        </span>
        <span className='italic text-xs'>{order.notes}</span>
        <span className='flex justify-between gap-5 max-md:grid-cols-1 max-md:grid-rows-2 max-md:gap-3'>
          <span>Taste ✨: <span className='max-sm:hidden'>{'⭐'.repeat(order.taste)} =</span> {order.taste}/10</span>
          <span className='min-lg:text-right'>Worthiness 🛒: <span className='max-sm:hidden'>{'⭐'.repeat(order.worthiness)} =</span> {order.worthiness}/10</span>
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
          <p className='max-sm:hidden'>{'⭐'.repeat(props.order.hygiene ?? 7)}</p>
          <p> = {props.order.hygiene ?? 7}/10</p>
        </span>
        <span className='grid grid-cols-[3fr_5fr_5fr_5fr] max-md:flex'>
          <p>Service 😀:</p>
          <p className='max-sm:hidden'>{'⭐'.repeat(props.order.service ?? 7)}</p>
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
            <span className='text-green-300'>{transformMoney(money, sum, currency)}</span>
          </span>
          <span className='flex justify-between'>
            <span>Tax({props.order.tax})</span>
            <span className='text-green-300'>{transformMoney(money, tax, currency)}</span>
          </span>
          <hr />
        </>
      }
      <span className='flex justify-between text-xl font-bold'>
        <span>Total</span>
        <span className='text-green-300'>{transformMoney(money, total, currency)}</span>
      </span>

    </div>
  )
}
