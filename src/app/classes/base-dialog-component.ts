import { HostListener, OnDestroy } from '@angular/core';
import { FsDateDialogRef } from '../classes/date-dialog-ref';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FsDatePickerBaseComponent } from '../classes/base-component';


export class FsDatePickerBaseDialogComponent implements OnDestroy {

  protected _destroy$ = new Subject();

  constructor(protected _dialogRef: FsDateDialogRef,
              protected parentComponent: FsDatePickerBaseComponent) {

    this._dialogRef.overlayRef
      .backdropClick()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.close();
      });
  }

  public close($event?) {
    this._dialogRef.close();
  }

  @HostListener('document:keydown', ['$event'])
  private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this._dialogRef.close();
    }
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
