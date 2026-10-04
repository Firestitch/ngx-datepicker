import { differenceInCalendarDays } from 'date-fns';

import { IFsDatePickerPreset } from '../../../../app/interfaces/datepicker-preset.interface';
import { WeekDay } from '../../../common/enums/week-day.enum';
import { getPresetRange } from '../../../common/helpers/get-preset-range';
import { IDatePresetItem, IDatePresetRange } from '../../../common/interfaces/date-preset.interface';
import { WeekDays } from '../../../common/types/week-days.type';

import { getDatePresets } from './get-date-presets';
import { getPresetDates } from './get-preset-dates';


/**
 * The presets a range picker lists: the built-in ones (getDatePresets), with a
 * host's own `presets` merged in by key, so one with a built-in's key replaces
 * it.
 *
 * With no presets of the host's own, the built-in list keeps its own order.
 * A merged list is sorted by the span each preset covers at `now`: the fewest
 * days first and, for the same number of days, the one that ends later first
 * (Today before Yesterday). Presets that tie keep the list's order. A preset
 * that gives no usable dates goes last; picking it changes nothing.
 */
export function getPresetList(
  presets: IFsDatePickerPreset[] | null | undefined,
  weekStartsOn: WeekDays = WeekDay.Sunday,
  now: Date = new Date(),
): IFsDatePickerPreset[] {
  const builtIn = getDatePresets(weekStartsOn)
    .map((item: IDatePresetItem) => builtInPreset(item, weekStartsOn, now));

  if (!presets?.length) {
    return builtIn;
  }

  const merged = new Map(builtIn.map((preset: IFsDatePickerPreset) => [preset.key, preset]));
  presets.forEach((preset: IFsDatePickerPreset) => merged.set(preset.key, preset));

  return [...merged.values()]
    .map((preset: IFsDatePickerPreset) => ({ preset, range: getPresetDates(preset) }))
    .sort((a, b) => compareSpans(a.range, b.range))
    .map(({ preset }) => preset);
}

// A built-in preset in the shape of a host's own: its dates are the ones
// getPresetRange gives at `now`.
function builtInPreset(item: IDatePresetItem, weekStartsOn: WeekDays, now: Date): IFsDatePickerPreset {
  return {
    key: item.preset,
    name: item.name,
    from: () => getPresetRange(item.preset, weekStartsOn, now).from,
    to: () => getPresetRange(item.preset, weekStartsOn, now).to,
  };
}

// Fewer days first, then the later end first; no dates at all last.
function compareSpans(a: IDatePresetRange | null, b: IDatePresetRange | null): number {
  if (!a || !b) {
    return (a ? 0 : 1) - (b ? 0 : 1);
  }

  const days = differenceInCalendarDays(a.to, a.from) - differenceInCalendarDays(b.to, b.from);

  return days || b.to.getTime() - a.to.getTime();
}
