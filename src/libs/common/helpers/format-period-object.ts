import { format, isDate } from 'date-fns';

import { IDatePickerPeriod } from '../../common/interfaces/period.interface';

export function formatPeriodObject(period: IDatePickerPeriod): string {
  if (period && isDate(period.from) && isDate(period.to)) {
    if (period.from.getFullYear() == period.to.getFullYear()) {
      const from = format(period.from, 'MMM d');
      const to = format(period.to, 'MMM d yyyy');
      return `#${period.period}: ${from} - ${to}`;
    } else {
      const from = format(period.from, 'MMM d yyyy');
      const to = format(period.to, 'MMM d yyyy');
      return `#${period.period}: ${from} - ${to}`;
    }
  } else {
    return '';
  }
}
