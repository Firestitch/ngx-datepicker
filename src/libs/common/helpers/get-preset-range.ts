import {
  endOfDay,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subQuarters,
  subWeeks,
  subYears,
} from 'date-fns';

import { DatePreset } from '../enums/date-preset.enum';
import { WeekDay } from '../enums/week-day.enum';
import { IDatePresetRange } from '../interfaces/date-preset.interface';
import { WeekDays } from '../types/week-days.type';


/**
 * Resolves a preset to the date range it stands for.
 *
 * The "last ..." presets all run to the end of the last complete period, never
 * into the one under way — with today being Aug 17, "Last 28 days" is Jul 20 -
 * Aug 16, "Last 3 months" is May 1 - Jul 31 and "Last quarter" is Apr 1 -
 * Jun 30. The "this ..." presets run to today instead, which is what their
 * labels say.
 *
 * Returns null for anything unrecognised, which callers treat as "leave the
 * range alone".
 */
export function getPresetRange(
  preset: DatePreset,
  weekStartsOn: WeekDays = WeekDay.Sunday,
  now: Date = new Date(),
): IDatePresetRange | null {
  const yesterday = subDays(now, 1);
  const lastDays = (days: number): IDatePresetRange => {
    return { from: startOfDay(subDays(now, days)), to: endOfDay(yesterday) };
  };
  const lastMonths = (months: number): IDatePresetRange => {
    return {
      from: startOfMonth(subMonths(now, months)),
      to: endOfMonth(subMonths(now, 1)),
    };
  };

  switch (preset) {
    case DatePreset.Today:
      return { from: startOfDay(now), to: endOfDay(now) };

    case DatePreset.Yesterday:
      return { from: startOfDay(yesterday), to: endOfDay(yesterday) };

    case DatePreset.ThisWeek:
      return { from: startOfWeek(now, { weekStartsOn }), to: endOfDay(now) };

    case DatePreset.Last7Days:
      return lastDays(7);

    case DatePreset.LastWeek: {
      const lastWeek = subWeeks(now, 1);

      return {
        from: startOfWeek(lastWeek, { weekStartsOn }),
        to: endOfWeek(lastWeek, { weekStartsOn }),
      };
    }

    case DatePreset.Last28Days:
      return lastDays(28);

    case DatePreset.Last30Days:
      return lastDays(30);

    case DatePreset.ThisMonth:
      return { from: startOfMonth(now), to: endOfDay(now) };

    case DatePreset.LastMonth: {
      const lastMonth = subMonths(now, 1);

      return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
    }

    case DatePreset.Last90Days:
      return lastDays(90);

    case DatePreset.Last3Months:
      return lastMonths(3);

    case DatePreset.QuarterToDate:
      return { from: startOfQuarter(now), to: endOfDay(now) };

    case DatePreset.LastQuarter: {
      const lastQuarter = subQuarters(now, 1);

      return { from: startOfQuarter(lastQuarter), to: endOfQuarter(lastQuarter) };
    }

    case DatePreset.Last6Months:
      return lastMonths(6);

    case DatePreset.Last12Months:
      return lastMonths(12);

    case DatePreset.ThisYear:
      return { from: startOfYear(now), to: endOfDay(now) };

    case DatePreset.LastCalendarYear: {
      const lastYear = subYears(now, 1);

      return { from: startOfYear(lastYear), to: endOfYear(lastYear) };
    }

    default:
      return null;
  }
}
