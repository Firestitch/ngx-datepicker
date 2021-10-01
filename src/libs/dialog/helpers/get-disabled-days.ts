import { addYears, subYears } from 'date-fns';


export function getDisabledDays(minDate: Date, maxDate: Date, minYear: number, maxYear: number): [Date, Date][] {
  const result = [];

  if (minDate) {
    const from = subYears(new Date(), minYear);
    const to = new Date(minDate);

    result.push([from, to]);
  }

  if (maxDate) {
    result.push([new Date(maxDate), addYears(new Date(), maxYear)]);
  }

  return result;
}
