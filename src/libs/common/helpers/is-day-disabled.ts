import { endOfDay, startOfDay } from 'date-fns';

import { isDateInRange } from './is-date-in-range';

export function isDayInRange(dates: Date[][], date) {
  const startDay = startOfDay(date);
  const endDay = endOfDay(date);

  dates = (dates || [])
    .map((item) => (
      [
        startOfDay(item[0]),
        endOfDay(item[1]),
      ]
    ));

  return isDateInRange(dates, startDay, endDay);
}
