import { addDays, addYears, subDays, subYears } from 'date-fns';


export function getDisabledDates(
  minDate: Date,
  maxDate: Date,
  minYear: number,
  maxYear: number,
): [Date, Date][] {
  const result = [];

  if (minDate) {
    const from = subYears(new Date(), minYear);
    const to = subDays(minDate, 1);

    result.push([from, to]);
  }

  if (maxDate) {
    result.push([addDays(maxDate, 1), addYears(new Date(), maxYear)]);
  }

  return result;
}
