import {
  ChangeDetectionStrategy,
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';

import { endOfYear, startOfYear } from 'date-fns';

import { isRangeDisabled } from '../../../../../common/helpers/is-range-disabled';
import { MONTHS } from '../../../../../calendar/consts/months';
import { isMonthDisabled } from '../../../../../common/helpers/is-month-disabled';


interface IYearListItem {
  value: number;
  // disabled: boolean;
}

interface IMonthListItem {
  value: number;
  name: string;
  abr: string;
  // disabled: boolean;
}


@Component({
  selector: 'fs-date-picker-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDatePickerHeaderComponent implements OnChanges, AfterViewInit {

  @Input()
  public viewMode: string;

  @Input()
  public minYear: number;

  @Input()
  public maxYear: number;

  @Input()
  public disabledDays: [Date, Date][];

  @Input()
  public calendarDate: Date;

  @Input()
  public monthYearConfigurable = true;

  @Output()
  public monthChange = new EventEmitter<number>();

  @Output()
  public yearChange = new EventEmitter<number>();

  @Output()
  public goNextMonth = new EventEmitter<void>();

  @Output()
  public goPrevMonth = new EventEmitter<void>();

  @Output()
  public viewModeChange = new EventEmitter<string>();

  public readonly now = new Date();
  public readonly monthNow = this.now.getMonth();
  public readonly yearNow = this.now.getFullYear();

  public yearsList: IYearListItem[] = [];
  public monthList: IMonthListItem[] = [];

  // this is viewMode that was selected before view was changed to selecting month/year
  // this logic MUST be moved out of this component to the DialogModel in case when such functionality
  // will be not only in this component
  private _mainViewMode: string;

  constructor(
    private _elRef: ElementRef,
  ) {}

  public get calendarMonth(): number {
    return this.calendarDate?.getMonth();
  }

  public get calendarYear(): number {
    return this.calendarDate?.getFullYear();
  }

  public get calendarDay(): number {
    return this.calendarDate?.getDate();
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public ngAfterViewInit(): void {
    this._createMonthsList();
    this._createYearsList();
  }

  public selectMonth(month: number): void {
    this.monthChange.emit(month);

    this.setViewMode(this._mainViewMode);
    this._mainViewMode = null;
  }

  public selectYear(year: number): void {
    this.yearChange.emit(year);

    this.setViewMode(this._mainViewMode);
    this._mainViewMode = null;
  }

  public setViewMode(mode: string): void {
    if (mode === 'month') {
      this._mainViewMode = this.viewMode;
    }

    this.viewModeChange.emit(mode);

    this._scrollToSelectedYear();
    this._scrollToSelectedMonth();
  }

  public nextMonth(): void {
    this.goNextMonth.emit();
  }

  public prevMonth(): void {
    this.goPrevMonth.emit();
  }

  private _createYearsList(): void {
    this.yearsList = [];

    for (let y: number = this.minYear; y < this.maxYear; y++) {
      // const year = new Date().setFullYear(y);
      this.yearsList.push({ value: y, /*disabled: this._isYearDisabled(year)*/ });
    }
  }

  private _createMonthsList(): void {
    // const year = this.calendarMonth ? this.calendarYear : this.now.getFullYear();

/*
    const checkIfMonthDisabled = (monthNumber: number, disabledDays) => {
      const month = new Date();
      month.setFullYear(year);
      month.setMonth(monthNumber);

      return isMonthDisabled(month, disabledDays)
    }
*/

    this.monthList = [];

    for (const item of MONTHS) {
      const monthItem = {
        ...item,
        // disabled: checkIfMonthDisabled(item.value, this.disabledDays),
      }

      this.monthList.push(monthItem);
    }
  }

/*
  private _isYearDisabled(date): boolean {
    const startYear = startOfYear(date);
    const endYear = endOfYear(date);

    return isRangeDisabled(this.disabledDays, startYear, endYear);
  }
*/

  private _scrollToSelectedYear(): void {
    setTimeout(() => {
      const years = this._elRef.nativeElement.querySelector('.years');
      if(years) {
        const selected = years.querySelector('.year.selected');

        if (selected) {
          selected.scrollIntoView({behavior: 'auto', block: 'center'});
        }
      }
    });
  }

  private _scrollToSelectedMonth(): void {
    setTimeout(() => {
      const years = this._elRef.nativeElement.querySelector('.months');
      if(years) {
        const selected = years.querySelector('.month.selected');

        if (selected) {
          selected.scrollIntoView({behavior: 'auto', block: 'center'});
        }
      }
    });
  }

}
