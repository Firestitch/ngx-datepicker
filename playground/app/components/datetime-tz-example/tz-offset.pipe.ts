import { Pipe, PipeTransform } from '@angular/core';

import { getTimezoneOffset } from 'date-fns-tz'


@Pipe({
    name: 'tzOffset',
    standalone: true,
})
export class TzOffsetPipe implements PipeTransform {
  public transform(value: string, date: Date): string {
    if (value && date) {

      const offset = getTimezoneOffset(value, date) / 1000 / 60 / 60;

      if (offset === 0) {
        return '00:00';
      }

      const sign = offset > 0 && '+' || '-';

      if (offset % 1 === 0) {
        return `${sign}${offset}:00`
      }

      const hours = Math.abs(offset - offset % 1);
      const leadingZero = hours < 10 && '0' || '';
      console.log(hours, leadingZero);

      return `${sign}${leadingZero}${hours}:${60 * offset % 1}`;
    } else {
      return '';
    }
  }
}
