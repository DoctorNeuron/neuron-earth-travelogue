import { ICurrency, useGlobalStore } from '@/utilities/store';
import React, { ChangeEvent } from 'react'

const CurrencyOptions: ICurrency[] = [
  "-",
  "idr",
  "sgd",
  "usd"
];

export default function SelectCurrency() {

  const [currency, setCurrency] = useGlobalStore(x => [x.currency, x.setCurrency]);

  const onChangeCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    if (CurrencyOptions.includes(e.target.value as ICurrency)) setCurrency(e.target.value as ICurrency)
  }

  return (
    <select className='bg-gray-500 rounded-sm p-1' onChange={onChangeCurrency}>
      {CurrencyOptions.map(x => (<option value={x} key={x}>{x.toUpperCase()}</option>))}
    </select>
  )
}
