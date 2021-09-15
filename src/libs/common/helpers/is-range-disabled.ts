import { endOfDay, isWithinInterval, lightFormat, startOfDay } from 'date-fns';

export function isRangeDisabled(disabledDays, start, end) {
  if (!disabledDays) {
    return false;
  }

  for (let i = 0; i < disabledDays.length; i++) {
    const value = disabledDays[i];

    const startDay = startOfDay(value[0]);
    const endDay = endOfDay(value[1]);

    const startDayIntersectWithDisabled =
      isWithinInterval(start, { start: startDay, end: endDay })
      || lightFormat(start, 'yyyy-MM-dd') === lightFormat(value[0], 'yyyy-MM-dd');

    const endDayIntersectWithDisabled =
      isWithinInterval(end, { start: startDay, end: endDay })
      || lightFormat(end, 'yyyy-MM-dd') === lightFormat(value[1], 'yyyy-MM-dd');

    if (startDayIntersectWithDisabled && endDayIntersectWithDisabled) {
      return true;
    }
  }

  return false;
}
