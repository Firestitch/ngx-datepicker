import { isSameDay, isValid } from 'date-fns';

import { WeekDay } from '../../../common/enums/week-day.enum';
import { getPresetRange } from '../../../common/helpers/get-preset-range';
import { IDatePresetItem } from '../../../common/interfaces/date-preset.interface';
import { WeekDays } from '../../../common/types/week-days.type';

import { getDatePresets } from './get-date-presets';


/**
 * Names the range, if one of the presets happens to describe it.
 *
 * Matching is by day rather than by timestamp, so a range that has been through
 * a picker's own start/end of day rounding still recognises itself.
 *
 * The first match wins, because presets do coincide — "Last quarter" and "Last
 * 3 months" are the same three months whenever today falls in the first month of
 * a quarter, and on Jan 1 half the list is the single day it is. Both names are
 * right when that happens, so the list order picks one.
 */
export function matchDatePreset(
  from: Date,
  to: Date,
  options: {
    weekStartsOn?: WeekDays;
    now?: Date;
  } = {},
): IDatePresetItem | null {
  if (!from || !to || !isValid(from) || !isValid(to)) {
    return null;
  }

  const weekStartsOn = options.weekStartsOn ?? WeekDay.Sunday;
  const now = options.now ?? new Date();

  const match = getDatePresets(weekStartsOn)
    .find((item: IDatePresetItem) => {
      const range = getPresetRange(item.preset, weekStartsOn, now);

      return range && isSameDay(from, range.from) && isSameDay(to, range.to);
    });

  return match ?? null;
}
