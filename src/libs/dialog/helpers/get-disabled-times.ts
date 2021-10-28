import { isSameDay } from 'date-fns';
import { RangePickerRef } from '../../../app/classes/range-picker-ref';


export function getDisabledTimes(model: Date | null, ref: RangePickerRef): [Date, Date][] {
  if (!ref) { return }

  const arr = [];
  if (
    (ref.view === 'time' && ref.startDate) ||
    (ref.view === 'datetime' && ref.startDate && model && isSameDay(ref.startDate, model))
  ) {
    const from = (ref.startDate.getMinutes()) + ((ref.startDate.getHours()) * 60);
    arr.push([0, from]);
  }

  return arr;
}
