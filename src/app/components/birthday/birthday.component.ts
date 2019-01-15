import { Component, ElementRef, OnInit } from '@angular/core';
import { FsDatePickerModel } from '../../services/model.service';
import { MatSelectChange } from '@angular/material';

import * as moment_ from 'moment';
const moment = moment_

import { FsDatePickerBaseComponent } from '../../classes/base-component';


@Component({
  selector: 'fs-date-picker-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.scss'],
  providers: [FsDatePickerModel]
})
export class FsDatepickerBirthdayComponent extends FsDatePickerBaseComponent implements OnInit {

  public years: number[] = [];
  public months: string[] = [];
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
    const monthLength = this.daysInMonth(event.value);
    this.generateDaysArray(monthLength);
    if (monthLength < this.selectedDate.day) {
      this.selectedDate.day = null;
    }
    this.updateDate();
  }

  public changedYear() {
    const monthLength = this.selectedDate.month ? this.daysInMonth(this.selectedDate.month) : 31;
    this.generateDaysArray(monthLength);
    if (this.selectedDate.day > monthLength) {
      this.selectedDate.day = null;
    }
    this.updateDate();
  }

  private setSelectedDate() {
    const momentDate = moment(this.parentDirective.ngModel);

    if (momentDate.isValid()) {
      this.selectedDate = {
        day: momentDate.get('date'),
        month: moment().month(momentDate.get('month')).format('MMMM'),
        year: momentDate.get('year')
      };
    }
  }

  private updateDate() {
    const year = this.selectedDate.year;
    const month = this.selectedDate.month;
    const date = this.selectedDate.day;

    if (year && month && date) {
      const newDate = moment()
        .set({ year, month, date });

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
  private daysInMonth(monthTitle: string): number {
    const year = this.selectedDate.year || new Date().getFullYear();
    return moment(`${year} ${monthTitle}`, 'YYYY MMM').daysInMonth();
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
   * by default format is MMMM - January, February, March ... etc.
   */
  private generateMonthArray(format = 'MMMM') {
    this.months = Array.from(Array(12).keys()).map((m: number) => moment().month(m).format(format));
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
