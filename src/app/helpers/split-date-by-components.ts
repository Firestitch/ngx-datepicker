import { isDate, isValid, lightFormat } from 'date-fns';


export function splitDateByComponents(date: Date) {
  if (date && isValid(date) && isDate(date)) {
    return {
      date: lightFormat(date, 'yyyy-MM-dd'),
      hour: date.getHours(),
      minute: date.getMinutes(),
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    };
  } else {
    return {
      date: null,
      hour: null,
      minute: null,
      year: null,
      month: null,
      day: null,
    };
  }
}
