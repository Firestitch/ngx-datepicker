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

/**
 * Ordered date formats tried (first valid parse wins) before falling back to
 * the engine's own `Date.parse()`. They are the shapes the pickers themselves
 * write into the input (see formatDateTime), so text the component rendered
 * always parses back to the same date on every engine. `Date.parse()` is not
 * portable for these: JavaScriptCore (Safari, every iOS browser) rejects
 * `October 2026`, and both engines read a bare `2026` as UTC midnight, which
 * is the previous day anywhere west of UTC.
 *
 * Formats without a year or a day are seeded from today, the same way the
 * time formats are. Order matters: month + day is tried before month + year
 * so `November 1` reads as a day, not as the year 1.
 */
const DATE_FORMATS = [
  'MMM d, yyyy h:mm aa', // Nov 1, 2026 3:30 PM (datetime view)
  'MMM d, yyyy', // Nov 1, 2026 (date view)
  'MMMM d', // November 1 (scroll picker: month + day)
  'MMMM yyyy', // November 2026 (scroll picker: month + year)
  'MMMM', // November (scroll picker: month only)
  'yyyy', // 2026 (scroll picker: year only)
];

export function parseDate(value: string, view?: PickerViewType): Date | null {
  // A typed value with no date component is seeded onto today's local date,
  // mirroring how the popup seeds a time onto the current day.
  const referenceDate = new Date();

  if (view === PickerViewType.Time || view === PickerViewType.DateTime) {
    for (const format of TIME_FORMATS) {
      const parsedTime = parse(value, format, referenceDate);

      if (isValid(parsedTime)) {
        return parsedTime;
      }
    }
  }

  if (view !== PickerViewType.Time) {
    for (const format of DATE_FORMATS) {
      const parsedDate = parse(value, format, referenceDate);

      if (isValid(parsedDate)) {
        return parsedDate;
      }
    }
  }

  const parsedDate = new Date(Date.parse(value));

  if (isValid(parsedDate)) {
    return parsedDate;
  }

  return null;
}
