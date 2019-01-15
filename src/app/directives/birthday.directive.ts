import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  ViewContainerRef
} from '@angular/core';

import * as moment_ from 'moment';
const moment = moment_;

import { FsDatePickerBaseDirective } from '../classes/base-directive';
import { FsDatePickerCommon } from '../services/common.service';
import { FsDatepickerBirthdayFactory } from '../services/birthday-factory.service';


@Directive({
  selector: '[fsDatePickerBirthday]',
})
export class FsDatePickBirthdayDirective extends FsDatePickerBaseDirective implements OnChanges, OnDestroy {

  @Input() public minYear = null;
  @Input() public maxYear = null;
  @Input() public format = 'MMM D, YYYY';
  @Input() public ngModel = null;
  @Output() public ngModelChange = new EventEmitter<any>();

  constructor(
    protected renderer: Renderer2,
    private _fsDatePickerCommon: FsDatePickerCommon,
    private _fsDatepickerBirthdayFactory: FsDatepickerBirthdayFactory,
    private _viewContainerRef: ViewContainerRef,
    private _elementRef: ElementRef,
  ) {
    super(renderer);
  }

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
    this._fsDatePickerCommon.positionDialogUnderInput(this.dialog, this._elementRef);
  }

  public setValue(value: moment_.Moment) {
    this.ngModelChange.emit(value);
  }

  public ngOnChanges(changes) {
    if (changes.ngModel) {
      setTimeout(() => {
        this.ngModel = moment(this.ngModel);
        const newDate = this.ngModel.isValid() ? moment(this.ngModel).format(this.format) : null;
        this._elementRef.nativeElement.value = newDate;
      }, 0);
    }
  }

  public ngOnDestroy() {
    if (this.dialog && this.dialog.instance.element.nativeElement.parentNode) {
      this.dialog.instance.element.nativeElement.parentNode.removeChild(this.dialog.instance.element.nativeElement);
    }
  }

  protected open() {
    super.open();

    if (this.dialog) {
      return;
    }

    this._fsDatepickerBirthdayFactory.setRootViewContainerRef(this._viewContainerRef);
    this.dialog = this._fsDatepickerBirthdayFactory.addDynamicComponent();
    this.dialog.instance.parentDirective = this;

    setTimeout(() => {
      this._fsDatePickerCommon.positionDialogUnderInput(this.dialog, this._elementRef);
    });
  }

  protected clear() {
    this.setValue(null);
  }
}
