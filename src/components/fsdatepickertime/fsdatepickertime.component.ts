import { Component, Inject, Input, Output, EventEmitter, HostListener, ElementRef,
  IterableDiffers, OnInit, OnChanges, DoCheck } from '@angular/core';
import * as moment from 'moment-timezone';
import { FsDatePickerCommon } from './../../services/fsdatepickercommon.service';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';

@Component({
    selector: 'fsDatePickerTime',
    templateUrl: './fsdatepickertime.component.html',
    styleUrls: ['./fsdatepickertime.component.scss']
})
export class FsDatePickerTimeComponent implements OnInit, OnChanges, DoCheck {

  @Input() date;
  @Input() disabledMinutes = [];
  @Input() disabledHours = [];
  @Input() disabledTimes = [];
  @Output() onChange = new EventEmitter<any>();
  selected = {};

  disabledTimeMinutes = {};
  disabledTimeHours = {};
  disabledGroupedMinutes = {};
  private disabledMinutesDiffer = null;
  private disabledHoursDiffer = null;
  private disabledTimesDiffer = null;

  timeHours = [[0,12],[1,13],[2,14],[3,15],[4,16],[5,17],[6,18],[7,19],[8,20],[9,21],[10,22],[11,23]];
  timeMinutes = [	[0,1,2,3,4],
              [5,6,7,8,9],
              [10,11,12,13,14],
              [15,16,17,18,19],
              [20,21,22,23,24],
              [25,26,27,28,29],
              [30,31,32,33,34],
              [35,36,37,38,39],
              [40,41,42,43,44],
              [45,46,47,48,49],
              [50,51,52,53,54],
              [55,56,57,58,59]];


  constructor(public element: ElementRef, private fsDatePickerCommon: FsDatePickerCommon,
    public fsDatePickerModel: FsDatePickerModel,
    private _iterableDiffers: IterableDiffers) {
      this.disabledHoursDiffer = this._iterableDiffers.find([]).create(null);
      this.disabledMinutesDiffer = this._iterableDiffers.find([]).create(null);
      this.disabledTimesDiffer = this._iterableDiffers.find([]).create(null);
    }

  ngOnInit() {
    this.checkDisabledTime();
  }

  ngOnChanges(changes) {
    if (changes && changes.date) {
      this.selected = this.fsDatePickerCommon.getSelected(this.date);
    }
  }

  ngDoCheck() {
    if (this.disabledHoursDiffer.diff(this.disabledHours) ||
    this.disabledMinutesDiffer.diff(this.disabledMinutes) ||
    this.disabledTimesDiffer.diff(this.disabledTimes)
    ) {
      this.checkDisabledTime();
    }
  }

  checkDisabledTime() {

    this.disabledTimeMinutes = {};
    this.disabledTimeHours = {};
    this.disabledGroupedMinutes = {};

    if (this.disabledMinutes !== undefined) {
      for (let range of this.disabledMinutes) {
        this.addDisabledMinutes(range);
      };
    }

    if (this.disabledHours !== undefined) {
      for (let range of this.disabledHours) {
        this.addDisabledHours(range);
      };
    }

    if (this.disabledTimes !== undefined) {
      for (let range of this.disabledTimes) {

        let min = Math.min(range[0], range[1]);
        let max = Math.max(range[0], range[1]);

        let minMinutes = min % 60;
        let maxMinutes = max % 60;

        let minHour = Math.floor(min / 60);
        let maxHour = Math.floor(max / 60);

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
      };
    }
  }

  addDisabledMinutes(range) {
    let min = Math.min(range[0], range[1]);
    let max = Math.max(range[0], range[1]);
    if (Array.isArray(range)) {
      for (let i = min; i <= max; i++) {
        this.disabledTimeMinutes[i] = true;
      }
    } else {
      this.disabledTimeMinutes[range] = true;
    }
  }

  addDisabledHours(range) {
    let min = Math.min(range[0], range[1]);
    let max = Math.max(range[0], range[1]);
    if (Array.isArray(range)) {
      for (let i = min; i <= max; i++) {
        this.disabledTimeHours[i] = true;
      }
    } else {
      this.disabledTimeHours[range] = true;
    }
  }

  createModel() {
    if (!this.date) {
      this.setDate(this.fsDatePickerCommon.createMoment());
    }
  }

  setDate(date) {
    this.date = date;
    this.onChange.emit(date);
  }

  hourClick(hour) {

    if (this.disabledTimeHours[hour]) {
      return;
    }

    if (!this.date) {
      this.createModel();
    }

    this.setDate(this.date.clone().hour(hour));
  }

  minuteClick(minute) {

    if (this.disabledTimeMinutes[minute]) {
      return;
    }

    if (!this.date) {
      this.createModel();
    }

    this.setDate(this.date.clone().minute(minute));
  }

}
