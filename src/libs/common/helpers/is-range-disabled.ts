import { endOfDay, isSameDay, isWithinInterval, startOfDay } from 'date-fns';

export function isRangeDisabled(disabledDays, start, end) {
  if (!disabledDays || !disabledDays.length) {
    return false;
  }

  for (let i = 0; i < disabledDays.length; i++) {
    const value = disabledDays[i];

    const startDay = startOfDay(value[0]);
    const endDay = endOfDay(value[1]);

    const startDayIntersectWithDisabled =
      isWithinInterval(start, { start: startDay, end: endDay }) && !isSameDay(start, value[0]);

    const endDayIntersectWithDisabled =
      isWithinInterval(end, { start: startDay, end: endDay }) && !isSameDay(end, value[1]);

    if(startDayIntersectWithDisabled && endDayIntersectWithDisabled) {
      return true;
    }
  }

  return false;
}
