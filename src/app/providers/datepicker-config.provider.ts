import { InjectionToken } from '@angular/core';

import { IFsDatePickerConfig } from '../interfaces/datepicker-config.interface';
import { WeekDay } from '../../libs/common/enums/week-day.enum';


/**
 * The config every picker falls back to. Exported because `forRoot()` merges a
 * partial config over it — a caller that sets one key must not lose the rest.
 * A component that provides FS_DATEPICKER_CONFIG itself spreads it the same way.
 */
export const FS_DATEPICKER_CONFIG_DEFAULT: IFsDatePickerConfig = {
  weekStartsOn: WeekDay.Sunday,
  preset: false,
};

export const FS_DATEPICKER_CONFIG = new InjectionToken<IFsDatePickerConfig>('fs.datepicker-config', {
  providedIn: 'root',
  factory: () => {
    return { ...FS_DATEPICKER_CONFIG_DEFAULT };
  }
});
