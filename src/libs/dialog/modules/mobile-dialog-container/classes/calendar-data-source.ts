import { CollectionViewer, DataSource } from '@angular/cdk/collections';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { addMonths } from 'date-fns';


export class FsCalendarDataSource extends DataSource<Date> {

  private _length = 2400;
  private _pageSize = 3;
  private _cachedData: Date[];
  private _fetchedPages = new Set<number>();

  private readonly _dataStream = new BehaviorSubject<Date[]>(this._cachedData);
  private readonly _subscription = new Subscription();

  constructor() {
    super();

    this._cached();
    this._dataStream.next(this._cachedData);
    console.log(this._cachedData);
  }

  public connect(collectionViewer: CollectionViewer): Observable<Date[]> {
    const sub = collectionViewer
      .viewChange
      .subscribe((range) => {
        const startPage = this._getPageForIndex(range.start);
        const endPage = this._getPageForIndex(range.end);

        for (let i = startPage; i <= endPage; i++) {
          this._fetchPage(i);
        }
      });

    this._subscription.add(sub);

    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);

    const requestedMonth = page * this._pageSize;
    const yearOffset = Math.floor(requestedMonth / 12);
    const monthOffset = requestedMonth - (yearOffset * requestedMonth);

    const pageData = [
      new Date(
        yearOffset + 1900,
        monthOffset,
        1
      ),
      new Date(
        yearOffset + 1900,
        monthOffset + 1,
        1
      ),
      new Date(
        yearOffset + 1900,
        monthOffset + 2,
        1
      ),
    ];

    this._cachedData.splice(
      page * this._pageSize,
      this._pageSize,
      ...pageData,
    );

    this._dataStream.next(this._cachedData);
  }

  private _cached(): void {
    this._cachedData = Array
      .from({length: 3 })
      .map((_, i) => {
        return new Date(1900, i, 1);
      })

    console.log(this._cachedData);
  }
}
