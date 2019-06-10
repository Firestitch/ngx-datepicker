import { format } from 'date-fns';

export function formatSummary(date, view = 'date') {
  if (view === 'date') {
    return format(date, 'MMM d, yyyy');
  }

  if (view === 'time') {
    return format(date, 'h:mm aaaa');
  }
}
