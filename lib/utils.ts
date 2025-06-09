import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTypeColor(type: string): string {
  switch (type) {
    case "pokemon":
      return "bg-[#ef5350]/20 text-[#ef5350] border border-[#ef5350]/30";
    case "species":
      return "bg-[#3761a8]/20 text-[#3761a8] border border-[#3761a8]/30";
    case "type":
      return "bg-[#feca1b]/20 text-[#feca1b] border border-[#feca1b]/30";
    case "ability":
      return "bg-purple-100 text-purple-800 border border-purple-200";
    case "move":
      return "bg-green-100 text-green-800 border border-green-200";
    case "item":
      return "bg-orange-100 text-orange-800 border border-orange-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
