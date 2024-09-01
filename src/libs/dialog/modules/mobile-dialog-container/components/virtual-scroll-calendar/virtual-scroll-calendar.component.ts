import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import {
  CdkVirtualScrollViewport,
  VIRTUAL_SCROLL_STRATEGY,
} from '@angular/cdk/scrolling';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatTabGroup } from '@angular/material/tabs';

import { Observable, Subject, fromEvent, race, timer } from 'rxjs';
import {
  debounceTime,
  delay,
  filter,
  shareReplay,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';

import { isBefore } from 'date-fns';

import { RangePickerRef } from '../../../../../../app/classes/range-picker-ref';
import { FsDatePickerDialogModel } from '../../../../../dialog/classes/dialog-model';
import { FsDatePickerDialogRef } from '../../../../classes/dialog-ref';

import { FsCalendarDataSource } from './calendar-data-source';
import { CalendarScrollStrategy, FsCalendarMobileScrollStrategy } from './calendar-scroll-strategy';


@Component({
  selector: 'fs-datepicker-mobile-scroll-calendar',
  templateUrl: './virtual-scroll-calendar.component.html',
  styleUrls: ['./virtual-scroll-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useClass: CalendarScrollStrategy,
    },
  ],
})
export class FsDatePickerVirtualScrollCalendarComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public datePickerModel: FsDatePickerDialogModel;

  @Input()
  public autoClose = true;

  @Input()
  public parentTabGroup: MatTabGroup;

  @Input()
  public parentTabIndex: number;

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  public virtualScroll: CdkVirtualScrollViewport;

  public modelFrom$: Observable<Date>;
  public modelTo$: Observable<Date>;

  public dataSource = new FsCalendarDataSource();

  private _dialogRef: FsDatePickerDialogRef;
  private _activeScrollIndex: number;
  private _destroy$ = new Subject<void>();

  constructor(
    private _el: ElementRef,
    private _bottomSheetRef: MatBottomSheetRef,
    @Inject(VIRTUAL_SCROLL_STRATEGY)
    private _scrollStrategy: FsCalendarMobileScrollStrategy,
  ) {}

  public get dialogRef(): FsDatePickerDialogRef {
    return this._dialogRef;
  }

  public get rangePickerRef(): RangePickerRef | null {
    return this.datePickerModel.rangePickerRef;
  }

  public ngOnInit() {
    this._scrollStrategy.setInitialDate(this.datePickerModel.model || new Date());
    // this._scrollToClosestMonth();

    if (this.parentTabGroup) {
      this._listenTabIndexChange();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.datePickerModel?.currentValue
      && changes.datePickerModel?.firstChange
      && this.datePickerModel.view === 'monthrange') {
      this._initMonthRangeModels();
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public dateChanged(date): void {

    if (this.datePickerModel.view !== 'monthrange') {
      this.datePickerModel.model = date;
      this.close();
    } else {
      this.monthRangeChange(date);
    }
  }

  public monthRangeChange(date): void {
    const rangeRef = this.rangePickerRef;
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

  public close(): void {
    if (this.autoClose) {
      this._bottomSheetRef.dismiss();
    }
  }

  public scollIndexChange(activeIndex: number): void {
    this._activeScrollIndex = activeIndex;
  }

/*
  // Best feature ever :( but it was decided to disable it...
  private _scrollToClosestMonth(): void {
    const touchstart$ = fromEvent(
      this.virtualScroll.elementRef.nativeElement,
      'touchstart',
    );

    const touchend$ = fromEvent(
      this.virtualScroll.elementRef.nativeElement,
      'touchend',
    );

    const scrollDebounceTime = 80;

    touchstart$
      .pipe(
        switchMap(() => touchend$),
        switchMap(() =>
          race<unknown>(
            this.virtualScroll.elementScrolled(),
            timer(scrollDebounceTime),
          ).pipe(
            debounceTime(scrollDebounceTime * 2),
            take(1),
            takeUntil(touchstart$),
          ),
        ),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.virtualScroll.scrollToIndex(this._activeScrollIndex, 'smooth');
      });
  }
*/

  private _initMonthRangeModels(): void {
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
  }

  private _listenTabIndexChange(): void {
    this.parentTabGroup.selectedIndexChange
      .pipe(
        filter((index) => index === this.parentTabIndex),
        delay(0),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._scrollStrategy.scrollToDate(this.datePickerModel.model || new Date());
      });
  }
}
