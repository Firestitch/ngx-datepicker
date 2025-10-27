import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';


import { MONTHS } from '../../../../../calendar/consts/months';
import { NgClass } from '@angular/common';

interface IYearListItem {
  value: number;
}

interface IMonthListItem {
  value: number;
  name: string;
  abr: string;
}


@Component({
    selector: 'fs-date-picker-mobile-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass],
})
export class FsDatePickerMobileHeaderComponent implements AfterViewInit {
  private _elRef = inject(ElementRef);


  @Input()
  public viewMode: string;

  @Input()
  public minYear: number;

  @Input()
  public maxYear: number;

  @Input()
  public disabledDates: [Date, Date][];

  @Input()
  public calendarDate: Date;

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

  public get calendarMonth(): number {
    return this.calendarDate?.getMonth();
  }

  public get calendarYear(): number {
    return this.calendarDate?.getFullYear();
  }

  public get calendarDay(): number {
    return this.calendarDate?.getDate();
  }

  public ngAfterViewInit(): void {
    this._createMonthsList();
    this._createYearsList();
  }

  public selectMonth(month: number): void {
    this.monthChange.emit(month);

    this.setViewMode('date');
  }

  public selectYear(year: number): void {
    this.yearChange.emit(year);

    this.setViewMode('date');
  }

  public setViewMode(mode: string): void {
    this.viewModeChange.emit(mode);

    if (mode === 'year') {
      this._scrollToSelectedYear();
    }
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
      this.yearsList.push({ value: y });
    }
  }

  private _createMonthsList(): void {
    this.monthList = [];

    for (const item of MONTHS) {
      const monthItem = {
        ...item,
      };

      this.monthList.push(monthItem);
    }
  }

  private _scrollToSelectedYear(): void {
    setTimeout(() => {
      const years = this._elRef.nativeElement.querySelector('.years');
      if(years) {
        const selected = years.querySelector('.year.selected');

        if (selected) {
          years.scrollTop = selected.offsetTop;
        }
      }
    }, 50);
  }

}
