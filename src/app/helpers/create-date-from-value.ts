import { isDate, isValid } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';


export function createDateFromValue(value, timezone: string) {
  if (value && !isDate(value)) {
    value = new Date(value);

    if (!isValid(value)) {
      value = null;
    }
  } if (value && isDate(value) && !isValid(value)) {
    value = null;
  }

  if (value && timezone) {
    return toZonedTime(value, timezone);
  }

  return value;
}
