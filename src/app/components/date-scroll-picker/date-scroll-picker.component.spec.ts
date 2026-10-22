import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { FsDatePickerDialogModule } from '../../../libs/dialog/dialog.module';

import { FsDateScrollPickerComponent } from './date-scroll-picker.component';


@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FsDateScrollPickerComponent,
  ],
  template: `
    <mat-form-field>
      <input
        matInput
        fsDateScrollPicker
        [showDay]="false"
        [editable]="editable"
        [formControl]="control">
    </mat-form-field>
  `,
})
class HostComponent {
  public editable = true;
  public control = new FormControl<Date | null>(null);
}


/**
 * The input loses focus with the picker closed whenever the user taps away
 * from it, and on mobile the bottom sheet hands focus back to the input when it
 * closes, so this happens on the very next tap after a month is selected.
 * JavaScriptCore cannot Date.parse the "MMMM yyyy" text the month picker
 * renders, so the engine parser is stubbed to NaN to reproduce that engine.
 */
describe('FsDateScrollPickerComponent blur with the picker closed', () => {

  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let input: HTMLInputElement;

  const october = new Date(2026, 9, 1);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        provideNoopAnimations(),
        ...FsDatePickerDialogModule.forRoot().providers,
      ],
    });

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;

    spyOn(Date, 'parse').and.returnValue(NaN);
  });

  function init(editable: boolean, value: Date | null): void {
    host.editable = editable;
    host.control.setValue(value);
    fixture.detectChanges();

    input = fixture.nativeElement.querySelector('input');
  }

  function blur(): void {
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  }

  it('renders the month and year', () => {
    init(false, october);

    expect(input.value).toBe('October 2026');
    expect(input.readOnly).toBeTrue();
  });

  it('keeps the value of a readonly picker', () => {
    init(false, october);

    blur();

    expect(host.control.value).toEqual(october);
    expect(input.value).toBe('October 2026');
  });

  it('keeps the value of an editable picker whose text it rendered itself', () => {
    init(true, october);

    blur();

    expect(host.control.value).toEqual(october);
    expect(input.value).toBe('October 2026');
  });

  it('commits typed month and year on an editable picker', () => {
    init(true, null);

    input.value = 'November 2026';
    blur();

    expect(host.control.value).toEqual(new Date(2026, 10, 1));
    expect(input.value).toBe('November 2026');
  });

});
