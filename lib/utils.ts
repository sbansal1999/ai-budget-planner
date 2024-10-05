import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_URLS = {
  CREATE_EXPENSE_URL: "https://modest-wilson-heuristic.lemme.cloud/api/b96282fd-9e51-4852-b972-14c8583b760b",
  GET_ANALYSIS_URL: "https://modest-wilson-heuristic.lemme.cloud/api/03b40446-148b-4217-96b1-4cc816385816",
  GET_EXPENSES_URL: "https://modest-wilson-heuristic.lemme.cloud/api/3c6bf486-1824-4d5e-adce-5ef20147e0d4"
}

export function getIndianCurrencyFormat(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}
