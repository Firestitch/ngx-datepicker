import { Directive, Input, Output, Inject, HostListener, ComponentFactoryResolver, ViewContainerRef,
   Renderer2, ElementRef, EventEmitter, Pipe, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { DATEPICKER_RANGE_VALUE_ACCESSOR } from './../value-accessors/fsdatepickerrange.value-accessors';
import { FsDatepickerRangeFactory } from './../services/fsdatepickerrangefactory.service';
import { FsPreset } from './../interfaces/fspreset.interface';
import { NgModel } from '@angular/forms';
import { FsDatePickerCommon } from './../services/fsdatepickercommon.service';
import { FsDatePickerBaseDirective } from './../classes/fsdatepickerbase.directive';
import * as moment from 'moment-timezone';


@Directive({
    host: {
      '(input)': 'onChangeInterceptor($event)',
      '(click)': 'inputClick($event)',
      '(keyup)': 'inputKeyup($event)',
      '(blur)': 'inputBlur($event)',
    },
    selector: '[fsDatePickerRange]',
    providers: [DATEPICKER_RANGE_VALUE_ACCESSOR, NgModel]
})
export class FsDatePickRangeDirective extends FsDatePickerBaseDirective implements OnInit, OnChanges, OnDestroy {

    @Input() public ngModel = null;
    @Input() public minYear = null;
    @Input() public maxYear = null;
    @Input() public view = 'date';
    @Input() public ngModelStart = null;
    @Input() public ngModelEnd = null;
    @Input() public minDate = null;
    @Input() public maxDate = null;
    @Input() public presets: FsPreset[] = [];

    @Output() public ngModelStartChange = new EventEmitter<any>();
    @Output() public ngModelEndChange = new EventEmitter<any>();
    @Output('change') public change$ = new EventEmitter<any>();

    private rootViewContainer = null;
    private onTouchedCallback: () => void = () => { };
    private onChangeCallback: (_: any) => void = () => { };

    registerOnChange(fn: any) {
      this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
       this.onTouchedCallback = fn;
    }

    constructor(
        @Inject(ElementRef) private _elementRef: ElementRef,
        @Inject(ComponentFactoryResolver) private factoryResolver,
        @Inject(ViewContainerRef) private viewContainerRef,
        private fsDatePickerCommon: FsDatePickerCommon,
        private fsDatepickerRangeFactory: FsDatepickerRangeFactory,
        protected renderer: Renderer2
    ) {
      super(renderer);
     }

    ngOnInit() {

      const formField = this._elementRef.nativeElement.parentElement.parentElement.parentElement.parentElement;

      if (formField.className.match(/mat-form-field/)) {

        this.renderer.addClass(formField, `fs-date-picker-${this.view}-range-field`);
      }

      this.fsDatePickerCommon.addClear(this.renderer, this._elementRef.nativeElement,
        event => {
          event.stopPropagation();
          this.writeValue(null, null);
        },
        () => {
          this.fsDatePickerCommon.updateClearViewStatus({ start: this.ngModelStart, end: this.ngModelEnd }
          , this.renderer, this._elementRef.nativeElement);
        }
      );

      setTimeout(() => {
        this._elementRef.nativeElement.setAttribute('readonly', true);
      });
    }

    ngOnChanges(changes) {

      if (!changes) {
        return;
      }

      if (changes.ngModelStart || changes.ngModelEnd) {

        // In models shouldn't be undefined. Initial value always null.
        this.ngModelStart = this.ngModelStart || null;
        this.ngModelEnd = this.ngModelEnd || null;

        if (typeof this.ngModelStart === 'string' || typeof this.ngModelEnd === 'string') {
          setTimeout(() => {
            this.writeValue(this.ngModelStart, this.ngModelEnd);
          });
          return;
        }

        const viewData = { start: this.ngModelStart, end: this.ngModelEnd };
        const ngModelData = !this.ngModelStart && !this.ngModelEnd ? null : viewData;

        this.onChangeCallback(ngModelData);
        this._elementRef.nativeElement.value = this.fsDatePickerCommon.formatDateTimeRange(viewData, this.view);
        this.change$.emit(viewData);
        this.fsDatePickerCommon.updateClearViewStatus(viewData, this.renderer, this._elementRef.nativeElement);
      }
    }

    writeValue(startDate, endDate): void {
      // Don't remove this code. After ngModel implementation value accessor call this function on init
      // and removing initial value of the picker.
      // If second parameter is undefined it means that function was called by ngModel and should be
      // ignored.
      if (endDate === undefined) {
        return;
      }

      this.ngModelStartChange.emit(startDate && moment(startDate).isValid() ? moment(startDate) : startDate);
      this.ngModelEndChange.emit(endDate && moment(endDate).isValid() ? moment(endDate) : endDate);
    }

    protected open() {
      super.open();

      if (this.dialog) {
        this.enableDefaultComponent();
        return;
      }

      this.fsDatepickerRangeFactory.setRootViewContainerRef(this.viewContainerRef);
      this.dialog = this.fsDatepickerRangeFactory.addDynamicComponent();
      this.dialog.instance.parentDirective = this;

      this.dialog.instance.fsDatePickerModel.view = this.view;
      this.dialog.instance.fsDatePickerModel.minYear = this.minYear;
      this.dialog.instance.fsDatePickerModel.maxYear = this.maxYear;
      this.dialog.instance.fsDatePickerModel.presets = this.presets;
      this.dialog.instance.fsDatePickerModel.minDate = this.minDate;
      this.dialog.instance.fsDatePickerModel.maxDate = this.maxDate;
      this.dialog.instance.fsDatePickerModel.dateMode = { start: 'date', end: 'date' };

      this.enableDefaultComponent();

      setTimeout(() => {
        this.fsDatePickerCommon.positionDialog(this.dialog, this._elementRef);
      });
    }

    protected clear() {
      this.writeValue(null, null);
    }

    private enableDefaultComponent() {
      if (this.view === 'time') {
        this.dialog.instance.fsDatePickerModel.components = { timeStart: true };
      } else {
        this.dialog.instance.fsDatePickerModel.components = { calendarStart: true, calendarEnd: true };
      }
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
