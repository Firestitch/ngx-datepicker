import { parse, isValid } from 'date-fns';

import { PickerViewType } from '../../libs/common/enums/picker-view-type.enum';


/**
 * Ordered time formats tried (first valid parse wins) when the picker is in a
 * Time / DateTime view. Order matters: more specific shapes (meridiem, minutes)
 * precede less specific ones so a typed value resolves to its intended reading.
 *
 * Disambiguation: a meridiem is honored when present (`3pm` -> 15:00); a bare
 * number with no meridiem is read as 24-hour (`3` -> 03:00, `15` -> 15:00).
 */
const TIME_FORMATS = [
  'h:mm aa', // 3:30 PM
  'h:mm a', // 3:30 p
  'h:mmaa', // 3:30PM
  'h:mma', // 3:30p
  'HH:mm', // 15:30
  'h:mm', // 3:30 (bare clock)
  'h aa', // 3 PM
  'h a', // 3 p
  'haa', // 3pm
  'H', // 3 (24-hour)
];

export function parseDate(value: string, view?: PickerViewType): Date | null {
  if (view === PickerViewType.Time || view === PickerViewType.DateTime) {
    // Time-only inputs carry no date component, so seed the parse with today's
    // local date — mirroring how the popup seeds a time onto the current day.
    const referenceDate = new Date();

    for (const format of TIME_FORMATS) {
      const parsedTime = parse(value, format, referenceDate);

      if (isValid(parsedTime)) {
        return parsedTime;
      }
    }
  }

  const parsedDate = new Date(Date.parse(value));

  if (isValid(parsedDate)) {
    return parsedDate;
  }

  return null;
}
