import { WeekDays } from '../../libs/common/types/week-days.type';


export interface IFsDatePickerConfig {
  weekStartsOn?: WeekDays

  /**
   * Show the preset list (Today, Last 7 days, This month, ...) to the left of
   * the calendar. Applies to the date, date time and calendar pickers.
   */
  preset?: boolean
}
