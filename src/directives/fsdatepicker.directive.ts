import {  Directive, Input, Output, Inject, HostListener, ComponentFactoryResolver, ViewContainerRef,
          Renderer2, ElementRef, EventEmitter, Pipe, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DATEPICKER_VALUE_ACCESSOR } from './../value-accessors/fsdatepicker.value-accessor';
import { FsPreset } from './../interfaces/fspreset.interface';
import { FsDatepickerFactory } from './../services/fsdatepickerfactory.service';
import { FsDatePickerCommon } from './../services/fsdatepickercommon.service';
import { FsDatePickerBaseDirective } from './../classes/fsdatepickerbase.directive';
import * as moment from 'moment-timezone';


@Directive({
    host: {
      '(input)': 'onChangeInterceptor($event)',
      '(click)': 'inputClick($event)',
      '(keyup)': 'inputKeyup($event)',
      '(blur)': 'inputBlur($event)'
    },
    selector: '[fsDatePicker]',
    providers: [DATEPICKER_VALUE_ACCESSOR]
})
export class FsDatePickDirective extends FsDatePickerBaseDirective implements AfterViewInit, OnDestroy {

    @Input() public minYear = null;
    @Input() public maxYear = null;
    @Input() public minDate = null;
    @Input() public maxDate = null;
    @Input() public view = 'date';
    @Input() public birthday = false;
    @Input() public presets: FsPreset[] = [];

    @Output('change') change$ = new EventEmitter<any>();

    _onTouched = () => { };
    _onChange = (value: any) => { };
    onFocused = (event: any) => { };

    registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
    registerOnTouched(fn: () => any): void { this._onTouched = fn }

    constructor(
        @Inject(ElementRef) private _elementRef: ElementRef,
        @Inject(ComponentFactoryResolver) private factoryResolver,
        @Inject(ViewContainerRef) private viewContainerRef,
        private fsDatePickerCommon: FsDatePickerCommon,
        private fsDatepickerFactory: FsDatepickerFactory,
        protected renderer: Renderer2
    ) {
      super(renderer);
     }

    ngAfterViewInit() {

      if (this.birthday) {
        this.maxDate = moment().add(1, 'days');
      }

      this.fsDatePickerCommon.addClear(this.renderer, this._elementRef.nativeElement,
        event => {
          event.stopPropagation();
          this.writeValue(null);
        },
        () => {
          this.fsDatePickerCommon.updateClearViewStatus(this.getValue(), this.renderer, this._elementRef.nativeElement);
        }
      );

      setTimeout(() => {
        this._elementRef.nativeElement.setAttribute('readonly', true);
      });
    }

    onChangeInterceptor($event) {
      this.writeValue($event.target.value);
    }

    writeValue(value: any): void {

      value = value || null;

      if (value && moment(value).isValid()) {
        value = moment(value);
      }

      if (this.model !== value) {
        this._onChange(value);
      }

      this.model = value;
      this._elementRef.nativeElement.value = this.fsDatePickerCommon.formatDateTime(value, this.view);
      this.change$.emit(value);

      this.fsDatePickerCommon.updateClearViewStatus(value, this.renderer, this._elementRef.nativeElement);
    }

    getValue() {
      return this.model ? moment(this.model) : this.model;
    }

    protected open() {
      super.open();

      if (this.dialog) {
        this.enableDefaultComponent();
        this.dialog.instance.initCalendar();
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

      setTimeout(() => {
        this.fsDatePickerCommon.positionDialog(this.dialog, this._elementRef);
      });
    }

    private enableDefaultComponent() {
      if (this.view === 'time') {
        this.dialog.instance.fsDatePickerModel.components = { timeStart: true };
      } else {
        this.dialog.instance.fsDatePickerModel.components = { calendarStart: true };
      }
    }

    protected clear() {
      this.writeValue(null);
    }

    private inputClick(e) {
      this.fsDatePickerCommon.inputClick(e, () => {
        this.open();
      });
    }

    inputKeyup(e) {
      if (e.keyCode === 13) {
        this.inputBlur(e);
      }
    }

    inputBlur(event) { }

    @HostListener('focus', ['$event'])
    onFocus($event) {
      setTimeout(() => {
        this._elementRef.nativeElement.blur();
      });
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize(event) {
      this.fsDatePickerCommon.positionDialog(this.dialog, this._elementRef);
    }

    ngOnDestroy() {
      if (this.dialog && this.dialog.instance.element.nativeElement.parentNode) {
        this.dialog.instance.element.nativeElement.parentNode.removeChild(this.dialog.instance.element.nativeElement);
      }
    }
}
