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
  Component,
  Injector,
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

  private _hideClearButton: boolean = null;
  @Input() public set hideClearButton(value: boolean) {

    this._hideClearButton = value;

    this._hideClearButton ?
      this.fsDatePickerCommon.addClass(this.elementRef.nativeElement.parentNode.parentNode, 'hide-clear') :
      this.fsDatePickerCommon.removeClass(this.elementRef.nativeElement.parentNode.parentNode, 'hide-clear');
  }
  public get hideClearButton(): boolean {
    return this._hideClearButton;
  }

  @Output('change') change$ = new EventEmitter<any>();

  _onChange = (value: any) => { };

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
  registerOnTouched(fn: () => any): void {  }

  constructor(
    protected renderer: Renderer2,
    protected injector: Injector,
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

    // What does this do?
    // As I know otherwise, when you leave page with datepicker - dialog still in the DOM
    // and appears memory leaks
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
      // this.enableDefaultComponent();
      this.dialog.instance.initCalendar();
      return;
    }

    this.fsDatepickerFactory.openDatePicker(
      this.elementRef,
      this.injector,
      {
        elementRef: this.elementRef,
        parentDirective: this,
        view: this.view,
        minYear: this.minYear,
        maxYear: this.maxYear,
        minDate: this.minDate,
        maxDate: this.maxDate,
        presets: this.presets,
        dateMode: 'date',
        components: this._getDefaultComponents(),
      }
    );
  }

  private _getDefaultComponents() {
    if (this.view === 'time') {
      return { timeStart: true };
    } else {
      return { calendarStart: true };
    }
  }

}
