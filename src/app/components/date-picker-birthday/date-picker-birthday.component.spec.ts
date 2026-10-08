import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { addDays, format, subYears } from 'date-fns';

import { FsDatePickerDialogModule } from '../../../libs/dialog/dialog.module';

import { FsDatePickerBirthdayComponent } from './date-picker-birthday.component';


@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FsDatePickerBirthdayComponent,
  ],
  template: `
    <mat-form-field>
      <input matInput fsDatePickerBirthday [formControl]="control">
    </mat-form-field>
  `,
})
class HostComponent {
  public control = new FormControl<Date | null>(null);
}


describe('FsDatePickerBirthdayComponent typed bounds', () => {

  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let input: HTMLInputElement;

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
    fixture.detectChanges();

    input = fixture.nativeElement.querySelector('input');
  });

  function blur(value: string): void {
    input.value = value;
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  }

  it('refuses a typed date after today', fakeAsync(() => {
    blur(format(addDays(new Date(), 1), 'MMM d, yyyy'));
    tick();

    expect(host.control.errors).toEqual({ fsDatepickerMax: 'Cannot be in the future' });
  }));

  it('refuses a typed date in a year the wheel does not offer', fakeAsync(() => {
    blur(`Jan 1, ${new Date().getFullYear() + 1}`);
    tick();

    expect(host.control.errors).toEqual({ fsDatepickerMax: 'Cannot be in the future' });
  }));

  it('accepts today', fakeAsync(() => {
    blur(format(new Date(), 'MMM d, yyyy'));
    tick();

    expect(host.control.valid).toBeTrue();
  }));

  it('accepts a past date', fakeAsync(() => {
    blur(format(subYears(new Date(), 30), 'MMM d, yyyy'));
    tick();

    expect(host.control.valid).toBeTrue();
  }));

  it('flags a stored future date when it is loaded', () => {
    host.control.setValue(addDays(new Date(), 1));
    fixture.detectChanges();

    expect(host.control.errors).toEqual({ fsDatepickerMax: 'Cannot be in the future' });
  });

});
