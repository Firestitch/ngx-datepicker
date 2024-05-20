import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { isDate, isValid, setDate, startOfDay } from 'date-fns';

import { PickerViewType } from '../../../libs/common/enums/picker-view-type.enum';
import { WeekDays } from '../../../libs/common/types/week-days.type';
import { FsDatePickerDialogModel } from '../../../libs/dialog/classes/dialog-model';
import { IFsDatePickerConfig } from '../../interfaces/datepicker-config.interface';
import { FS_DATEPICKER_CONFIG } from '../../providers/datepicker-config.provider';


@Component({
  selector: 'fs-date-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: [
    './calendar-picker.component.scss',
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsDateCalendarPickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateCalendarPickerComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input()
  public today = true;

  @Input()
  public disabledDates: [Date, Date][];

  @Input()
  public enabledDates: [Date, Date][];

  @Input()
  public daySize;

  @Input()
  public headerLayout: 'center' | 'left' = 'center';

  @Input()
  public weekStartsOn: WeekDays;

  @Input()
  public focusDate: Date;

  @Input() 
  public minDate = null;

  @Input() 
  public maxDate = null;

  @Output()
  public monthChange = new EventEmitter<Date>();

  private readonly _datePickerModel =
    new FsDatePickerDialogModel({ view: PickerViewType.Date });

  private _onChange: (value: Date | null) => void;
  private _onTouch: () => void;

  constructor(
    @Optional()
    @Inject(FS_DATEPICKER_CONFIG)
    private _globalConfig: IFsDatePickerConfig,
  ) {}

  public ngOnInit(): void {
    this._init();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.focusDate && changes.focusDate.currentValue !== changes.focusDate.previousValue) {
      this._goToFocusDate();
    }
  }

  public writeValue(date: Date | null) {
    this._datePickerModel.model = date;
  }

  public registerOnChange(fn: (value: Date | null) => void) {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this._onTouch = fn;
  }

  public get datePickerModel(): FsDatePickerDialogModel {
    return this._datePickerModel;
  }

  public dateChanged(date: Date): void {
    this.datePickerModel.model = date;
    this._onChange(this.datePickerModel.model);
  }

  public nextMonth(): void {
    this.datePickerModel.nextMonth();
    this.monthChange.emit(setDate(startOfDay(this.datePickerModel.calendarDate),1));
  }

  public prevMonth(): void {
    this.datePickerModel.prevMonth();
    this.monthChange.emit(setDate(startOfDay(this.datePickerModel.calendarDate),1));
  }

  private _init(): void {
    this._datePickerModel.weekStartsOn =
      this.weekStartsOn ?? this._globalConfig.weekStartsOn;
  }

  private _goToFocusDate(): void {
    if (isDate(this.focusDate) && isValid(this.focusDate)) {
      this._datePickerModel.goToMongth(this.focusDate.getMonth());
      this._datePickerModel.goToYear(this.focusDate.getFullYear());
    }
  }
}
