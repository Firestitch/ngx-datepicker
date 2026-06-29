import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { isValid } from 'date-fns';

import { FsDatePickerDialogModule } from '../../../libs/dialog/dialog.module';
import { FsRangePickerStoreService } from '../../services/range-picker-store.service';

import { TimeRangePickerFromComponent } from './from/time-range-picker-from.component';
import { TimeRangePickerToComponent } from './to/time-range-picker-to.component';


@Component({
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TimeRangePickerFromComponent,
    TimeRangePickerToComponent,
  ],
  template: `
    <mat-form-field>
      <input matInput fsTimeRangeFromPicker="timerange" [(ngModel)]="startDate" name="from">
    </mat-form-field>
    <mat-form-field>
      <input matInput fsTimeRangeToPicker="timerange" [(ngModel)]="endDate" name="to">
    </mat-form-field>
  `,
})
class HostComponent {
  public startDate: Date | null = new Date('2015-10-10 09:00');
  public endDate: Date | null = new Date('2015-10-10 17:00');
}


describe('Time-view range picker blur', () => {

  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let fromInput: HTMLInputElement;

  beforeEach(fakeAsync(() => {
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
    tick();

    fromInput = fixture.nativeElement.querySelectorAll('input')[0];
  }));

  function blur(value: string): void {
    fromInput.value = value;
    fromInput.dispatchEvent(new Event('input'));
    fromInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  }

  it('retains a typed time on a time-range field blur', fakeAsync(() => {
    blur('3:30 PM');
    tick();

    const value = host.startDate;

    expect(value).toBeTruthy();
    expect(isValid(value)).toBeTrue();
    expect(value.getHours()).toBe(15);
    expect(value.getMinutes()).toBe(30);
  }));

  it('clears on blur for unparseable range input', fakeAsync(() => {
    blur('zzz');
    tick();

    expect(host.startDate).toBeNull();
  }));

});
