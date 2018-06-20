import {
  Directive, Input, HostListener, ViewContainerRef,
  ElementRef, OnChanges, EventEmitter, Output, OnDestroy,
} from '@angular/core';
import { FsDatePickerCommon } from './../services/fsdatepickercommon.service';
import { FsDatepickerBirthdayFactory } from '../services';

import * as moment from 'moment';

@Directive({
  selector: '[fsDatePickerBirthday]',
})
export class FsDatePickBirthdayDirective implements OnChanges, OnDestroy {

  @Input() public minYear = null;
  @Input() public maxYear = null;
  @Input() public format = 'MMM D, YYYY';
  @Input() public ngModel = null;
  @Output() public ngModelChange = new EventEmitter<any>();

  private _dialog = null;
  public opened = false;

  constructor(
    private _fsDatePickerCommon: FsDatePickerCommon,
    private _fsDatepickerBirthdayFactory: FsDatepickerBirthdayFactory,
    private _viewContainerRef: ViewContainerRef,
    private _elementRef: ElementRef
  ) { }

  @HostListener('focus')
  public onFocus() {
    setTimeout(() => {
      this._elementRef.nativeElement.blur();
    });
  }

  @HostListener('click', ['$event'])
  public inputClick(event) {
    this._fsDatePickerCommon.inputClick(event, () => {
      this.open();
    });
  }

  @HostListener('window:resize', ['$event'])
  public onWindowResize(event) {
    this._fsDatePickerCommon.positionDialogUnderInput(this._dialog, this._elementRef);
  }

  public setValue(value: moment.Moment) {
    this.ngModelChange.emit(value);
  }

  public ngOnChanges(changes) {
    if (changes.ngModel && !changes.ngModel.firstChange) {
      setTimeout(() => {
        const newDate = this.ngModel.isValid() ? moment(this.ngModel).format(this.format) : null;
        this._elementRef.nativeElement.value = newDate;
      }, 0);
    }
  }

  public ngOnDestroy() {
    if (this._dialog) {
      this._dialog.remove();
    }
  }

  private open() {
    this.opened = true;

    if (this._dialog) {
      return;
    }

    this._fsDatepickerBirthdayFactory.setRootViewContainerRef(this._viewContainerRef);
    this._dialog = this._fsDatepickerBirthdayFactory.addDynamicComponent();
    this._dialog.instance.parentInstance = this;

    setTimeout(() => {
      this._fsDatePickerCommon.positionDialogUnderInput(this._dialog, this._elementRef);
    });
  }

}
