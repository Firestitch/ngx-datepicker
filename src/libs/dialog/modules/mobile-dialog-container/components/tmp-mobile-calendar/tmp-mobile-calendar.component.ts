import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { FsDatePickerDialogModel } from '@libs/dialog/classes/dialog-model';

import { addMonths } from 'date-fns';


@Component({
  selector: 'fs-datepicker-tmp-mobile-calendar',
  templateUrl: './tmp-mobile-calendar.component.html',
  styleUrls: ['./tmp-mobile-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDatePickerTmpMobileCalendarComponent implements AfterViewInit {

  @Input()
  public datePickerModel: FsDatePickerDialogModel;

  @Input()
  public autoClose = true;

  public items = Array
    .from({length: 12})
    .map((_, i) => {
      const monthNumber = i + -6;

      return {
        date: addMonths(new Date(), monthNumber),
        current: monthNumber === 0,
      };
    });

  constructor(
    private _el: ElementRef,
    private _bottomSheetRef: MatBottomSheetRef<any>,
  ) {}

  public ngAfterViewInit(): void {
    this._el.nativeElement.querySelector('.selected').scrollIntoView();
  }

  // public viewModeChanged(mode: string) {
  //   this.datePickerModel.setCalendarMode(mode);
  // }
  //
  // public monthChanged(month: number) {
  //   this.datePickerModel.setCalendarMonth(month);
  // }
  //
  // public yearChanged(year: number) {
  //   this.datePickerModel.setCalendarYear(year);
  // }
  //
  // public nextMonth(): void {
  //   this.datePickerModel.nextMonth();
  // }
  //
  // public prevMonth(): void {
  //   this.datePickerModel.prevMonth();
  // }
  //
  public dateChanged(date): void {
    this.datePickerModel.model = date;

    this.close();
  }
  //
  // public periodChanged(date): void {
  //   this.datePickerModel.period = date;
  //
  //   // this.close();
  // }

  // public setDateMode(mode) {
  //   this.datePickerModel.dateMode = mode;
  // }

  public close(): void {
    if (this.autoClose) {
      this._bottomSheetRef.dismiss();
    }
  }
}
