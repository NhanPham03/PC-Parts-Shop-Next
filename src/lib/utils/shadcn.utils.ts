import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function shadcn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
