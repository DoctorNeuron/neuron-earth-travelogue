import { ICurrency } from "@/utilities/store"

export interface FoodReviewData {
  
  /** dd-mmm-yy of my visit */
  [key: string]: {

    /** ID of the vendor. Match it with mdx please */
    [key: string] : FoodReviewVendor
  }
}

export interface FoodReviewOrder {
  name: string,
  price: number,
  taste: number,
  worthiness: number,
  notes?: string
}

export interface FoodReviewVendor {
  name: string,
  hygiene: number,
  notes?: string,
  orders: FoodReviewOrder[],
  tax?: number,
  service?: number
  currency?: ICurrency
}