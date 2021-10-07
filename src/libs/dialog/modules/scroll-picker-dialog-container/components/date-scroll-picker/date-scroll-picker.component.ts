import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { getDaysInMonth, isValid } from 'date-fns';

import { FsDatePickerDialogRef } from '@libs/dialog/classes/dialog-ref';

import { MONTHS } from '../../consts/months';


@Component({
  selector: 'fs-date-scroll-picker',
  templateUrl: './date-scroll-picker.component.html',
  styleUrls: ['./date-scroll-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateScrollPickerComponent implements OnInit, OnDestroy {

  @Input('dialogRef')
  private readonly _dialogRef: FsDatePickerDialogRef;

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
    public element: ElementRef,
    private _cdRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    @Inject(DOCUMENT)
    private _document: Document,
  ) {}

  public ngOnInit(): void {
    const modelValue: Date = this._dialogRef.pickerModel.model;

    this.showMonth = this._dialogRef.options.showMonth;
    this.showDay = this._dialogRef.options.showDay;
    this.showYear = this._dialogRef.options.showYear;

    this._generateYearsArray();
    this._generateMonthArray();
    this._generateDaysArray();

    if (modelValue && isValid(modelValue)) {
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

    this._pullToRefreshDisable();
  }

  public ngOnDestroy(): void {
    this._pullToRefreshDefault();
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
      this._dialogRef.updateValue(date);
    }

    this._cdRef.markForCheck();
  }

  public changeMonth() {
    this._generateDaysArray();
    this.change();
  }

  public changeYear() {
    this._generateDaysArray();
    if (this._dialogRef.options.maxDate) {
      this._generateMonthArray();
    }
    this.change();
  }

  private _generateDaysArray() {

    let days = 0;
    const maxDate = this._dialogRef.options.maxDate;
    const maxDay = maxDate && maxDate.getDate();
    const maxMonth = maxDate && maxDate.getMonth();
    const maxYear = maxDate && maxDate.getFullYear();

    if (this.month) {
      if (maxDay && maxMonth == this.month.value && maxYear === this.year) {
        days = maxDay;
      } else {
        days = getDaysInMonth(new Date(this.year, this.month.value));
      }
    }

    if (!days) {
      days = 31;
    }

    this.days = Array.from(Array(days).keys()).map((d: number) => d + 1);
  }

  private _generateMonthArray() {
    const maxDate = this._dialogRef.options.maxDate;

    if (maxDate && this.year === maxDate.getFullYear()) {
      this.months = MONTHS.slice(0, maxDate.getMonth() + 1);
    } else {
      this.months = MONTHS;
    }
  }

  private _generateYearsArray() {
    let minYear = this._dialogRef.options.minYear;
    let maxYear = this._dialogRef.options.maxYear;

    if (!maxYear) {
      const today = new Date();
      maxYear = today.getFullYear();
    }

     for ( minYear; minYear <= maxYear; minYear++ ) {
       this.years.push(minYear);
     }
  }

  private _pullToRefreshDisable(): void {
    this._renderer.addClass(this._document.body, 'fs-date-picker-prevent-pull-to-refresh');
  }

  private _pullToRefreshDefault(): void {
    this._renderer.removeClass(this._document.body, 'fs-date-picker-prevent-pull-to-refresh');
  }

}
