import parseMessyDate from 'parse-messy-time';
import { isValid } from 'date-fns';

export function parseDate(value: string): Date | null {
  let parsedDate = new Date(Date.parse(value));

  if (isValid(parsedDate)) {
    return parsedDate;
  }

  parsedDate = parseMessyDate(value);

  if (isValid(parsedDate)) {
    return parsedDate;
  }

  return null;
}
