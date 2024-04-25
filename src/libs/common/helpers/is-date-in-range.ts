import { endOfDay, isEqual, isWithinInterval, startOfDay } from 'date-fns';

export function isDateInRange(dates: Date[][], start: Date, end: Date) {
  if (!dates || !dates.length) {
    return false;
  }

  for (let i = 0; i < dates.length; i++) {
    const value = dates[i];

    const startDay = startOfDay(value[0]);
    const endDay = endOfDay(value[1]);

    const startDayIntersectWithDisabled =
      isWithinInterval(start, { start: startDay, end: endDay }) && !isEqual(start, value[0]);

    const endDayIntersectWithDisabled =
      isWithinInterval(end, { start: startDay, end: endDay }) && !isEqual(end, value[1]);

    if(startDayIntersectWithDisabled && endDayIntersectWithDisabled) {
      return true;
    }
  }

  return false;
}
