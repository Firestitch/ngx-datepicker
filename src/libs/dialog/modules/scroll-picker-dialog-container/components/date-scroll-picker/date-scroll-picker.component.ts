import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { getDaysInMonth, isValid } from 'date-fns';


import { MONTHS } from '../../consts/months';


@Component({
  selector: 'fs-date-scroll-picker',
  templateUrl: './date-scroll-picker.component.html',
  styleUrls: ['./date-scroll-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateScrollPickerDialogComponent implements OnInit, OnDestroy {

  @Input()
  public model: Date | null;

  @Input()
  public showMonth: boolean;

  @Input()
  public showDay: boolean;

  @Input()
  public showYear: boolean;

  @Input()
  public minYear: number;

  @Input()
  public maxYear: number;

  @Input()
  public maxDate: Date;

  @Output()
  public changed = new EventEmitter<Date>();

  public years: any[] = [];
  public months: any[] = [];

  public month;
  public day;
  public year;
  public maxDay = 0;

  constructor(
    public element: ElementRef,
    private _cdRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    @Inject(DOCUMENT)
    private _document,
  ) {}

  public ngOnInit(): void {
    const modelValue: Date = this.model;

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
      this.month = date.getMonth();
    }
  }

  private _getMonth(month) {
    return this.months.find(item => {
      return month === item.value;
    });
  }

  public change() {
    if (!this.year) {
      this.year = this.showYear ? this.years[0] : 0;
    }

    if (!this.month) {
      this.month = this.months[0].value;
    }

    if (!this.day) {
      this.day = 1;
    }
    
    const daysInMonth = getDaysInMonth(new Date(this.year, this.month));
    if (this.day > daysInMonth) {
      this.day = daysInMonth;
    }

    const date = new Date(this.year, this.month, this.day);

    this.changed.emit(date);
    this._cdRef.markForCheck();
  }

  public changeMonth() {
    this._generateDaysArray();
    this.change();
  }

  public changeYear() {
    this._generateDaysArray();
    if (this.maxDate) {
      this._generateMonthArray();
    }
    this.change();
  }

  private _generateDaysArray() {
    this.maxDay = 0;
    const maxDate = this.maxDate;
    const maxDay = maxDate && maxDate.getDate();
    const maxMonth = maxDate && maxDate.getMonth();
    const maxYear = maxDate && maxDate.getFullYear();

    if (this.month) {
      if (maxDay && maxMonth == this.month.value && maxYear === this.year) {
        this.maxDay = maxDay;
      } else {
        const daysInMonth = getDaysInMonth(new Date(this.year, this.month));
        this.maxDay = daysInMonth;
      }
    }

    if (!this.maxDay) {
      this.maxDay = 31;
    }
  }

  private _generateMonthArray() {
    this.months = MONTHS;
  }

  private _generateYearsArray() {
    let minYear = this.minYear;
    let maxYear = this.maxYear;

    if (!maxYear) {
      const today = new Date();
      maxYear = today.getFullYear();
    }

     for ( minYear; minYear <= maxYear; minYear++ ) {
       this.years.push({ name: minYear, value: minYear });
     }
  }

  private _pullToRefreshDisable(): void {
    this._renderer.addClass(this._document.body, 'fs-date-picker-prevent-pull-to-refresh');
  }

  private _pullToRefreshDefault(): void {
    this._renderer.removeClass(this._document.body, 'fs-date-picker-prevent-pull-to-refresh');
  }

}
