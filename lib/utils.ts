import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export function formatIWSDate(date?: string | number, time?: string | number): string {
  if (!date) return "-";
  
  const dateStr = String(date).trim();
  const timeStr = time ? String(time).trim() : "";

  if (dateStr.length !== 8) return dateStr; // Not YYYYMMDD

  if (!timeStr || timeStr.length !== 6) {
    const parsedDate = dayjs(dateStr, 'YYYYMMDD', true);
    return parsedDate.isValid() ? parsedDate.format('DD/MM/YYYY') : dateStr;
  }

  const parsedDateTime = dayjs(`${dateStr} ${timeStr}`, 'YYYYMMDD HHmmss', true);
  return parsedDateTime.isValid() ? parsedDateTime.format('DD/MM/YYYY HH:mm:ss') : `${dateStr} ${timeStr}`;
}
