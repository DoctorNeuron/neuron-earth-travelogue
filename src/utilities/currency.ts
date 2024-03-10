import { ICurrency } from "./store";

export async function transformCurrency(value: number, from: ICurrency, to: ICurrency): Promise<string> {
  if (to === "-" || from === to) return value + " " + from.toUpperCase();
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;
  
  const rate: number = (await (await fetch(url)).json())[from][to];
  return (value * rate).toFixed(3) + " " + to.toUpperCase();
}