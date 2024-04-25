import { RangePickerRef } from '../../../app/classes/range-picker-ref';

import { PickerViewType } from '../../common/enums/picker-view-type.enum';
import { ScrollPickerViewType } from '../../common/enums/scroll-picker-view-type.enum';
import { IDatePickerPeriod } from '../../common/interfaces/period.interface';

import { WeekDays } from '../../../libs/common/types/week-days.type';
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

  //
  showMonth?: boolean;
  showDay?: boolean;
  showYear?: boolean;
}
