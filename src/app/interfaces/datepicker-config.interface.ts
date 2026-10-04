import { WeekDays } from '../../libs/common/types/week-days.type';

import { IFsDatePickerPreset } from './datepicker-preset.interface';


export interface IFsDatePickerConfig {
  weekStartsOn?: WeekDays

  /**
   * Show the preset list (Today, Last 7 days, This month, ...) to the left of
   * the calendar. Applies to the date, date time and calendar pickers.
   */
  preset?: boolean

  /**
   * Presets of the host's own, merged into the built-in list of the range
   * pickers: one with a built-in's key replaces it, and the merged list is
   * sorted by the span each one covers, the shortest first. A non-empty list
   * shows the preset list whatever `preset` says.
   */
  presets?: IFsDatePickerPreset[]
}
