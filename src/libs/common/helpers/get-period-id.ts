import {
  addWeeks,
  addYears, differenceInCalendarWeeks,
  differenceInCalendarYears,
  differenceInYears,
  isBefore,
  isSameWeek
} from 'date-fns';

/**
 * Calculate period ID based on week date start and seed date
 */
export function getPeriodId(dateStart: Date, seedDate: Date, periodWeeks: number) {
  /**
   * If week date start before seed date
   */
  if (isBefore(dateStart, seedDate)) {
    const diffInYears = differenceInYears(dateStart, seedDate);
    const diffInCalendarYears = differenceInCalendarYears(dateStart, seedDate);

    seedDate = new Date(seedDate);

    /**
     * Check if week date start includes seed date
     */
    const sameWeek = isSameWeek(
      dateStart,
      addYears(seedDate, diffInYears),
      { weekStartsOn: <any>seedDate.getDay()}
    );

    if (sameWeek) {
      seedDate.setFullYear(seedDate.getFullYear() + (diffInYears || -1));
    } else {
      seedDate.setFullYear(seedDate.getFullYear() + (diffInCalendarYears || -1));
    }

    const weeksDiff = differenceInCalendarWeeks(
      dateStart,
      seedDate,
      { weekStartsOn: <any>seedDate.getDay()}
    ) / periodWeeks;

    // Sometimes weeksDiff can be integer and we use +0.1 for easy round
    return Math.abs(Math.ceil(weeksDiff + 0.1));
  } else {
    const diffInYears = differenceInYears(addWeeks(dateStart, 1), seedDate);

    seedDate = new Date(seedDate);
    seedDate.setFullYear(seedDate.getFullYear() + diffInYears);

    const weeksDiff = differenceInCalendarWeeks(
      dateStart,
      seedDate,
      { weekStartsOn: <any>seedDate.getDay()}
    ) / periodWeeks;

    // Sometimes weeksDiff can be integer and we use +0.1 for easy round
    return Math.abs(Math.ceil(weeksDiff + 0.1));
  }
}
