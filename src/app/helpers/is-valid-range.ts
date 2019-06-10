import { isValid } from 'date-fns';

export function isValidRange(startDate, endDate): boolean {
  return startDate && endDate && isValid(startDate) && isValid(endDate);
}
