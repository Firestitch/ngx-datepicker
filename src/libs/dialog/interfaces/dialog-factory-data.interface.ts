import { RangePickerRef } from '../../../app/classes/range-picker-ref';
import { IFsDatePickerPreset } from '../../../app/interfaces/datepicker-preset.interface';
import { WeekDays } from '../../../libs/common/types/week-days.type';
import { PickerViewType } from '../../common/enums/picker-view-type.enum';
import { ScrollPickerViewType } from '../../common/enums/scroll-picker-view-type.enum';
import { IDatePickerPeriod } from '../../common/interfaces/period.interface';

import { IFsDatePickerDialogComponents } from './dialog-components.interface';


export interface IDialogFactoryOptions {
  modelValue?:  Date | null | IDatePickerPeriod;
  view?:        PickerViewType | ScrollPickerViewType;
  minutes?:     boolean;
  minYear?:     number;
  maxYear?:     number;
  minDate?:     Date;
  maxDate?:     Date;
  rangeStart?:  Date;
  startOfDay?:  boolean;
  components?:  IFsDatePickerDialogComponents;
  periodWeeks?: number;
  seedDate?: Date;
  pickerRef?: RangePickerRef;
  rangeType?: 'from' | 'to';
  weekStartsOn?: WeekDays
  showNow?:     boolean;
  preset?:      boolean;
  presets?:     IFsDatePickerPreset[];
  /**
   * Elements a click may land on without closing the calendar, such as the
   * other end of a range field, which then handles the click itself. When set,
   * the desktop calendar has no backdrop, so the page stays hoverable and a
   * click anywhere else closes it.
   */
  ignoreOutsideClicksOn?: HTMLElement[];
  /**
   * Shows a Clear button in the footer, while there is a date, that empties
   * this picker's date and leaves the calendar open for another.
   */
  showClear?:   boolean;

  //
  showMonth?: boolean;
  showDay?: boolean;
  showYear?: boolean;
}
