import {
  Directive,
  effect,
  ElementRef,
  input,
  inject,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl, NgForm, NgModel } from '@angular/forms';

import { MatFormFieldControl } from '@angular/material/form-field';

import { Observable, Subject } from 'rxjs';

import { IDatePresetRange } from '../../../libs/common/interfaces/date-preset.interface';


let nextId = 0;

/**
 * The control inside `<fs-date-range-field>`: what mat-form-field draws its focus and
 * error outline around, and the one control the page's form sees.
 *
 * Its value is the range once both ends are set and null until then, so the
 * plain required check is what makes a required range need both ends.
 *
 * The dates themselves live on the component's `from` and `to` models; this
 * only reports them to the form. That is why `writeValue()` does nothing — the
 * value the form writes back is always the one the component just bound.
 */
@Directive({
  selector: '[fsDateRangeControl]',
  exportAs: 'fsDateRangeControl',
  standalone: true,
  providers: [
    { provide: MatFormFieldControl, useExisting: FsDateRangeControlDirective },
  ],
  host: {
    '[attr.id]': 'id',
  },
})
export class FsDateRangeControlDirective
implements ControlValueAccessor, MatFormFieldControl<IDatePresetRange> {

  public readonly requiredInput = input(false, { alias: 'required' });
  public readonly emptyInput = input(true, { alias: 'empty' });
  public readonly focusedInput = input(false, { alias: 'focused' });

  public readonly id = `fs-date-range-${nextId++}`;
  public readonly controlType = 'fs-date-range';
  public readonly placeholder = '';
  public readonly shouldLabelFloat = true;
  public readonly ngControl = inject(NgControl, { self: true });
  public errorState = false;

  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private _stateChanges = new Subject<void>();
  private _disabled = signal(false);
  private _onChange: (value: IDatePresetRange | null) => void;
  private _onTouched: () => void;

  constructor() {
    this.ngControl.valueAccessor = this;

    // mat-form-field only re-reads focus (the thick outline) on stateChanges.
    effect(() => {
      this.focusedInput();
      this.emptyInput();
      this.requiredInput();
      this._disabled();
      this._stateChanges.next();
    });
  }

  public get stateChanges(): Observable<void> {
    return this._stateChanges.asObservable();
  }

  public get value(): IDatePresetRange | null {
    return this.ngControl.value;
  }

  public get required(): boolean {
    return this.requiredInput();
  }

  public get empty(): boolean {
    return this.emptyInput();
  }

  public get focused(): boolean {
    return this.focusedInput();
  }

  public get disabled(): boolean {
    return this._disabled();
  }

  /**
   * Same rule fs-form uses to show its message — invalid, and either changed or
   * submitted — so the red outline and the message come and go together.
   * Called from the host's DoCheck, since a submit happens outside this view.
   */
  public updateErrorState(): void {
    const control = this.ngControl.control;
    const form = (this.ngControl as NgModel).formDirective as NgForm | null;
    const errorState = !!control?.invalid && (control.dirty || !!form?.submitted);

    if (errorState !== this.errorState) {
      this.errorState = errorState;
      this._stateChanges.next();
    }
  }

  public notifyChange(value: IDatePresetRange | null): void {
    this._onChange?.(value);
    this._onTouched?.();
  }

  public writeValue(): void {
    // The component's from/to models drive what is shown; see the class comment.
  }

  public registerOnChange(fn: (value: IDatePresetRange | null) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  /**
   * Written straight to the element, as MatInput does. mat-form-field calls this
   * from its stateChanges handler, which runs inside the effect above, where a
   * signal write is not allowed.
   */
  public setDescribedByIds(ids: string[]): void {
    if (ids.length) {
      this._elementRef.nativeElement.setAttribute('aria-describedby', ids.join(' '));
    } else {
      this._elementRef.nativeElement.removeAttribute('aria-describedby');
    }
  }

  public onContainerClick(): void {
    // Each end is its own click target, so a click on the field itself opens nothing.
  }

}
