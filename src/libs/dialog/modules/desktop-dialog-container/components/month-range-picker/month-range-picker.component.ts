import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
  map,
  shareReplay,
  takeUntil,
} from 'rxjs/operators';

import { addMonths, isBefore } from 'date-fns';

import { DayItem } from '../../../../../calendar/interfaces/day-item.interface';
import { DatePreset } from '../../../../../common/enums/date-preset.enum';
import { monthWheelScroll } from '../../../../../common/helpers/month-wheel-scroll';
import { FsDatePickerDialogModel } from '../../../../../dialog/classes/dialog-model';
import { FsDatePickerDialogRef } from '../../../../classes/dialog-ref';
import { FsDatePickerHeaderMonthRangeComponent } from '../header-month-range/header-month-range.component';
import { FsDatePickerCalendarComponent } from '../../../../../calendar/components/calendar/calendar.component';
import { FsDatePickerTimeComponent } from '../../../../../calendar/components/time/time.component';
import { ActionButtonsComponent } from '../../../../../components/action-buttons/action-buttons.component';
import { FsDatePickerPresetsComponent } from '../../../../../components/presets/presets.component';
import { MatAnchor } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';


@Component({
    selector: 'fs-datepicker-month-range-picker',
    templateUrl: './month-range-picker.component.html',
    styleUrls: ['./month-range-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsDatePickerHeaderMonthRangeComponent,
        FsDatePickerCalendarComponent,
        FsDatePickerTimeComponent,
        ActionButtonsComponent,
        FsDatePickerPresetsComponent,
        MatAnchor,
        AsyncPipe,
    ],
})
export class FsMonthRangePickerComponent implements OnChanges, AfterViewInit, OnDestroy {

  @ViewChild('calendars', { read: ElementRef })
  public calendars: ElementRef<HTMLElement>;

  @Input()
  public dialogRef: FsDatePickerDialogRef;

  @Input()
  public datePickerModel: FsDatePickerDialogModel;

  public leftCalendarDate$: Observable<Date>;
  public rightCalendarDate$: Observable<Date>;

  public modelFrom$: Observable<Date>;
  public modelTo$: Observable<Date>;

  /** The end of the range to paint — the real one, or the day being hovered. */
  public highlightEndDate$: Observable<Date>;

  /** True while that end is a hover rather than a committed date. */
  public highlightPreview$: Observable<boolean>;

  private _hoverDate$ = new BehaviorSubject<Date | null>(null);
  private _destroy$ = new Subject();

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.datePickerModel?.currentValue
      && changes.datePickerModel?.firstChange
      && this.datePickerModel.view === 'monthrange'
    ) {
      this._initMonthRangeModels();
    }
  }

  /*public viewModeChanged(mode: string) {
    this.datePickerModel.setCalendarMode(mode);
  }

  public monthChanged(month: number) {
    this.datePickerModel.setCalendarMonth(month);
  }

  public yearChanged(year: number) {
    this.datePickerModel.setCalendarYear(year);
  }*/

  public nextMonth(): void {
    this.datePickerModel.nextMonth();
  }

  public prevMonth(): void {
    this.datePickerModel.prevMonth();
  }

  public dayHovered(day: DayItem): void {
    if (day.disabled || day.surrounding) {
      return;
    }

    this._hoverDate$.next(new Date(day.year, day.month, +day.number));
  }

  public hoverCleared(): void {
    this._hoverDate$.next(null);
  }

  public dateChanged(date): void {
    this.hoverCleared();

    const rangeRef = this.datePickerModel.rangePickerRef;
    const { startDate, endDate } = rangeRef;

    if (!startDate && !endDate) {
      rangeRef.updateStartDate(date);
    } else if (startDate && !endDate) {
      if (isBefore(date, startDate)) {
        rangeRef.updateStartDate(date);
        rangeRef.updateEndDate(null);
      } else {
        rangeRef.updateEndDate(date);
      }
    } else if (startDate && endDate) {
      rangeRef.updateStartDate(date);
      rangeRef.updateEndDate(null);
    }
  }

  public presetChanged(preset: DatePreset): void {
    if (this.datePickerModel.applyPreset(preset)) {
      this.close();
    }
  }

  public periodChanged(date): void {
    this.datePickerModel.period = date;

    this.close();
  }

  public setDateMode(mode) {
    this.datePickerModel.dateMode = mode;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public ngAfterViewInit(): void {
    if (this.calendars) {
      monthWheelScroll(this.calendars.nativeElement)
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((step) => {
          if (step > 0) {
            this.nextMonth();
          } else {
            this.prevMonth();
          }
        });
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _initMonthRangeModels(): void {
    this.leftCalendarDate$ = this.datePickerModel.calendarDate$;
    this.rightCalendarDate$ = this.datePickerModel.calendarDate$
      .pipe(
        map((value) => value && addMonths(value, 1) || null),
      );

    this.modelFrom$ = this.datePickerModel
      .rangePickerRef
      .startDate$
      .pipe(
        shareReplay(),
      );

    this.modelTo$ = this.datePickerModel
      .rangePickerRef
      .endDate$
      .pipe(
        shareReplay(),
      );

    // Once the start is down and the end is not, the day under the cursor
    // stands in for the end so the band follows the mouse. It stands in for the
    // highlight only — `rangeTo` stays empty, so the hovered day keeps its
    // faded hover circle instead of looking already selected.
    const range$ = combineLatest([this.modelFrom$, this.modelTo$, this._hoverDate$])
      .pipe(
        shareReplay(),
      );

    this.highlightEndDate$ = range$
      .pipe(
        map(([from, to, hover]: [Date, Date, Date]) => {
          return to || (from ? hover : null);
        }),
      );

    this.highlightPreview$ = range$
      .pipe(
        map(([from, to, hover]: [Date, Date, Date]) => {
          return !!from && !to && !!hover;
        }),
      );
  }
}
