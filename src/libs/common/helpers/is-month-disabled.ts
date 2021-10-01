import { endOfMonth, startOfMonth } from 'date-fns';

import { isRangeDisabled } from './is-range-disabled';


export function isMonthDisabled(date: Date, disabledDays: [Date, Date][]): boolean {
  const startMonth = startOfMonth(date);
  const endMonth = endOfMonth(date);

  return isRangeDisabled(disabledDays, startMonth, endMonth);
}
