import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';

import { find } from '@firestitch/common';

import { format, getDate, getMonth, getYear, getDaysInMonth, isDate, isValid, setMonth } from 'date-fns';

import { isNumber } from 'lodash-es';

import { FsDatePickerBaseDialogComponent } from '../../classes/base-dialog-component';
import { FsDatePickerModel } from '../../services/model.service';
import { FsDateDialogRef } from '../../classes/date-dialog-ref';
import { DIALOG_DATA } from '../../services/dialog-data';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'fs-date-picker-birthday',
  templateUrl: './birthday-dialog.component.html',
  styleUrls: ['./birthday-dialog.component.scss'],
  providers: [FsDatePickerModel]
})
export class FsDatePickerBirthdayDialogComponent extends FsDatePickerBaseDialogComponent implements OnInit, OnDestroy {

  public years: number[] = [];
  public months: { name: string, number: number }[] = [];
  public days: number[] = [];

  public selectedDate = { day: null, month: null, year: null };
  private _destroy$ = new Subject();

  constructor(
    @Inject(DIALOG_DATA) public dialogData,
    public element: ElementRef,
    private _dialogRef: FsDateDialogRef
  ) {
    super();
  }

  public ngOnInit() {
    this.parentDirective = this.dialogData.parentDirective;

    this.generateYearsArray();
    this.generateMonthArray();
    this.generateDaysArray();

    this.setSelectedDate();

    this._dialogRef.overlayRef
      .backdropClick()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.close();
      });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public changedDate(event: MatSelectChange) {
    this.updateDate();
  }

  public changedMonth(event: MatSelectChange) {
    const monthLength = this.daysInMonth(event.value.number);
    this.generateDaysArray(monthLength);

    if (monthLength < this.selectedDate.day) {
      this.selectedDate.day = null;
    }
    this.updateDate();
  }

  public changedYear() {
    const monthLength = this.selectedDate.month ? this.daysInMonth(this.selectedDate.month.number) : 31;
    this.generateDaysArray(monthLength);

    if (this.selectedDate.day > monthLength) {
      this.selectedDate.day = null;
    }
    this.updateDate();
  }

  public close() {
    this._dialogRef.close();
  }

  @HostListener('document:keydown', ['$event'])
  public handleEscapeClose(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.close();
    }
  }

  private setSelectedDate() {
    const date = this.parentDirective.ngModel;

    if (date && isValid(date) && isDate(date)) {
      this.selectedDate = {
        day: getDate(date),
        month: find(this.months, { number: getMonth(date) }),
        year: getYear(date)
      };
    } else {
      this.selectedDate = { day: null, month: null, year: null };
    }
  }

  private updateDate() {
    const year = this.selectedDate.year;
    const month = this.selectedDate.month && this.selectedDate.month.number;
    const date = this.selectedDate.day;
    // January is === false
    if (year && isNumber(month) && date) {
      const newDate = new Date();
      newDate.setFullYear(year);
      newDate.setMonth(month);
      newDate.setDate(date);

      this.parentDirective.setValue(newDate);
    } else {
      this.parentDirective.setValue(null);
    }
  }

  // helpers

  /**
   * return count days in month
   */
  private daysInMonth(monthTitle: number): number {
    // const year = this.selectedDate.year || new Date().getFullYear();
    return getDaysInMonth(
      new Date(
        this.selectedDate.year || new Date().getFullYear(),
        monthTitle
      )
    );
  }

  /**
   * helper for generation array of days
   * default value is 31
   */
  private generateDaysArray(length = 31) {
    this.days = Array.from(Array(length).keys()).map((d: number) => d + 1);
  }

  /**
   * helper for generation array of month
   * by default format is LLLL - January, February, March ... etc.
   */
  private generateMonthArray(monthFormat = 'LLLL') {

    this.months = Array.from(Array(12).keys())
      .map((m: number) => {
        return {
          number: m,
          name: format(setMonth(new Date(), m), monthFormat),
        };
      });
  }

  /**
   * helper for generation array of years
   */
  private generateYearsArray() {
    const minYear = this.parentDirective.minYear || new Date().getFullYear() - 100;
    let maxYear = this.parentDirective.maxYear || new Date().getFullYear();

     for ( maxYear; maxYear >= minYear; maxYear-- ) {
       this.years.push(maxYear);
     }
  }

}
