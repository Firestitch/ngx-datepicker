import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, OnChanges, SimpleChanges,
} from '@angular/core';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { addMonths, isBefore } from 'date-fns';

import { FsDatePickerDialogModel } from '@libs/dialog/classes/dialog-model';

import { RangePickerRef } from '@app/classes/range-picker-ref';


@Component({
  selector: 'fs-datepicker-tmp-mobile-calendar',
  templateUrl: './tmp-mobile-calendar.component.html',
  styleUrls: ['./tmp-mobile-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDatePickerTmpMobileCalendarComponent implements OnChanges, AfterViewInit {

  @Input()
  public datePickerModel: FsDatePickerDialogModel;

  @Input()
  public autoClose = true;

  public modelFrom$: Observable<Date>;
  public modelTo$: Observable<Date>;

  // Temporary solution
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

  public get rangePickerRef(): RangePickerRef | null {
    return this.datePickerModel.rangePickerRef;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.datePickerModel?.currentValue
      && changes.datePickerModel?.firstChange
      && this.datePickerModel.view === 'monthrange') {
      this._initMonthRangeModels();
    }
  }


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

  public dateChanged(date): void {

    if (this.datePickerModel.view !== 'monthrange') {
      this.datePickerModel.model = date;
      this.close();
    } else {
      this.monthRangeChange(date);
    }
  }

  public monthRangeChange(date): void {
    const rangeRef = this.rangePickerRef;
    const { startDate, endDate } = rangeRef;

    if (!startDate && !endDate) {
      rangeRef.updateStartDate(date);
    } else if (startDate && !endDate) {
      if (isBefore(date, startDate)) {
        rangeRef.updateStartDate(date);
        rangeRef.updateEndDate(null);
      } else {
        rangeRef.updateEndDate(date);
      }
    } else if (startDate && endDate) {
      rangeRef.updateStartDate(date);
      rangeRef.updateEndDate(null);
    }
  }

  public close(): void {
    if (this.autoClose) {
      this._bottomSheetRef.dismiss();
    }
  }

  private _initMonthRangeModels(): void {
    this.modelFrom$ = this.datePickerModel
      .rangePickerRef
      .startDate$
      .pipe(
        shareReplay(),
      );

    this.modelTo$ = this.datePickerModel
      .rangePickerRef
      .endDate$
      .pipe(
        shareReplay(),
      );
  }
}
