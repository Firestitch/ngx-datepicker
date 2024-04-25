import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns';

import { isDateInRange } from './is-date-in-range';


export function isMonthDisabled(date: Date, dates: [Date, Date][]): boolean {
  const startMonth = startOfMonth(date);
  const endMonth = endOfMonth(date);

  dates = (dates || [])
    .map((date) => (
      [
        startOfDay(date[0]),
        endOfDay(date[1]),
      ]
    ));

  return isDateInRange(dates, startMonth, endMonth);
}
