import { differenceInCalendarWeeks, isBefore } from 'date-fns';


/**
 * Calculate difference in weeks based on seedDate and periodWeeks
 */
export function getWeeksDiffForPeriod(dateStart, seedDate, periodWeeks) {
  /**
   * If week date start before seed date
   */
  if (isBefore(dateStart, seedDate)) {
    const weeksDiff = differenceInCalendarWeeks(
      dateStart,
      seedDate,
      { weekStartsOn: seedDate.getDay()}
    ) / periodWeeks;

    // Sometimes weeksDiff can be integer and we use +0.1 for easy round
    return Math.ceil(weeksDiff + 0.1);
  } else {
    const weeksDiff = differenceInCalendarWeeks(
      dateStart,
      seedDate,
      { weekStartsOn: seedDate.getDay()}
    ) / periodWeeks;

    // Sometimes weeksDiff can be integer and we use +0.1 for easy round
    return Math.ceil(weeksDiff + 0.1);
  }
}
