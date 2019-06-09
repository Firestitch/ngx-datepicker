import { isNumeric } from '@firestitch/common';
import { format, isValid } from 'date-fns';


export function formatDateTime(value, view = 'date') {
  let result = '';
  const convertTo = [];

  if (isNumeric(value)) {
    value = new Date(value);
  } else if (typeof value === 'string') {
    value = new Date(value);
    if (!isValid(value)) {
      value = Date.parse(value);
    }
  }

  if (value && isValid(value)) {

    if (['date', 'datetime'].indexOf(view) != -1) {
      convertTo.push('MMM d, yyyy');
    }

    if (['time', 'datetime'].indexOf(view) != -1) {
      convertTo.push('h:mm aaaa');
    }

    result = format(value, convertTo.join(' '));
  }

  return result;
}
