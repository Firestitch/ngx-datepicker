import { isValid } from 'date-fns';
import { getStartDayDate } from './get-start-day-date';


export function getSafeDate(date) {
  return date && isValid(date) ? date : getStartDayDate();
}
