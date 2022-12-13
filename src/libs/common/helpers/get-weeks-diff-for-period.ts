import { differenceInCalendarWeeks, isBefore } from 'date-fns';
import { WeekDays } from '../../common/types/week-days.type';


/**
 * Calculate difference in weeks based on seedDate and periodWeeks
 */
export function getWeeksDiffForPeriod(dateStart, seedDate, periodWeeks, weekStartsOn: WeekDays = 1) {
  /**
   * If week date start before seed date
   */
  if (isBefore(dateStart, seedDate)) {
    const weeksDiff = differenceInCalendarWeeks(
      dateStart,
      seedDate,
      { weekStartsOn}
    ) / periodWeeks;

    // Sometimes weeksDiff can be integer and we use +0.1 for easy round
    return Math.ceil(weeksDiff + 0.1);
  } else {
    const weeksDiff = differenceInCalendarWeeks(
      dateStart,
      seedDate,
      { weekStartsOn}
    ) / periodWeeks;

    // Sometimes weeksDiff can be integer and we use +0.1 for easy round
    return Math.ceil(weeksDiff + 0.1);
  }
}
