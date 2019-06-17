import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';


export class FsDateDialogRef {

  public positionStrategy;

  private _close$ = new Subject();
  private _value$ = new Subject();

  constructor(private _overlayRef: OverlayRef) { }

  public get overlayRef() {
    return this._overlayRef;
  }

  public get value$() {
    return this._value$.asObservable();
  }

  public get close$() {
    return this._close$.asObservable();
  }

  public updateValue(value) {
    this._value$.next(value);
  }

  public close(): void {
    this._close$.next();
    this._close$.complete();
    this._value$.complete();

    this._overlayRef.dispose();
  }
}
