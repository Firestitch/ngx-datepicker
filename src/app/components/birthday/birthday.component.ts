import { Component, ElementRef, OnInit } from '@angular/core';
import { FsDatePickerModel } from '../../services/model.service';
import { MatSelectChange } from '@angular/material';

import { addMonths, format, getDate, getDaysInMonth, isDate, isValid, setMonth } from 'date-fns';

import { FsDatePickerBaseComponent } from '../../classes/base-component';


@Component({
  selector: 'fs-date-picker-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.scss'],
  providers: [FsDatePickerModel]
})
export class FsDatepickerBirthdayComponent extends FsDatePickerBaseComponent implements OnInit {

  public years: number[] = [];
  public months: { name: string, number: number }[] = [];
  public days: number[] = [];

  public selectedDate = { day: null, month: null, year: null };

  constructor(public element: ElementRef) {
    super();
  }

  public ngOnInit() {
    this.setSelectedDate();
    this.generateYearsArray();
    this.generateMonthArray();
    this.generateDaysArray();
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

  private setSelectedDate() {
    const date = this.parentDirective.ngModel;

    if (isValid(date) && isDate(date)) {
      this.selectedDate = {
        day: getDate(date),
        month: addMonths(new Date(), date.getMonth()),
        year: date.getFullYear()
      };
    }
  }

  private updateDate() {
    const year = this.selectedDate.year;
    const month = this.selectedDate.month && this.selectedDate.month.number;
    const date = this.selectedDate.day;

    if (year && month && date) {
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
   * @param {string} monthTitle
   * @returns {number}
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
   * @param {number} length
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
