import { Renderer2, HostListener, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

import { FsDatePickerBirthdayDialogComponent } from '../components/birthday-dialog/birthday-dialog.component';
import { FsDateDialogRef } from './date-dialog-ref';


export abstract class FsDatePickerBaseComponent {

  public opened = false;
  protected dialog = null;
  protected elementRef;
  protected renderer;

  protected _dateDialogRef: FsDateDialogRef;

  protected _destroy$ = new Subject();

  @HostListener('click', ['$event'])
  public inputClick(event) {
    this.open();
  }

  @HostListener('focus', ['$event'])
  public onFocus($event) {
    setTimeout(() => {
      this.elementRef.nativeElement.blur();
    });
  }

  @HostListener('window:resize', ['$event'])
  public onWindowResize(event) {
    if (!this.dialog) {
      return;
    }

    if (this.dialog.instance instanceof FsDatePickerBirthdayDialogComponent) {
      // this.fsDatePickerCommon.positionDialogUnderInput(this.dialog, this.elementRef);
      return;
    }

    // this.fsDatePickerCommon.positionDialog(this.dialog, this.elementRef);
  }

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
  ) {
    this.renderer = renderer;
    this.elementRef = elementRef;
  }

  protected open() {
    this.renderer.addClass(document.body, 'fs-date-picker-open');
    this.opened = true;
  }

  protected close() {
    if (this._dateDialogRef) {
      this._dateDialogRef.close();
    }
  }

  protected setReadonly() {
    setTimeout(() => {
      this.elementRef.nativeElement.setAttribute('readonly', true);
    });
  }

}
