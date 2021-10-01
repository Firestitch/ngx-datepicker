import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { FsDatePickerDialogModel } from '@libs/dialog/classes/dialog-model';

import { FsDatePickerBaseCalendarDialogDirective } from '../../directives/base-desktop-dialog.directive';

import { FsDateDialogRef } from '../../../../classes/date-dialog-ref';


@Component({
  templateUrl: './desktop-dialog.component.html',
  styleUrls: ['./desktop-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDesktopCalendarDialogComponent extends FsDatePickerBaseCalendarDialogDirective implements OnInit {

  public timePickerExpanded = false;
  public mobileView = this.breakpointObserver.isMatched('(max-width: 737px)');
  public selectedDateTimeTab = 0;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private _cd: ChangeDetectorRef,
    protected _dialogRef: FsDateDialogRef,
  ) {
    super(_dialogRef);
  }

  public get datePickerModel(): FsDatePickerDialogModel {
    return this._dialogRef.pickerModel;
  }

  public get dialogRef(): FsDateDialogRef {
    return this._dialogRef;
  }

  public ngOnInit() {

    /*this.breakpointObserver.observe('(max-width: 737px)')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((state) => {
        this.mobileView = state.matches;
        this._cd.detectChanges();
      });*/
  }

  public viewModeChanged(mode: string) {
    this.datePickerModel.setCalendarMode(mode);
  }

  public monthChanged(month: number) {
    this.datePickerModel.setCalendarMonth(month);
  }

  public yearChanged(year: number) {
    this.datePickerModel.setCalendarYear(year);
  }

  public nextMonth(): void {
    this.datePickerModel.nextMonth();
  }

  public prevMonth(): void {
    this.datePickerModel.prevMonth();
  }

  public dateChanged(date): void {
    this.datePickerModel.model = date;

    this.close();
  }

  public periodChanged(date): void {
    this.datePickerModel.period = date;

    this.close();
  }

  public toggleTimeExpand() {
    this.timePickerExpanded = !this.timePickerExpanded;
  }

  public selectedDateTimeTabChange(index) {
    this.selectedDateTimeTab = index;
  }

  public setDateMode(mode) {
    this.datePickerModel.dateMode = mode;
  }
}
