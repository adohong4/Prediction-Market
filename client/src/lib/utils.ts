import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


//format number to fixed decimals
export function toFixed(value: number, decimals: number) {
  return value.toFixed(decimals);
}