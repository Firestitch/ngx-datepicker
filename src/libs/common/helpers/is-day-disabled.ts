import { endOfDay, startOfDay } from 'date-fns';

import { isRangeDisabled } from './is-range-disabled';

export function isDayDisabled(disabledDays, date) {
  const startDay = startOfDay(date);
  const endDay = endOfDay(date);

  return isRangeDisabled(disabledDays, startDay, endDay);
}
