import {
  differenceInCalendarYears,
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
  // Copy date objects to UTC to avoid timezone issues
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

  // If dateStart is still before seedDate after year adjustment, go back one more year
  if (dateStart.getTime() < seedDate.getTime()) {
    seedDate.setUTCFullYear(seedDate.getUTCFullYear() - 1);
  }

  // Calculate full weeks to nearest Thursday
  let weekNumber = Math.ceil((((dateStart.getTime() - seedDate.getTime()) / 86400000) + 1) / 7);

  // Only for case when week starts on Sunday
  if (weekStartsOn === WeekDay.Sunday) {
    weekNumber += 1;
  }

  return Math.ceil(weekNumber / periodWeeks);
}
