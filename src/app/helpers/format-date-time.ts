import { isNumber } from 'lodash-es';
import { format, isValid } from 'date-fns';

import { PickerViewType } from '@libs/common/enums/picker-view-type.enum';
import { ScrollPickerViewType } from '@libs/common/enums/scroll-picker-view-type.enum';


export function formatDateTime(
  value,
  dateFormat: PickerViewType | ScrollPickerViewType = PickerViewType.Date,
  customDateFormat = ''
) {

  if (isNumber(value)) {
    value = new Date(value);
  } else if (typeof value === 'string') {
    value = new Date(value);
    if (!isValid(value)) {
      value = Date.parse(value);
    }
  }

  if (value && isValid(value)) {

    const formats = [];

    if (customDateFormat) {
      formats.push(customDateFormat);
    } else {

      if (([
        PickerViewType.Date,
        PickerViewType.MonthRange,
        PickerViewType.DateTime,
      ] as unknown[]).indexOf(dateFormat) != -1) {
        formats.push('MMM d, yyyy');
      }

      if (([PickerViewType.Time, PickerViewType.DateTime] as unknown[]).indexOf(dateFormat) != -1) {
        formats.push('h:mm aa');
      }

      if (dateFormat === ScrollPickerViewType.MonthDay) {
        formats.push('MMMM d');

      } else if (dateFormat === ScrollPickerViewType.MonthYear) {
        formats.push('MMMM yyyy');

      } else if (dateFormat === ScrollPickerViewType.Year) {
        formats.push('yyyy');

      } else if (dateFormat === ScrollPickerViewType.Month) {
        formats.push('MMMM');
      }
    }

    return format(value, formats.join(' '));
  }

  return '';
}
