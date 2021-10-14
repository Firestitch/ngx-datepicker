import { RangePickerRef } from '../../../app/classes/range-picker-ref';

import { PickerViewType } from '../../common/enums/picker-view-type.enum';
import { ScrollPickerViewType } from '../../common/enums/scroll-picker-view-type.enum';
import { IPeriod } from '../../common/interfaces/period.interface';

import { IFsDatePickerDialogComponents } from './dialog-components.interface';


export interface IDialogFactoryOptions {
  modelValue?:  Date | null | IPeriod;
  view?:        PickerViewType | ScrollPickerViewType;
  minutes?:     boolean;
  minYear?:     number;
  maxYear?:     number;
  minDate?:     Date;
  maxDate?:     Date;
  startOfDay?:  boolean;
  components?:  IFsDatePickerDialogComponents;
  periodWeeks?: number;
  seedDate?: Date;
  pickerRef?: RangePickerRef;
  rangeType?: 'from' | 'to';

  //
  showMonth?: boolean;
  showDay?: boolean;
  showYear?: boolean;
}
