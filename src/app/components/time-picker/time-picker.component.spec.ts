import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { isValid } from 'date-fns';

import { FsDatePickerDialogModule } from '../../../libs/dialog/dialog.module';
import { FsRangePickerStoreService } from '../../services/range-picker-store.service';

import { FsTimePickerComponent } from './time-picker.component';


@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FsTimePickerComponent,
  ],
  template: `
    <mat-form-field>
      <input matInput fsTimePicker [formControl]="control">
    </mat-form-field>
  `,
})
class HostComponent {
  public control = new FormControl<Date | null>(null);
}


describe('FsTimePickerComponent blur', () => {

  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        provideNoopAnimations(),
        ...FsDatePickerDialogModule.forRoot().providers,
        FsRangePickerStoreService,
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

  it('retains a typed 12-hour time on blur', fakeAsync(() => {
    blur('3:30 PM');
    tick();

    const value = host.control.value;

    expect(value).toBeTruthy();
    expect(isValid(value)).toBeTrue();
    expect(value.getHours()).toBe(15);
    expect(value.getMinutes()).toBe(30);
    expect(input.value).toBeTruthy(); // not blanked
  }));

  it('retains an hour-only pm shorthand on blur', fakeAsync(() => {
    blur('3pm');
    tick();

    const value = host.control.value;

    expect(value).toBeTruthy();
    expect(value.getHours()).toBe(15);
    expect(value.getMinutes()).toBe(0);
  }));

  it('retains a bare 24-hour number on blur', fakeAsync(() => {
    blur('3');
    tick();

    const value = host.control.value;

    expect(value).toBeTruthy();
    expect(value.getHours()).toBe(3);
    expect(value.getMinutes()).toBe(0);
  }));

  it('clears on blur when input emptied', fakeAsync(() => {
    blur('3:30 PM');
    tick();
    expect(host.control.value).toBeTruthy();

    blur('');
    tick();

    expect(host.control.value).toBeNull();
    expect(input.value).toBeFalsy();
  }));

  it('clears on blur for unparseable input', fakeAsync(() => {
    blur('zzz');
    tick();

    expect(host.control.value).toBeNull();
    expect(input.value).toBeFalsy();
  }));

});
