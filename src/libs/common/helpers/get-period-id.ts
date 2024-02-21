import {
  addYears,
  differenceInCalendarWeeks,
  differenceInCalendarYears,
  differenceInYears,
  isBefore,
  isSameWeek,
} from 'date-fns';
import { WeekDays } from '../../common/types/week-days.type';
import { WeekDay } from '../enums/week-day.enum';

/**
 * Calculate period ID based on week date start and seed date
 */
export function getPeriodId(
  dateStart: Date,
  seedDate: Date,
  periodWeeks: number,
  weekStartsOn: WeekDays,
) {
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
      { weekStartsOn }
    );

    if (sameWeek) {
      // fixed now only for seedDate 1 Jan
      // seedDate.setFullYear(seedDate.getFullYear() + (diffInYears || -1));
      seedDate.setFullYear(seedDate.getFullYear() + diffInYears);
    } else {
      seedDate.setFullYear(seedDate.getFullYear() + (diffInCalendarYears || -1));
    }

    const weeksDiff = differenceInCalendarWeeks(
      dateStart,
      seedDate,
      { weekStartsOn}
    ) / periodWeeks;

    // Sometimes weeksDiff can be integer and we use +0.1 for easy round
    return Math.abs(Math.ceil(weeksDiff + 0.1));
  } else {

    // Copy date objects
    dateStart = new Date(
      Date.UTC(dateStart.getFullYear(),
        dateStart.getMonth(),
        dateStart.getDate(),
      ),
    );
    seedDate = new Date(
      Date.UTC(
        seedDate.getFullYear(),
        seedDate.getMonth(),
        seedDate.getDate(),
      ),
    );

    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    dateStart.setUTCDate(dateStart.getUTCDate() + 4 - (dateStart.getUTCDay() || 7));

    const diffInYears = differenceInCalendarYears(dateStart, seedDate);
    seedDate.setUTCFullYear(seedDate.getUTCFullYear() + diffInYears);

    if (dateStart.getTime() < seedDate.getTime()) {
      seedDate.setUTCFullYear(seedDate.getUTCFullYear() - diffInYears);
    }

    // Calculate full weeks to nearest Thursday
    let weekNumber = Math.ceil(( ( (dateStart.getTime() - seedDate.getTime()) / 86400000) + 1) / 7);

    // Only for case when week starts on Sunday
    if (weekStartsOn === WeekDay.Sunday) {
      weekNumber += 1;
    }

    return Math.ceil(weekNumber / periodWeeks);
  }
}
