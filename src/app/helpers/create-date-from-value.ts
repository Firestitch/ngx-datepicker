import { isDate, isValid } from 'date-fns';

export function createDateFromValue(value) {
  if (value && !isDate(value)) {
    value = new Date(value);

    if (!isValid(value)) {
      value = null;
    }
  }

  return value;
}
