import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  IterableDiffers,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';

import { getStartDayDate } from '../../helpers/get-start-day-date';
import { splitDateByComponents } from '../../helpers/split-date-by-components';


@Component({
  selector: 'fs-date-picker-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDatePickerTimeComponent implements OnInit, OnChanges, DoCheck {

  @Input() public date = null;
  @Input() public disabledMinutes = [];
  @Input() public disabledHours = [];
  @Input() public disabledTimes = [];
  @Input() public expanded = false;
  @Input() public minutes = true;

  @Output() public onChange = new EventEmitter<any>();

  public selected: any = {};
  public disabledTimeMinutes: any = {};
  public disabledTimeHours: any = {};
  public disabledGroupedMinutes: any = {};
  public nowHour;
  public nowMinute;
  public timeHoursCollapsed = [
    [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11]
    ],
    [
      [12, 13, 14, 15],
      [16, 17, 18, 19],
      [20, 21, 22, 23]
    ]
  ];

  public timeMinutesCollapsed = [
    [0, 5],
    [10, 15],
    [20, 25],
    [30, 35],
    [40, 45],
    [50, 55]
  ];

  public timeHoursExpanded = [
    [0, 12],
    [1, 13],
    [2, 14],
    [3, 15],
    [4, 16],
    [5, 17],
    [6, 18],
    [7, 19],
    [8, 20],
    [9, 21],
    [10, 22],
    [11, 23]
  ];

  public timeMinutesExpanded = [
              [0, 1, 2, 3, 4],
              [5, 6, 7, 8, 9],
              [10, 11, 12, 13, 14],
              [15, 16, 17, 18, 19],
              [20, 21, 22, 23, 24],
              [25, 26, 27, 28, 29],
              [30, 31, 32, 33, 34],
              [35, 36, 37, 38, 39],
              [40, 41, 42, 43, 44],
              [45, 46, 47, 48, 49],
              [50, 51, 52, 53, 54],
              [55, 56, 57, 58, 59]
            ];

  private disabledMinutesDiffer = null;
  private disabledHoursDiffer = null;
  private disabledTimesDiffer = null;


  constructor(
    public element: ElementRef,
    private _iterableDiffers: IterableDiffers
  ) {
    this.disabledHoursDiffer = this._iterableDiffers.find([]).create(null);
    this.disabledMinutesDiffer = this._iterableDiffers.find([]).create(null);
    this.disabledTimesDiffer = this._iterableDiffers.find([]).create(null);
  }

  public ngOnInit() {
    this.checkDisabledTime();
    this.nowHour = (new Date()).getHours();
    this.nowMinute = this.minutes
      ? (new Date()).getMinutes()
      : 0;
  }

  public ngOnChanges(changes) {
    if (changes && changes.date) {
      this.selected = splitDateByComponents(this.date);
    }
  }

  public ngDoCheck() {
    if (this.disabledHoursDiffer.diff(this.disabledHours) ||
    this.disabledMinutesDiffer.diff(this.disabledMinutes) ||
    this.disabledTimesDiffer.diff(this.disabledTimes)
    ) {
      this.checkDisabledTime();
    }
  }

  public checkDisabledTime() {

    this.disabledTimeMinutes = {};
    this.disabledTimeHours = {};
    this.disabledGroupedMinutes = {};

    if (this.disabledMinutes !== undefined) {
      for (const range of this.disabledMinutes) {
        this.addDisabledMinutes(range);
      }
    }

    if (this.disabledHours !== undefined) {
      for (const range of this.disabledHours) {
        this.addDisabledHours(range);
      }
    }

    if (this.disabledTimes !== undefined) {
      for (const range of this.disabledTimes) {

        const min = Math.min(range[0], range[1]);
        const max = Math.max(range[0], range[1]);

        const minMinutes = min % 60;
        const maxMinutes = max % 60;

        const minHour = Math.floor(min / 60);
        const maxHour = Math.floor(max / 60);

        for (let h = 0; h <= 24; h++) {

          this.disabledGroupedMinutes[h] = {};

          if (h > minHour && h < maxHour)  {
            this.addDisabledHours(h);
          } else if (h == minHour && !minMinutes && minHour != maxHour) {
            this.addDisabledHours(h);
          }

          if (h >= minHour && h <= maxHour) {
            for (let m = minMinutes; m < maxMinutes; m++) {
              const minute = h * m;
              if (minute >= range[0] && minute <= range[1]) {
                this.disabledGroupedMinutes[h][m] = true;
              }
            }
          }
        }
      }
    }
  }

  public addDisabledMinutes(range) {
    const min = Math.min(range[0], range[1]);
    const max = Math.max(range[0], range[1]);
    if (Array.isArray(range)) {
      for (let i = min; i <= max; i++) {
        this.disabledTimeMinutes[i] = true;
      }
    } else {
      this.disabledTimeMinutes[range] = true;
    }
  }

  public addDisabledHours(range) {
    const min = Math.min(range[0], range[1]);
    const max = Math.max(range[0], range[1]);
    if (Array.isArray(range)) {
      for (let i = min; i <= max; i++) {
        this.disabledTimeHours[i] = true;
      }
    } else {
      this.disabledTimeHours[range] = true;
    }
  }

  public createModel() {
    if (!this.date) {
      this.setDate(getStartDayDate());
    }
  }

  public setDate(date) {
    this.date = date;
    this.onChange.emit(date);
  }

  public hourClick(hour) {

    if (this.disabledTimeHours[hour]) {
      return;
    }

    if (!this.date) {
      this.createModel();
    }

    const newDate = new Date(this.date);
    newDate.setHours(hour);

    this.setDate(newDate);
  }

  public minuteClick(minute) {

    if (this.disabledTimeMinutes[minute]) {
      return;
    }

    if (!this.date) {
      this.createModel();
    }

    const newDate = new Date(this.date);
    newDate.setMinutes(minute);

    this.setDate(newDate);
  }

}
