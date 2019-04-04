import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  Output, Provider,
  Renderer2,
  ViewContainerRef,
  Component
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


import { FsPreset } from '../../interfaces/fspreset.interface';
import { FsDatepickerFactory } from '../../services/factory.service';
import { FsDatePickerCommon } from '../../services/common.service';
import { FsDatePickerBaseComponent } from '../../classes/base-component';


export const DATEPICKER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FsDatePickerComponent),
  multi: true
};

@Component({
  selector: '[fsDatePicker]',
  template: '<fs-clear [show]="ngModel" (clear)="cleared()"></fs-clear>',
  providers: [DATEPICKER_VALUE_ACCESSOR]
})
export class FsDatePickerComponent extends FsDatePickerBaseComponent implements AfterViewInit, OnDestroy {

  @Input() public minYear = null;
  @Input() public ngModel = null;
  @Input() public maxYear = null;
  @Input() public minDate = null;
  @Input() public maxDate = null;
  @Input() public view = 'date';
  @Input() public presets: FsPreset[] = [];
  @Output('change') change$ = new EventEmitter<any>();

  _onChange = (value: any) => { };

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
  registerOnTouched(fn: () => any): void {  }

  constructor(
    protected renderer: Renderer2,
    @Inject(ElementRef) protected elementRef: ElementRef,
    @Inject(ViewContainerRef) private viewContainerRef,
    protected fsDatePickerCommon: FsDatePickerCommon,
    protected fsDatepickerFactory: FsDatepickerFactory,
  ) {
    super(renderer, elementRef, fsDatePickerCommon);
  }

  public ngAfterViewInit() {
    this.setReadonly();
  }

  public ngOnDestroy() {

    //What does this do?
    if (this.dialog && this.dialog.instance.element.nativeElement.parentNode) {
      this.dialog.instance.element.nativeElement.parentNode.removeChild(this.dialog.instance.element.nativeElement);
    }
  }

  public writeValue(value: any): void {
    this.ngModel = this.fsDatePickerCommon.createDate(value);
    this.updateInput(value);
  }

  public cleared() {
    this.updateValue(null);
  }

  public getModelValue() {
    return this.ngModel;
  }

  public updateValue(value) {
    this._onChange(value);
    this.updateInput(value);
    this.change$.emit(value);
  }

  private updateInput(value) {
    this.elementRef.nativeElement.value = this.fsDatePickerCommon.formatDateTime(value, this.view);
  }

  protected open() {
    super.open();

    if (this.dialog) {
      this.enableDefaultComponent();
      this.dialog.instance.initCalendar();
      this.positionDialog();
      return;
    }

    this.fsDatepickerFactory.setRootViewContainerRef(this.viewContainerRef);
    this.dialog = this.fsDatepickerFactory.addDynamicComponent();
    this.dialog.instance.parentDirective = this;

    this.dialog.instance.fsDatePickerModel.view = this.view;
    this.dialog.instance.fsDatePickerModel.minYear = this.minYear;
    this.dialog.instance.fsDatePickerModel.maxYear = this.maxYear;
    this.dialog.instance.fsDatePickerModel.minDate = this.minDate;
    this.dialog.instance.fsDatePickerModel.maxDate = this.maxDate;
    this.dialog.instance.fsDatePickerModel.presets = this.presets;
    this.dialog.instance.fsDatePickerModel.dateMode = 'date';

    this.enableDefaultComponent();
    this.positionDialog();
  }

  private positionDialog() {
    setTimeout(() => {
      this.fsDatePickerCommon.positionDialog(this.dialog, this.elementRef);
    });
  }

  private enableDefaultComponent() {
    if (this.view === 'time') {
      this.dialog.instance.fsDatePickerModel.components = { timeStart: true };
    } else {
      this.dialog.instance.fsDatePickerModel.components = { calendarStart: true };
    }
  }
}
