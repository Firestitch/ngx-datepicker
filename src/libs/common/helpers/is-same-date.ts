import { lightFormat } from 'date-fns';

export function isSameDate(startDate, endDate) {
  return lightFormat(startDate, 'yyyy-MM-dd') === lightFormat(endDate, 'yyyy-MM-dd');
}
