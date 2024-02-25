import { addYears, subYears } from 'date-fns';

import { PickerViewType } from '../../common/enums/picker-view-type.enum';


export function getDisabledDays(
  minDate: Date,
  maxDate: Date,
  minYear: number,
  maxYear: number,
  view: PickerViewType
): [Date, Date][] {
  const result = [];

  if (minDate) {
    const from = subYears(new Date(), minYear);
    const to = view === PickerViewType.DateTime
      ? new Date(minDate).setDate(minDate.getDate() - 1)
      : new Date(minDate);

    result.push([from, to]);
  }

  if (maxDate) {
    result.push([new Date(maxDate), addYears(new Date(), maxYear)]);
  }

  return result;
}
