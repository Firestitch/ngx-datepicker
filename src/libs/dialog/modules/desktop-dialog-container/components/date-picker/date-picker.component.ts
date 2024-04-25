import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';

import { ThemePalette } from '@angular/material/core';

import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { FsDatePickerCalendarComponent } from '../../../../../../libs/calendar/components';
import { FsDatePickerDialogModel } from '../../../../../dialog/classes/dialog-model';
import { FsDatePickerDialogRef } from '../../../../classes/dialog-ref';


@Component({
  selector: 'fs-datepicker-desktop-datepicker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDesktopDatePickerComponent implements AfterViewInit, OnDestroy {

  @ViewChild(FsDatePickerCalendarComponent, { read: ElementRef })
  public datePickerCalendar: ElementRef;

  @Input()
  public dialogRef: FsDatePickerDialogRef;

  @Input()
  public datePickerModel: FsDatePickerDialogModel;

  public timePickerExpanded = false;

  private _destroy$ = new Subject();
  private _wheelDelta = 0;

  public get doneBtnClass(): ThemePalette {
    if (this.datePickerModel.isPickerRangeFrom) {
      return undefined;
    }

    return 'primary';
  }

  public viewModeChanged(mode: string) {
    this.datePickerModel.setCalendarMode(mode);
  }

  public monthChanged(month: number) {
    this.datePickerModel.setCalendarMonth(month);
  }

  public yearChanged(year: number) {
    this.datePickerModel.setCalendarYear(year);
  }

  public nextMonth(): void {
    this.datePickerModel.nextMonth();
  }

  public prevMonth(): void {
    this.datePickerModel.prevMonth();
  }

  public nextCalendar(): void {
    this.datePickerModel.rangePickerRef.activateToPicker();

    this.close();
  }

  public prevCalendar(): void {
    this.datePickerModel.rangePickerRef.activateFromPicker();

    this.close();
  }

  public dateChanged(date): void {
    this.datePickerModel.model = date;

    if (!this.datePickerModel.isDateTimeView && !this.datePickerModel.isTimeView) {
      this.close();
    }
  }

  public periodChanged(date): void {
    this.datePickerModel.period = date;

    this.close();
  }

  public toggleTimeExpand() {
    this.timePickerExpanded = !this.timePickerExpanded;
  }

  public setDateMode(mode) {
    this.datePickerModel.dateMode = mode;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public ngAfterViewInit(): void {
    if(this.datePickerCalendar) {
      fromEvent(this.datePickerCalendar.nativeElement, 'wheel')
      .pipe(
        tap((event: any) => {
          event.preventDefault();
          event.stopPropagation(); 
        }),
        filter((event: any) => {
          this._wheelDelta += Math.abs(event.wheelDeltaY);
          return this._wheelDelta > 13;
        }), 
        takeUntil(this._destroy$),
      )
      .subscribe((event) => {
        this._wheelDelta = 0;
        if(event.deltaY > 0) {
          this.nextMonth();
        } else {
          this.prevMonth();
        }
      });
    }
  }
}
