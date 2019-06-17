import {
  Component,
  ViewEncapsulation,
  OnInit,
  Inject, OnDestroy,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { FsDatePickerModel } from '../../services/model.service';
import { FsDatePickerBaseDialogComponent } from '../../classes/base-dialog-component';
import { DIALOG_DATA } from '../../services/dialog-data';
import { FsDateDialogRef } from '../../classes/date-dialog-ref';
import { getSafeDate } from '../../helpers/get-safe-date';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isAfter, isBefore } from 'date-fns';


@Component({
    selector: 'fs-date-picker',
    templateUrl: './datepicker-dialog.component.html',
    styleUrls: ['./datepicker-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ FsDatePickerModel ],
})
export class FsDatePickerDialogComponent extends FsDatePickerBaseDialogComponent implements OnInit, OnDestroy {

  public model = null;
  public calendarMonth = null;
  public disabledDays = null;
  public timePickerExpanded = false;
  public mobileView = this.breakpointObserver.isMatched('(max-width: 737px)');


  public selectedDateTimeTab = 0;

  private _destroy$ = new Subject<void>();

  constructor(
    @Inject(DIALOG_DATA) public dialogData,
    public fsDatePickerModel: FsDatePickerModel,
    public breakpointObserver: BreakpointObserver,
    private _dialogRef: FsDateDialogRef,
  ) {
    super();

    this._initModel();
    this._initComponents();
    // this.parentDirective = this.dialogData.parentDirective;
  }

  public ngOnInit() {
    this.initCalendar();
    this.disabledDays = this.fsDatePickerModel.disabledDays();

    this._initBaseDate();

    this.breakpointObserver.observe('(max-width: 737px)')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((state) => {
        this.mobileView = state.matches;
      });

    (window as any).t = () => {
      this._dialogRef.overlayRef.updatePositionStrategy(this._dialogRef.positionStrategy.withPositions(
        [
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 150,
          }
        ]
      ));
    }
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public initCalendar() {
    // this.model = this.parentDirective.getModelValue();
    this.model = this.dialogData.modelValue;
    this.calendarDrawMonth(this.model);
  }

  public setDate(date) {
    this.model = date;
    this._dialogRef.updateValue(this.model);
    // this.parentDirective.updateValue(date);
    this.calendarDrawMonth(this.model);

    if (this.fsDatePickerModel.view === 'date') {
      this.close();
    }
  }

  public close() {
    this._dialogRef.close();
    // this.dialogData.parentDirective.close();
  }

  public toggleTimeExpand() {
    this.timePickerExpanded = !this.timePickerExpanded;
  }

  public selectedDateTimeTabChange(index) {
    this.selectedDateTimeTab = index;
  }

  public setDateMode(mode) {
    this.fsDatePickerModel.dateMode = mode;
  }

  public setComponents(data) {
    this.fsDatePickerModel.components = data;
  }

  public calendarDrawMonth(date) {
    this.calendarMonth = getSafeDate(date || this.fsDatePickerModel.minDate);
  }

  private _initBaseDate() {
    const pickerModel = this.fsDatePickerModel;

    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    if (
      (!pickerModel.minDate || isAfter(date, pickerModel.minDate)) &&
      (!pickerModel.maxDate || isBefore(date, pickerModel.maxDate))
    ) {
      this.model = date;
    }
  }

  private _initModel() {
    this.fsDatePickerModel.view = this.dialogData.view;
    this.fsDatePickerModel.minYear = this.dialogData.minYear;
    this.fsDatePickerModel.maxYear = this.dialogData.maxYear;
    this.fsDatePickerModel.minDate = this.dialogData.minDate;
    this.fsDatePickerModel.maxDate = this.dialogData.maxDate;
    this.fsDatePickerModel.presets = this.dialogData.presets;
    this.fsDatePickerModel.dateMode = this.dialogData.dateMode;
  }

  private _initComponents() {
    if (this.dialogData.components) {
      this.fsDatePickerModel.components = this.dialogData.components;
    }
  }
}
