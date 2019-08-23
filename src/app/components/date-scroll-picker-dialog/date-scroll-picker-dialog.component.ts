import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FsDatePickerBaseDialogComponent } from '../../classes/base-dialog-component';
import { FsDatePickerModel } from '../../services/model.service';
import { FsDateDialogRef } from '../../classes/date-dialog-ref';
import { DIALOG_DATA } from '../../services/dialog-data';
import { MONTHS } from '../../consts/months';
import { getDaysInMonth } from 'date-fns';


@Component({
  templateUrl: './date-scroll-picker-dialog.component.html',
  styleUrls: ['./date-scroll-picker-dialog.component.scss'],
  providers: [FsDatePickerModel]
})
export class FsDateScrollPickerDialogComponent extends FsDatePickerBaseDialogComponent {

  public years: number[] = [];
  public months: any[] = [];
  public days: number[] = [];

  public month;
  public day;
  public year;

  constructor(
    @Inject(DIALOG_DATA) private _dialogData,
    public element: ElementRef,
    protected _dialogRef: FsDateDialogRef
  ) {
    super(_dialogRef, _dialogData.parentComponent);

    const modelValue: Date = _dialogData.modelValue;

    this._generateYearsArray();
    this._generateMonthArray();
    this._generateDaysArray();

    if (modelValue) {
      this.day = modelValue.getDate();
      this.year = modelValue.getFullYear();
      this.month = this._getMonth(modelValue.getMonth());
    }
  }

  private _getMonth(month) {
    return this.months.find(item => {
      return month === item.value;
    });
  }

  public change() {

    if (!this.year) {
      this.year = this.years[0];
    }

    if (!this.month) {
      this.month = this.months[0];
    }

    if (!this.day) {
      this.day = this.days[0];
    }

    const daysInMonth = getDaysInMonth(new Date(this.year, this.month.value));

    if (this.day > daysInMonth) {
      this.day = daysInMonth;
    }

    const date = new Date(this.year, this.month.value, this.day);

    this.parentComponent.updateValue(date);
  }

  public changeMonth() {
    this._generateDaysArray();
    this.change();
  }

  public changeYear() {
    this._generateDaysArray();
    this.change();
  }

  private _generateDaysArray() {

    let days = 0;
    if (this.month) {
      days = getDaysInMonth(new Date(this.year, this.month.value));
    }

    if (!days) {
      days = 31;
    }

    this.days = Array.from(Array(days).keys()).map((d: number) => d + 1);
  }

  private _generateMonthArray() {
    this.months = MONTHS;
  }

  private _generateYearsArray() {
    const minYear = this._dialogData.minYear;
    let maxYear = this._dialogData.maxYear;

     for ( maxYear; maxYear >= minYear; maxYear-- ) {
       this.years.push(maxYear);
     }
  }
}
