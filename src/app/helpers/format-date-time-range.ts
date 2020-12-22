import { isObject } from 'lodash-es';
import { DateFormat } from 'package/app/enums/date-format.enum';
import { formatDateTime } from './format-date-time';

export function formatDateTimeRange(value, view = DateFormat.Date) {
  if (!isObject(value)) {
    return '';
  }

  const parts = [];
  const startDate = formatDateTime(value.start, view);
  const endDate = formatDateTime(value.end, view);

  if (startDate) {
    parts.push(startDate);
  }

  if (endDate) {
    parts.push(endDate);
  }

  return parts.join(' to ');
}
