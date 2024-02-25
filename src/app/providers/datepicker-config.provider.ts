import { InjectionToken } from '@angular/core';

import { IFsDatePickerConfig } from '../interfaces/datepicker-config.interface';
import { WeekDay } from '../../libs/common/enums/week-day.enum';


export const FS_DATEPICKER_CONFIG = new InjectionToken<IFsDatePickerConfig>('fs.datepicker-config', {
  providedIn: 'root',
  factory: () => {
    return {
      weekStartsOn: WeekDay.Sunday,
    }
  }
});
