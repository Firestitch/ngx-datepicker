import {
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  ViewContainerRef,
  Component,
  Injector,
} from '@angular/core';

import { date } from '@firestitch/date';

import { FsDatePickerBaseComponent } from '../../classes/base-component';
import { FsDatePickerCommon } from '../../services/common.service';
import { FsDatepickerFactory } from '../../services/factory.service';


@Component({
  template: '<fs-clear [show]="ngModel" (clear)="cleared()"></fs-clear>',
  selector: '[fsDatePickerBirthday]',
})
export class FsDatePickerBirthdayComponent extends FsDatePickerBaseComponent implements OnChanges, OnDestroy {

  @Input() public minYear = null;
  @Input() public maxYear = null;
  @Input() public format = 'MMM d, yyyy';

  private _ngModel = null;
  @Input() public set ngModel(value) {
    this._ngModel = date(value);
    this._updateDialogDate();
  };
  public get ngModel() {
    return this._ngModel;
  }
  @Output() public ngModelChange = new EventEmitter<any>();

  constructor(
    protected renderer: Renderer2,
    protected _fsDatePickerCommon: FsDatePickerCommon,
    protected _injector: Injector,
    private fsDatepickerFactory: FsDatepickerFactory,
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
    this._updateDialogDate();
  }

  public ngOnDestroy() {
    if (this.dialog && this.dialog.instance.element.nativeElement.parentNode) {
      this.dialog.instance.element.nativeElement.parentNode.removeChild(this.dialog.instance.element.nativeElement);
    }
  }

  protected open() {
    super.open();

    if (!this.dialog) {
      this.fsDatepickerFactory.openBirthDayPicker(
        this.elementRef,
        this._injector,
        {
          parentDirective: this,
        }
      );
    }

    // Calculate position each time on dialog open. Template can be dynamic
    setTimeout(() => {
      // this._fsDatePickerCommon.positionDialogUnderInput(this.dialog, this._elementRef);
    });
  }

  private _updateDialogDate() {
    if (this.dialog && this.dialog.instance) {
      setTimeout(() => {
        this.dialog.instance.setSelectedDate();
      });
    }
  }

}
