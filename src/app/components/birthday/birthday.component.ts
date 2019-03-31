import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  ViewContainerRef,
  Component
} from '@angular/core';

import { format, isDate, isValid } from 'date-fns';

import { FsDatePickerBaseComponent } from '../../classes/base-component';
import { FsDatePickerCommon } from '../../services/common.service';
import { FsDatepickerBirthdayFactory } from '../../services/birthday-factory.service';


@Component({
  template: '<fs-clear [show]="ngModel" (clear)="cleared()"></fs-clear>',
  selector: '[fsDatePickerBirthday]',
})
export class FsDatePickerBirthdayComponent extends FsDatePickerBaseComponent implements OnChanges, OnDestroy {

  @Input() public minYear = null;
  @Input() public maxYear = null;
  @Input() public format = 'MMM d, yyyy';
  @Input() public ngModel = null;
  @Output() public ngModelChange = new EventEmitter<any>();

  constructor(
    protected renderer: Renderer2,
    protected _fsDatePickerCommon: FsDatePickerCommon,
    private _fsDatepickerBirthdayFactory: FsDatepickerBirthdayFactory,
    private _viewContainerRef: ViewContainerRef,
    private _elementRef: ElementRef,
  ) {
    super(renderer, _elementRef, _fsDatePickerCommon);
  }

  public setValue(value: Date) {
    this.ngModelChange.emit(value);
  }

  public ngOnChanges(changes) {
    if (changes.ngModel) {
      setTimeout(() => {
        this._elementRef.nativeElement.value = this._fsDatePickerCommon.formatDateTime(this.ngModel);
      });
    }
  }

  public cleared() {
    this.setValue(null);
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
