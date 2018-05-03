import { FsDatePickRangeDirective } from './../directives';
import { Provider, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const DATEPICKER_RANGE_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FsDatePickRangeDirective),
  multi: true
};
