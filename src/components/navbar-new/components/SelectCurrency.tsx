import { CurrencyOptions } from '@/components/blog/constant';
import { ICurrency, useGlobalStore } from '@/utilities/store';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent } from 'react'

export default function SelectCurrency() {

  const router = useRouter();
  const [currency, setCurrency] = useGlobalStore(x => [x.currency, x.setCurrency]);

  const onChangeCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    if (CurrencyOptions.includes(e.target.value as ICurrency)) {
      setCurrency(e.target.value as ICurrency);
      // setCookie('currency', e.target.value);
      // router.refresh();
    }
  }

  return (
    <div className='flex flex-col'>
      <label htmlFor="currency" className='text-sm font-light'>Select Currency</label>
      <select className='bg-gray-500 rounded-sm p-1 outline-none' id='currency' onChange={onChangeCurrency} value={currency}>
        {CurrencyOptions.map(x => (<option value={x} key={x}>{x.toUpperCase()}</option>))}
      </select>
    </div>
  )
}
