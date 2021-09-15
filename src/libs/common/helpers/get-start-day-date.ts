import { startOfDay } from 'date-fns';


export function getStartDayDate() {
  return startOfDay(new Date());
}
