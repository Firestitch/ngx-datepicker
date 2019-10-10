import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FsDatePickerBaseDialogComponent } from '../../classes/base-dialog-component';
import { FsDatePickerModel } from '../../services/model.service';
import { FsDateDialogRef } from '../../classes/date-dialog-ref';
import { DIALOG_DATA } from '../../services/dialog-data';
import { MONTHS } from '../../consts/months';
import { getDaysInMonth } from 'date-fns';


@Component({
  templateUrl: './date-scroll-picker-dialog.component.html',
  styleUrls: ['./date-scroll-picker-dialog.component.scss'],
  providers: [FsDatePickerModel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateScrollPickerDialogComponent extends FsDatePickerBaseDialogComponent {

  public years: number[] = [];
  public months: any[] = [];
  public days: number[] = [];

  public month;
  public day;
  public year;

  public showMonth;
  public showDay;
  public showYear;

  constructor(
    @Inject(DIALOG_DATA) private _dialogData,
    public element: ElementRef,
    protected _dialogRef: FsDateDialogRef
  ) {
    super(_dialogRef, _dialogData.parentComponent);

    const modelValue: Date = _dialogData.modelValue;

    this.showMonth = _dialogData.showMonth;
    this.showDay = _dialogData.showDay;
    this.showYear = _dialogData.showYear;

    this._generateYearsArray();
    this._generateMonthArray();
    this._generateDaysArray();

    if (modelValue) {
      this._setDate(modelValue);
    } else {

      const date = new Date();

      if (!this.showDay) {
        date.setDate(1);
      }

      if (!this.showMonth) {
        date.setMonth(1);
      }

      if (!this.showYear) {
        date.setFullYear(0);
      }

      this._setDate(date);
    }
  }

  private _setDate(date: Date) {
    if (date) {
      this.day = date.getDate();
      this.year = date.getFullYear();
      this.month = this._getMonth(date.getMonth());
    }
  }

  private _getMonth(month) {
    return this.months.find(item => {
      return month === item.value;
    });
  }

  public change(save = false) {

    if (!this.year) {
      this.year = this.showYear ? this.years[0] : 0;
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

    if (save) {
      const date = new Date(this.year, this.month.value, this.day);

      this.parentComponent.updateValue(date);
    }
  }

  public close(save = false) {
    if (save) {
      this.change(true);
    }

    super.close();
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

    if (!maxYear) {
      const today = new Date();
      maxYear = today.getFullYear();
    }

     for ( maxYear; maxYear >= minYear; maxYear-- ) {
       this.years.push(maxYear);
     }
  }
}
