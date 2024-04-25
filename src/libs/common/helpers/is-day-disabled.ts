import { endOfDay, startOfDay } from 'date-fns';

import { isDateInRange } from './is-date-in-range';

export function isDayInRange(dates: Date[][], date) {
  const startDay = startOfDay(date);
  const endDay = endOfDay(date);

  return isDateInRange(dates, startDay, endDay);
}
