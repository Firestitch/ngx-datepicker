import { isAfter, isDate, isValid } from 'date-fns';

import { IFsDatePickerPreset } from '../../../../app/interfaces/datepicker-preset.interface';
import { IDatePresetRange } from '../../../common/interfaces/date-preset.interface';


/**
 * The two dates a preset stands for right now: each of `from` and `to` as
 * given, or what its function gives when called. Null unless both are real
 * dates and `from` is not after `to`, which callers treat as "leave the range
 * alone".
 */
export function getPresetDates(preset: IFsDatePickerPreset): IDatePresetRange | null {
  const from = typeof preset.from === 'function' ? preset.from() : preset.from;
  const to = typeof preset.to === 'function' ? preset.to() : preset.to;

  if (!isDate(from) || !isValid(from) || !isDate(to) || !isValid(to) || isAfter(from, to)) {
    return null;
  }

  return { from, to };
}
