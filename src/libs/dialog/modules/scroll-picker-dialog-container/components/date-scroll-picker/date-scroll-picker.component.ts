import { DOCUMENT } from '@angular/common';
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
  ViewChild,
} from '@angular/core';

import { ScrollPickerComponent } from '@firestitch/scroll-picker';

import { getDaysInMonth, isValid, startOfDay } from 'date-fns';

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

  private _maxDate: Date;
  private _minDate: Date;

  @Input()
  public set maxDate(value: Date) {
    this._maxDate = value && startOfDay(value);
  }

  @Input()
  public set minDate(value: Date) {
    this._minDate = value && startOfDay(value);
  }

  @Output()
  public changed = new EventEmitter<Date>();

  @ViewChild('monthRef')
  public monthRef: ScrollPickerComponent;

  @ViewChild('yearRef')
  public yearRef: ScrollPickerComponent;

  @ViewChild('dayRef')
  public dayRef: ScrollPickerComponent;

  public years: any[] = [];
  public months: any[] = [];

  public month;
  public day;
  public year;
  public maxDay = 0;
  public minDay = 1;
  public disabledMinYear = null;
  public disabledMaxYear = null;
  public disabledMinMonth = null;
  public disabledMaxMonth = null;
  public disabledMinDay = null;
  public disabledMaxDay = null;

  public get disabledValue(): boolean {
    return this.monthRef?.valueDisabled
        || this.yearRef?.valueDisabled
        || this.dayRef?.valueDisabled;
  }

  constructor(
    public element: ElementRef,
    private _cdRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    @Inject(DOCUMENT)
    private _document,
  ) {}

  public get maxDate(): Date {
    return this._maxDate;
  }

  public get minDate(): Date {
    return this._minDate;
  }

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
    this.dayRef?.updateValues();

    this._generateMaxDaysArray();
    this._generateMinDaysArray();
  }

  private _generateMaxDaysArray() {
    this.maxDay = 0;

    const maxDate = this.maxDate;
    const maxDay = maxDate && maxDate.getDate();
    const maxMonth = maxDate && maxDate.getMonth();
    const maxYear = maxDate && maxDate.getFullYear();

    this.disabledMaxDay = undefined;
    if (this.maxDate) {
      if (maxYear === this.year && maxMonth === this.month) {
        this.disabledMaxDay = maxDay;
      } else {
        this._setMaxDay(maxDay, maxMonth, maxYear);

        if(this.year === this.maxDate?.getFullYear() && this.month > this.maxDate?.getMonth()) {
          this.disabledMaxDay = 0;
        }
      }
    } else {
      this._setMaxDay(maxDay, maxMonth, maxYear);
    }

    if (!this.maxDay) {
      this.maxDay = 31;
    }
  }

  private _generateMinDaysArray() {
    const minDate = this.minDate;
    const minDay = minDate && minDate.getDate();
    const minMonth = minDate && minDate.getMonth();
    const minYear = minDate && minDate.getFullYear();

    this.disabledMinDay = undefined;
    if (this.minDate) {
      if (minYear === this.year && minMonth === this.month) {
        this.disabledMinDay = minDay;
      } else {
        if (this.year < this.minDate?.getFullYear()) {
          this.disabledMaxDay = 1;
        }

        this.disabledMinDay = 1;
      }
    }
  }

  private _setDate(date: Date) {
    if (date) {
      this.day = date.getDate();
      this.year = date.getFullYear();
      this.month = date.getMonth();
    }
  }

  private _setMaxDay(maxDay, maxMonth, maxYear): void {
    if (this.month) {
      if (maxDay && maxMonth === this.month.value && maxYear === this.year) {
        this.maxDay = maxDay;
      } else {
        const daysInMonth = getDaysInMonth(new Date(this.year, this.month));
        this.maxDay = daysInMonth;
      }
    }
  }

  private _generateMonthArray() {
    this.months = MONTHS;

    if (this.maxDate) {
      if (this.maxDate?.getFullYear() === this.year) {
        const maxMonth = this.maxDate.getMonth();

        this.disabledMaxMonth = maxMonth;

      } else if (this.year > this.maxDate?.getFullYear()) {
        this.disabledMaxMonth = 0;
      } else {
        this.disabledMaxMonth = 12;
      }
    } else {
      this.disabledMaxMonth = 12;
    }

    if (this.minDate) {
      if (this.minDate.getFullYear() === this.year) {
        const minMonth = this.minDate.getMonth();
        this.disabledMinMonth = minMonth;
      } else {
        if (this.year < this.minDate.getFullYear()) {
          this.disabledMaxMonth = -1;
          this.disabledMaxDay = -1;
        }
        this.disabledMinMonth = null;
      }
    }
  }

  private _generateYearsArray() {
    let minYear = this.minYear;
    const maxYear = this.maxYear;

    this.disabledMaxYear = this.maxDate ? this.maxDate?.getFullYear() : maxYear;

    this.disabledMinYear = this.minDate ? this.minDate?.getFullYear() : minYear;

    for ( minYear; minYear <= maxYear; minYear++ ) {
      this.years.push({
        name: minYear,
        value: minYear,
      });
    }
  }

  private _pullToRefreshDisable(): void {
    this._renderer.addClass(this._document.body, 'fs-date-picker-prevent-pull-to-refresh');
  }

  private _pullToRefreshDefault(): void {
    this._renderer.removeClass(this._document.body, 'fs-date-picker-prevent-pull-to-refresh');
  }

}
