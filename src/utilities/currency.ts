import { CURRENCY_DEFAULT } from "@/constant/default";
import { ICurrency } from "./store";

export async function transformCurrency(value: number, from: ICurrency, to: ICurrency): Promise<string> {
  if (to === "-" || from === to) return value + " " + from.toUpperCase();
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;
  
  const rate: number = (await (await fetch(url)).json())[from][to];
  return (value * rate).toFixed(3) + " " + to.toUpperCase();
}

export async function getCurrencyRate(from: ICurrency){
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;
  const rate: {[key: string] : number} = (await (await fetch(url)).json())[from];
  return rate;
}

export function transformMoney(exchange: {[key: string] : number}, value: number, to: ICurrency){
  to = to === '-' ? CURRENCY_DEFAULT : to;
  return (value * exchange[to]).toFixed(2) + " " + to.toUpperCase();
}