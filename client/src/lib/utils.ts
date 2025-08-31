import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCep(value: string): string {
  const numbers = value.replace(/\D/g, "");
  const limited = numbers.slice(0, 8);

  if (limited.length <= 5) {
    return limited;
  }

  return `${limited.slice(0, 5)}-${limited.slice(5)}`;
}

export function formatPhone(value: string): string {
  const numbers = value.replace(/\D/g, "");
  const limited = numbers.slice(0, 11);

  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 6) {
    return `${limited.slice(0, 2)} ${limited.slice(2)}`;
  } else if (limited.length <= 10) {
    return `${limited.slice(0, 2)} ${limited.slice(2, 6)}-${limited.slice(6)}`;
  } else {
    return `${limited.slice(0, 2)} ${limited.slice(2, 7)}-${limited.slice(7)}`;
  }
}

export function unformatCep(value: string): string {
  return value.replace(/\D/g, "");
}

export function unformatPhone(value: string): string {
  return value.replace(/\D/g, "");
}
