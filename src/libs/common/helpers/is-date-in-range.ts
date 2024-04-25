import { isEqual, isWithinInterval } from 'date-fns';

export function isDateInRange(dates: Date[][], start: Date, end: Date) {
  if (!dates || !dates.length) {
    return false;
  }

  for (let i = 0; i < dates.length; i++) {
    const startDate = dates[i][0];
    const endDate = dates[i][1];

    if(
      (
        (
          isWithinInterval(start, { start: startDate, end: endDate }) || isEqual(start, startDate)
        ) && (
          isWithinInterval(end, { start: startDate, end: endDate }) || isEqual(end, endDate)
        )
      )
    ) {
      return true;
    }
  }

  return false;
}
