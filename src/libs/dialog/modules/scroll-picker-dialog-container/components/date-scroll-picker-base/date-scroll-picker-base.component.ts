import {
  Component,
  ViewChild
} from '@angular/core';

import { FsDateScrollPickerDialogComponent } from '../date-scroll-picker';


@Component({ template: '' })
export class FsDateScrollPickerBaseComponent {
  
  public disabledSubmit = false;

  @ViewChild('scrollPickerRef')
  public scrollPickerRef: FsDateScrollPickerDialogComponent;

  protected _date: Date | null;

  public change(date: Date | null) {
    this._date = date;

    if (this.scrollPickerRef?.maxDate && date > this.scrollPickerRef?.maxDate) {
      this.disabledSubmit = true;
    } else if (this.scrollPickerRef?.minDate && date < this.scrollPickerRef?.minDate) {
      this.disabledSubmit = true;
    } else {
      this.disabledSubmit = false;
    }
  }
}
