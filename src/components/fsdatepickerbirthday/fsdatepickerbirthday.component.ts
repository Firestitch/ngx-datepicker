import { Component, ElementRef, OnInit } from '@angular/core';
import { FsDatePickerModel } from '../../services/fsdatepickermodel.service';

import * as moment from 'moment';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'fs-date-picker-birthday',
  templateUrl: './fsdatepickerbirthday.component.html',
  styleUrls: ['./fsdatepickerbirthday.component.scss'],
  providers: [FsDatePickerModel]
})
export class FsDatepickerBirthdayComponent implements OnInit {
  public parentInstance: any = null;

  public years: number[] = [];
  public months: string[] = [];
  public days: number[] = [];

  public selectedDate = { day: null, month: null, year: null };

  constructor(public element: ElementRef,
              public fsDatePickerModel: FsDatePickerModel) {

  }

  public ngOnInit() {
    this.generateYearsArray();
    this.generateMonthArray();
    this.generateDaysArray();
  }

  public changedMonth(event: MatSelectChange) {
    const monthLength = this.daysInMonth(event.value);
    this.generateDaysArray(monthLength);
    if (monthLength < this.selectedDate.day) {
      this.selectedDate.day = null;
    }
  }

  public changedYear() {
    const monthLength = this.selectedDate.month ? this.daysInMonth(this.selectedDate.month) : 31;
    this.generateDaysArray(monthLength);
    if (this.selectedDate.day > monthLength) {
      this.selectedDate.day = null;
    }
  }

  public close() {
    this.parentInstance.opened = false;
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
    let minYear = this.parentInstance.minYear || new Date().getFullYear() - 100;
    const maxYear = this.parentInstance.maxYear || new Date().getFullYear();

     for ( minYear; minYear <= maxYear; minYear++ ) {
       this.years.push(minYear);
     }
  }


}
