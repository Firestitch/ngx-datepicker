import { isNumeric } from '@firestitch/common';
import { format, isValid } from 'date-fns';
import { DateFormat } from '../enums/date-format.enum';


export function formatDateTime(value, dateFormat = DateFormat.Date) {

  if (isNumeric(value)) {
    value = new Date(value);
  } else if (typeof value === 'string') {
    value = new Date(value);
    if (!isValid(value)) {
      value = Date.parse(value);
    }
  }

  if (value && isValid(value)) {

    let fmt = '';

    if ([DateFormat.Date, DateFormat.DateTime].indexOf(dateFormat) != -1) {
      fmt = 'MMM d, yyyy';

    } else if ([DateFormat.Time, DateFormat.DateTime].indexOf(dateFormat) != -1) {
      fmt = 'h:mm aaaa';

    } else if (dateFormat === DateFormat.MonthDay) {
      fmt = 'MMMM d';

    } else if (dateFormat === DateFormat.MonthYear) {
      fmt = 'MMMM yyyy';

    } else if (dateFormat === DateFormat.Year) {
      fmt = 'yyyy';

    } else if (dateFormat === DateFormat.Month) {
      fmt = 'MMMM';
    }

    return format(value, fmt);
  }

  return '';
}
