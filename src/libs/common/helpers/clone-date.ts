import { isDate } from 'date-fns';

export function cloneDate(fromDate: Date): Date | null {
  if (!isDate(fromDate)) {
    return null;
  }

  return new Date(fromDate.getTime());
}
