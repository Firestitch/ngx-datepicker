import { isAfter } from 'date-fns';

import { PickerViewType } from '@libs/common/enums/picker-view-type.enum';

import { cloneDate } from './clone-date';
import { isSameDate } from './is-same-date';


export function isDateAfter(target, from, view: PickerViewType): boolean {
  let startDate, endDate;

  if (view === PickerViewType.Time) {
    if (from) {
      startDate = cloneDate(from);
    }

    if (target) {
      endDate = cloneDate(target);
    }
  } else {
    startDate = from;
    endDate = target;
  }

  if (!startDate || !endDate) {
    return true;
  }

  if (view === PickerViewType.Date && isSameDate(startDate, endDate)) {
    return true;
  }

  return isAfter(endDate, startDate);
}
