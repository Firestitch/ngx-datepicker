import { format as fsFormat } from '@firestitch/date';

import { format, isValid } from 'date-fns';
import { isNumber } from 'lodash-es';

import { PickerViewType } from '../../libs/common/enums/picker-view-type.enum';
import { ScrollPickerViewType } from '../../libs/common/enums/scroll-picker-view-type.enum';


export function formatDateTime(
  value,
  dateFormat: PickerViewType | ScrollPickerViewType = PickerViewType.Date,
  customDateFormat = '',
  timezone?: string,
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
      return fsFormat(value, customDateFormat, { timezone });
    } 

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

    switch (dateFormat) {
      case ScrollPickerViewType.MonthDay: {
        formats.push('MMMM d');

    
        break;
      }
      case ScrollPickerViewType.MonthYear: {
        formats.push('MMMM yyyy');

    
        break;
      }
      case ScrollPickerViewType.Year: {
        formats.push('yyyy');

    
        break;
      }
      case ScrollPickerViewType.Month: {
        formats.push('MMMM');
    
        break;
      }
    // No default
    }
    

    return format(value, formats.join(' '));
  }

  return '';
}
