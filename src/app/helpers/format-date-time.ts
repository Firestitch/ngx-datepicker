import { isNumber } from 'lodash-es';
import { format, isValid } from 'date-fns';
import { DateFormat } from '../enums/date-format.enum';


export function formatDateTime(value, dateFormat = DateFormat.Date, customDateFormat = '') {

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

      if ([DateFormat.Date, DateFormat.DateTime].indexOf(dateFormat) != -1) {
        formats.push('MMM d, yyyy');
      }

      if ([DateFormat.Time, DateFormat.DateTime].indexOf(dateFormat) != -1) {
        formats.push('h:mm aa');
      }

      if (dateFormat === DateFormat.MonthDay) {
        formats.push('MMMM d');

      } else if (dateFormat === DateFormat.MonthYear) {
        formats.push('MMMM yyyy');

      } else if (dateFormat === DateFormat.Year) {
        formats.push('yyyy');

      } else if (dateFormat === DateFormat.Month) {
        formats.push('MMMM');
      }
    }

    return format(value, formats.join(' '));
  }

  return '';
}
