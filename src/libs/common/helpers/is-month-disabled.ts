import { endOfMonth, startOfMonth } from 'date-fns';

import { isDateInRange } from './is-date-in-range';


export function isMonthDisabled(date: Date, disabledDays: [Date, Date][]): boolean {
  const startMonth = startOfMonth(date);
  const endMonth = endOfMonth(date);

  return isDateInRange(disabledDays, startMonth, endMonth);
}
