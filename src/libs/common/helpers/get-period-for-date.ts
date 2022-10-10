import { addSeconds, addWeeks, startOfDay } from 'date-fns';

import { IDatePickerPeriod } from '../interfaces/period.interface';
import { getPeriodId } from '../../common/helpers/get-period-id';
import { getWeeksDiffForPeriod } from '../../common/helpers/get-weeks-diff-for-period';


/**
 * Calculate period based on week date start and seed date
 */
export function getPeriodForDate(dateStart: Date, seedDate: Date, periodWeeks: number): IDatePickerPeriod {
  const diffInWeeks = getWeeksDiffForPeriod(dateStart, seedDate, periodWeeks) - 1;
  const pDateStart = startOfDay(addWeeks(seedDate, diffInWeeks));
  const pId = getPeriodId(pDateStart, seedDate, periodWeeks);
  const pDateEnd = addSeconds(addWeeks(pDateStart, periodWeeks), -1);

  return {
    from: pDateStart,
    to: pDateEnd,
    period: pId,
  }
}
