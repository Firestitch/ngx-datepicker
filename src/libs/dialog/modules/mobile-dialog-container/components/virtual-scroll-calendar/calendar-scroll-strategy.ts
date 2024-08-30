import { CdkVirtualScrollViewport, VirtualScrollStrategy } from '@angular/cdk/scrolling';

import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { getYearsCycle, reduceCycle } from './helpers';
import { Injectable } from "@angular/core";

export const YEARS_TO_BE_RENDERED = 200;
export const START_CYCLE_YEAR = 1900;

const RENDER_BUFFER = 500;

// height of month label and week days line
const MONTH_LABEL_HEIGHT = 50;
// height of week row
const WEEK_HEIGHT = 45;

export interface FsCalendarMobileScrollStrategy extends VirtualScrollStrategy {
  setInitialDate(date: Date): void;
  scrollToDate(date: Date, behavior?: ScrollBehavior): void;
}


/**
 * Implementation has been taken from Alex Inkin article, adopted and modified a bit
 * https://indepth.dev/posts/1091/writing-custom-virtual-scroll-strategy
 */
@Injectable()
export class CalendarScrollStrategy implements FsCalendarMobileScrollStrategy {

  private readonly _index$ = new Subject<number>();

  public readonly scrolledIndexChange = this._index$.pipe(distinctUntilChanged());

  private _viewport: CdkVirtualScrollViewport | null = null;
  private _initialDate: Date;
  private _firstTimeRender = true;

  private readonly yearsCycle = getYearsCycle(MONTH_LABEL_HEIGHT, WEEK_HEIGHT, START_CYCLE_YEAR);
  // Total height of 28 years cycle
  private readonly yearsCycleHeight = reduceCycle(this.yearsCycle);

  public attach(viewport: CdkVirtualScrollViewport): void {
    this._viewport = viewport;

    // Here is "7" is number of "cycles" in years range
    // We are rendering 200 years from 1900 to 2100
    // Year calendar repeat itself every 28 years
    // 200 / 28 = 7.14
    this._viewport.setTotalContentSize(this.yearsCycleHeight * 7);
  }

  public detach(): void {
    this._index$.complete();
    this._viewport = null;
  }

  public onContentScrolled(): void {
    if (this._viewport) {
      this._updateRenderedRange();
    }
  }

  public onDataLengthChanged(): void {}
  public onContentRendered(): void {}
  public onRenderedOffsetChanged(): void {}

  /**
   * Initial Date for render can be set on initialization step to reduce calculations
   */
  public setInitialDate(date: Date): void {
    this._initialDate = date;
  }

  /**
   * Does scroll to month with provided index
   */
  public scrollToIndex(index: number, behavior: ScrollBehavior): void {
    if (this._viewport) {
      this._viewport.scrollToOffset(this._getOffsetForIndex(index), behavior);
    }
  }

  /**
   * Does the same thing as scrollToIndex(), but for date
   */
  public scrollToDate(date: Date, behavior?: ScrollBehavior): void {
    if (this._viewport) {
      this._viewport.scrollToOffset(this._getOffsetForDate(date), behavior);
    }
  }

  /**
   * Update the viewport's rendered range.
   */
  private _updateRenderedRange(): void {
    if (!this._viewport) {
      return;
    }

    // This is for support setInitialDate() method.
    // Should be called only once at first render
    if (this._firstTimeRender) {
      if (this._initialDate) {
        this.scrollToDate(this._initialDate);
      }

      this._firstTimeRender = false;
    }

    const currentScrollOffset = this._viewport.measureScrollOffset();
    const { start: currentStart, end: currentEnd } = this._viewport.getRenderedRange();
    const viewportSize = this._viewport.getViewportSize();
    const dataLength = this._viewport.getDataLength();
    const firstVisibleIndex = this._getIndexForOffset(currentScrollOffset);

    // Usually we are rendering a bit more months than available in view port
    // It works when user scrolls fast, so we have a bit time to render new months while will scroll over "buffer"
    // So this is why rendered top offset is different from current scroll offset
    const topScrollBuffer = currentScrollOffset - this._getOffsetForIndex(currentStart)

    let newStart = currentStart;
    let newEnd = currentEnd;

    if (topScrollBuffer < RENDER_BUFFER && currentStart !== 0) {
      // Here we have multiplication by 2 because we want to double our render buffer
      newStart = Math.max(0, this._getIndexForOffset(currentScrollOffset - RENDER_BUFFER * 2))
      newEnd = Math.min(
        dataLength,
        this._getIndexForOffset(currentScrollOffset + viewportSize + RENDER_BUFFER)
      );
    } else {
      const bottomScrollBuffer = this._getOffsetForIndex(currentEnd) - currentScrollOffset - viewportSize;

      if (bottomScrollBuffer < RENDER_BUFFER && currentEnd !== dataLength) {
        newStart = Math.max(0, this._getIndexForOffset(currentScrollOffset - RENDER_BUFFER));

        newEnd = Math.min(
          dataLength,
          // Here we have multiplication by 2 because we want to double our render buffer
          this._getIndexForOffset(currentScrollOffset + viewportSize + RENDER_BUFFER * 2)
        );
      }
    }

    this._viewport.setRenderedRange({ start: newStart, end: newEnd });
    this._viewport.setRenderedContentOffset(this._getOffsetForIndex(newStart));

    this._index$.next(firstVisibleIndex);
  }

  private _getOffsetForIndex(index: number): number {
    const month = index % 12;
    const year = (index - month) / 12;

    return this._computeHeight(year, month);
  }

  private _getIndexForOffset(offset: number): number {
    // the remaining number of pixels that cannot make up a complete cycle
    const remainder = offset % this.yearsCycleHeight;
    const numberOfFullCycles  = (offset - remainder) / this.yearsCycleHeight;
    const years = numberOfFullCycles * 28; // years from START_CYCLE_YEAR to current offset

    let heightAccumulator = 0;

    // Cycle through every year and month in 28 year cycle
    for (let year = 0; year < this.yearsCycle.length; year++) {
      for (let month = 0; month < this.yearsCycle[year].length; month++) {
        heightAccumulator += this.yearsCycle[year][month];

        if (heightAccumulator - this.yearsCycle[year][month] / 2 > remainder) {
          return Math.max((years + year) * 12 + month, 0);
        }
      }
    }

    return YEARS_TO_BE_RENDERED;
  }

  private _getOffsetForDate(date: Date): number {
    if (!date) {
      return 0;
    }

    const year = date.getFullYear();
    const month = date.getMonth();
    const index = (year - START_CYCLE_YEAR) * 12 + month;

    return this._getOffsetForIndex(index);
  }

  // Compute height for given year and month, but year starts from 0 to YEARS_TO_BE_RENDERED
  private _computeHeight(year: number, month?: number): number {
    const remainder = year % 28; // number of year in cycle of 28 repeated years
    const remainderHeight = reduceCycle(this.yearsCycle, remainder, month);
    const fullCycles = (year - remainder) / 28;
    const fullCyclesHeight = fullCycles * this.yearsCycleHeight;

    return fullCyclesHeight + remainderHeight;
  }
}
