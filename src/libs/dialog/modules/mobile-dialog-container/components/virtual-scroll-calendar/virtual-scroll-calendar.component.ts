import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { FsDatePickerDialogModel } from '@libs/dialog/classes/dialog-model';

import { FsDatePickerDialogRef } from '../../../../classes/dialog-ref';
import { addMonths } from 'date-fns';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FsCalendarDataSource } from '@libs/dialog/modules/mobile-dialog-container/classes/calendar-data-source';


@Component({
  templateUrl: './virtual-scroll-calendar.component.html',
  styleUrls: ['./virtual-scroll-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDatePickerVirtualScrollCalendarComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  public virtualScroll: CdkVirtualScrollViewport

  public timePickerExpanded = false;
  public selectedDateTimeTab = 0;

  public ds = new FsCalendarDataSource();
  public items = Array
    .from({length: 100})
    .map((_, i) => {
      const monthNumber = i + -50;

      return addMonths(new Date(), monthNumber);
    });

  private _dialogRef: FsDatePickerDialogRef;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private _data: any,
    private _cd: ChangeDetectorRef,
    private _bottomSheetRef: MatBottomSheetRef<any>,
  ) {
    this._dialogRef = this._data.dateDialogRef;
    console.log(this.virtualScroll, this);
    // this.virtualScroll.scrollToIndex();
    console.log(this.items);
  }

  public get datePickerModel(): FsDatePickerDialogModel {
    return this._dialogRef.pickerModel;
  }

  public get dialogRef(): FsDatePickerDialogRef {
    return this._dialogRef;
  }

  public ngOnInit() {}

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.virtualScroll.scrollToIndex(50);
    });
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

    // this.close();
  }
  //
  // public periodChanged(date): void {
  //   this.datePickerModel.period = date;
  //
  //   // this.close();
  // }

  public toggleTimeExpand() {
    this.timePickerExpanded = !this.timePickerExpanded;
  }

  public selectedDateTimeTabChange(index) {
    this.selectedDateTimeTab = index;
  }

  // public setDateMode(mode) {
  //   this.datePickerModel.dateMode = mode;
  // }
}
