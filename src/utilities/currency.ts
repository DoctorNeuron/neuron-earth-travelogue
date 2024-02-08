import { ICurrency, useGlobalStore } from "./store";

export async function transformCurrency(value: number, from: ICurrency, to: ICurrency): Promise<string> {
  if (to === "-" || from === to) return value + " " + from.toUpperCase();
  const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`;

  const rate: number = (await (await fetch(url)).json())[to];

  return (value * rate).toFixed(3) + " " + to.toUpperCase();
}