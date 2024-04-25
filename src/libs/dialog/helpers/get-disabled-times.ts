import { isSameDay } from 'date-fns';
import { PickerViewType } from '../../common/enums';


export function getDisabledTimes(model: Date | null, minDate: Date, view: PickerViewType): [Date, Date][] {
  const arr = [];
  if (
    (view === PickerViewType.Time && minDate) ||
    (view === PickerViewType.DateTime && minDate && model && isSameDay(minDate, model))
  ) {
    const from = (minDate.getMinutes()) + ((minDate.getHours()) * 60);
    arr.push([0, from]);
  }

  return arr;
}
