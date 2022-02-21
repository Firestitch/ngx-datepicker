import { CollectionViewer, DataSource } from '@angular/cdk/collections';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import {
  YEARS_TO_BE_RENDERED,
  START_CYCLE_YEAR
} from './calendar-scroll-strategy';


export class FsCalendarDataSource extends DataSource<Date> {

  private _cachedMonths: Date[] = [];
  private _fetchedPages = new Set<number>();

  private readonly _dataStream = new BehaviorSubject<Date[]>(this._cachedMonths);
  private readonly _subscription = new Subscription();

  constructor() {
    super();

    this._prepareMonthsList();
    this._dataStream.next(this._cachedMonths);
  }

  public connect(collectionViewer: CollectionViewer): Observable<Date[]> {
    const sub = collectionViewer
      .viewChange
      .subscribe((range) => {
        for (let i = range.start; i <= range.end; i++) {
          this._fetchPage(i);
        }
      });

    this._subscription.add(sub);

    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private _fetchPage(page: number) {
    if (this._fetchedPages.has(page)) {
      return;
    }

    this._fetchedPages.add(page);

    const yearOffset = Math.floor(page / 12);
    const monthOffset = page % 12;

    const month = new Date(
      yearOffset + START_CYCLE_YEAR,
      monthOffset,
      1
    );

    this._cachedMonths.splice(
      page,
      1,
      month,
    );

    this._dataStream.next(this._cachedMonths);
  }

  private _prepareMonthsList(): void {
    this._cachedMonths = Array
      .from(
        {length: YEARS_TO_BE_RENDERED * 12 }, // number of rendered years multiply by number of months in year
        (_, i) => {
          return new Date(Math.floor(i / 12) + START_CYCLE_YEAR, i % 12, 1);
        }
      );

  }
}
