import {  Directive, Input, Inject, HostListener, ViewContainerRef, ElementRef, OnInit } from '@angular/core';
import { DATEPICKER_VALUE_ACCESSOR } from './../value-accessors/fsdatepicker.value-accessor';
import { FsDatePickerCommon } from './../services/fsdatepickercommon.service';
import { FsDatepickerBirthdayFactory } from '../services';

@Directive({
  selector: '[fsDatePickerBirthday]',
  providers: [DATEPICKER_VALUE_ACCESSOR]
})
export class FsDatePickBirthdayDirective implements OnInit {

  @Input() public minYear = null;
  @Input() public maxYear = null;
  @Input() public minDate = null;
  @Input() public maxDate = null;

  private $dialog = null;
  public opened = false;

  constructor(
    private _fsDatePickerCommon: FsDatePickerCommon,
    private _fsDatepickerBirthdayFactory: FsDatepickerBirthdayFactory,
    @Inject(ViewContainerRef) private viewContainerRef,
    private _elementRef: ElementRef,
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

  public ngOnInit() {
  }

  private open() {
    this.opened = true;

    this._fsDatepickerBirthdayFactory.setRootViewContainerRef(this.viewContainerRef);
    this.$dialog = this._fsDatepickerBirthdayFactory.addDynamicComponent();
    this.$dialog.instance.parentInstance = this;

    this.$dialog.instance.fsDatePickerModel.minYear = this.minYear;
    this.$dialog.instance.fsDatePickerModel.maxYear = this.maxYear;
    this.$dialog.instance.fsDatePickerModel.minDate = this.minDate;
    this.$dialog.instance.fsDatePickerModel.maxDate = this.maxDate;

    setTimeout(() => {
      this._fsDatePickerCommon.positionDialog(this.$dialog, this._elementRef);
    });
  }

}
