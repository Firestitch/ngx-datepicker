import { Directive, Input, Output, Inject, HostListener, ComponentFactoryResolver, ViewContainerRef,
   Renderer, ElementRef, EventEmitter, Pipe, OnInit, OnDestroy } from '@angular/core';
import { DATEPICKER_RANGE_VALUE_ACCESSOR } from './../value-accessors/fsdatepickerrange.value-accessors';
import { FsDatepickerComponent } from './../components/fsdatepicker/fsdatepicker.component';
import { FsDatepickerRangeFactory } from './../services/fsdatepickerrangefactory.service';
import { FsDatePickerCommon } from './../services/fsdatepickercommon.service';
import * as moment from 'moment-timezone';

@Directive({
    host: {
      '(input)': 'onChangeInterceptor($event)',
      '(click)': 'inputClick($event)',
      '(keyup)': 'inputKeyup($event)',
      '(blur)': 'inputBlur($event)',
    },
    selector: '[fsDatePickerRange]',
    providers: [DATEPICKER_RANGE_VALUE_ACCESSOR]
})
export class FsDatePickRangeDirective implements OnInit, OnDestroy {

    @Input() minYear;
    @Input() maxYear;
    @Input() view = 'date';

    @Output('change') change$ = new EventEmitter<any>();

    private _model = null;

    opened = false;

    private $dialog = null;

    private rootViewContainer = null;

    _onTouched = () => { };
    _onChange = (value: any) => { };
    onFocused = (event: any) => { };

    registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
    registerOnTouched(fn: () => any): void { this._onTouched = fn }

    constructor(
        @Inject(ElementRef) private _elementRef: ElementRef,
        @Inject(Renderer) private renderer: Renderer,
        @Inject(ComponentFactoryResolver) private factoryResolver,
        @Inject(ViewContainerRef) private viewContainerRef,
        private fsDatePickerCommon: FsDatePickerCommon,
        private fsDatepickerRangeFactory: FsDatepickerRangeFactory
    ) { }

    ngOnInit() {
    }

    onChangeInterceptor($event) {
      this.writeValue($event.target.value);
    }

    writeValue(value: any): void {
      console.log(value);

        value = Object.assign({ start_date: null, end_date: null }, value);

        if (moment(value.start_date).isValid()) {
          value.start_date = moment(value.start_date);
        }

        if (moment(value.end_date).isValid()) {
          value.end_date = moment(value.end_date);
        }

        this._model = value;

        this._onChange(value);
        this._elementRef.nativeElement.value = this.fsDatePickerCommon.formatDateTimeRange(value, this.view);
        this.change$.emit(value);
    }

    getValue() {
      return this._model;
    }

    private open() {
      this.opened = true;

      if (this.$dialog) {
        return;
      }

      this.fsDatepickerRangeFactory.setRootViewContainerRef(this.viewContainerRef);
      this.$dialog = this.fsDatepickerRangeFactory.addDynamicComponent();
      this.$dialog.instance.parentInstance = this;

      this.$dialog.instance.fsDatePickerModel.view = this.view;
      this.$dialog.instance.fsDatePickerModel.minYear = this.minYear;
      this.$dialog.instance.fsDatePickerModel.maxYear = this.maxYear;
      this.$dialog.instance.fsDatePickerModel.dateMode = { start_date: 'date', end_date: 'date' };

      setTimeout(() => {
        this.fsDatePickerCommon.positionDialog(this.$dialog, this._elementRef);
      });
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

    @HostListener('window:resize', ['$event'])
    onWindowResize(event) {
      this.fsDatePickerCommon.positionDialog(this.$dialog, this._elementRef);
    }

    ngOnDestroy() {
      if (this.$dialog && this.$dialog.instance.element.nativeElement.parentNode) {
        this.$dialog.instance.element.nativeElement.parentNode.removeChild(this.$dialog.instance.element.nativeElement);
      }
    }
}
