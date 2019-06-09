import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';


export class FsDateDialogRef {

  private _value$ = new Subject();

  constructor(private overlayRef: OverlayRef) { }

  public get value$() {
    return this._value$.asObservable();
  }

  public updateValue(value) {
    this._value$.next(value);
  }

  public close(): void {
    this.overlayRef.dispose();
  }
}
