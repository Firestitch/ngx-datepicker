import { isObject } from 'lodash-es';
import { formatDateTime } from './format-date-time';

export function formatDateTimeRange(value, view = 'date') {
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
