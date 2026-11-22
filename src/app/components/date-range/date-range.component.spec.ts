import { Component, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Subject } from 'rxjs';

import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { endOfDay, startOfDay } from 'date-fns';

import { PickerViewType } from '../../../libs/common/enums/picker-view-type.enum';
import { IDialogFactoryOptions } from '../../../libs/dialog/interfaces/dialog-factory-data.interface';
import { FsDatePickerDialogFactory } from '../../../libs/dialog/services/dialog-factory.service';

import { FsDateRangeComponent } from './date-range.component';


interface FakeDialog {
  options: IDialogFactoryOptions;
  pick: (date: Date | null) => void;
}

/**
 * Stands in for the calendar: a pick emits the date, then a date view closes,
 * while a date-time view stays open for the time.
 */
function fakeDialogFactory() {
  const opened: FakeDialog[] = [];

  return {
    opened,
    openDatePicker: (el: unknown, injector: unknown, options: IDialogFactoryOptions) => {
      const value$ = new Subject<Date>();
      const close$ = new Subject<void>();
      const close = () => {
        close$.next();
        close$.complete();
      };

      opened.push({
        options,
        pick: (date: Date | null) => {
          value$.next(date);

          if (options.view !== PickerViewType.DateTime) {
            close();
          }
        },
      });

      return { value$: value$.asObservable(), close$: close$.asObservable(), close };
    },
  };
}


@Component({
  standalone: true,
  imports: [
    FormsModule,
    FsDateRangeComponent,
  ],
  template: `<form><fs-date-range [(from)]="from" [(to)]="to" [name]="'period'"
    [required]="required()" [view]="view()" /></form>`,
})
class HostComponent {
  public from = signal<Date | null>(new Date(2026, 10, 2));
  public to = signal<Date | null>(endOfDay(new Date(2026, 10, 8)));
  public required = signal(true);
  public view = signal(PickerViewType.Date);
  public form = viewChild.required(NgForm);
}


describe('FsDateRangeComponent', () => {

  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let range: FsDateRangeComponent;
  let dialogs: ReturnType<typeof fakeDialogFactory>;

  beforeEach(fakeAsync(() => {
    dialogs = fakeDialogFactory();

    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        provideNoopAnimations(),
        { provide: FsDatePickerDialogFactory, useValue: dialogs },
      ],
    });

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    render();

    range = fixture.debugElement.query(By.directive(FsDateRangeComponent)).componentInstance;
  }));

  function render(): void {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }

  function control() {
    return host.form().controls['period'];
  }

  it('joins the page form as one control under its name', fakeAsync(() => {
    expect(control()).toBeTruthy();
    expect(Object.keys(host.form().controls)).toEqual(['period']);
    expect(host.form().valid).toBeTrue();
    expect(host.form().dirty).toBeFalse();
  }));

  it('needs both ends when required', fakeAsync(() => {
    host.to.set(null);
    render();

    expect(control().hasError('required')).toBeTrue();
    expect(host.form().valid).toBeFalse();
  }));

  it('allows one end when not required', fakeAsync(() => {
    host.required.set(false);
    host.to.set(null);
    render();

    expect(host.form().valid).toBeTrue();
  }));

  it('carries on to the end date after the start date is picked', fakeAsync(() => {
    range.open('from');
    dialogs.opened[0].pick(new Date(2026, 10, 4, 15, 30));
    tick();

    expect(host.from()).toEqual(startOfDay(new Date(2026, 10, 4)));
    expect(dialogs.opened.length).toBe(2);
    expect(dialogs.opened[1].options.rangeType).toBe('to');
    expect(dialogs.opened[1].options.rangeStart).toEqual(startOfDay(new Date(2026, 10, 4)));
    expect(host.form().dirty).toBeTrue();

    dialogs.opened[1].pick(new Date(2026, 10, 20));
    tick();

    expect(host.to()).toEqual(endOfDay(new Date(2026, 10, 20)));
    expect(dialogs.opened.length).toBe(2);
    expect(range.opened()).toBeNull();
  }));

  it('goes straight on to a blank end in the date-time view', fakeAsync(() => {
    host.view.set(PickerViewType.DateTime);
    host.to.set(null);
    render();

    range.open('from');
    dialogs.opened[0].pick(new Date(2026, 10, 4, 15, 30));
    tick();

    expect(host.from()).toEqual(new Date(2026, 10, 4, 15, 30));
    expect(dialogs.opened.length).toBe(2);
    expect(dialogs.opened[1].options.rangeType).toBe('to');
    expect(range.opened()).toBe('to');
  }));

  it('keeps the date-time start open for its time while the end is set', fakeAsync(() => {
    host.view.set(PickerViewType.DateTime);
    render();

    range.open('from');
    dialogs.opened[0].pick(new Date(2026, 10, 4, 15, 30));
    tick();

    expect(host.from()).toEqual(new Date(2026, 10, 4, 15, 30));
    expect(dialogs.opened.length).toBe(1);
    expect(range.opened()).toBe('from');
  }));

  it('switches to the other end while one is open', fakeAsync(() => {
    range.open('from');
    range.open('to');
    tick();

    expect(dialogs.opened.length).toBe(2);
    expect(dialogs.opened[1].options.rangeType).toBe('to');
    expect(range.opened()).toBe('to');
    expect(dialogs.opened[1].options.ignoreOutsideClicksOn.length).toBe(2);
  }));

  it('keeps an end open when it is clicked again', fakeAsync(() => {
    range.open('from');
    range.open('from');
    tick();

    expect(dialogs.opened.length).toBe(1);
    expect(range.opened()).toBe('from');
  }));

  describe('clearing one end from the calendar', () => {

    it('offers to clear an end only when that end is set', fakeAsync(() => {
      host.to.set(null);
      render();

      range.open('from');
      range.open('to');
      tick();

      expect(dialogs.opened[0].options.showClear).toBeTrue();
      expect(dialogs.opened[1].options.showClear).toBeFalse();
    }));

    it('leaves a required range invalid when one end is cleared', fakeAsync(() => {
      range.open('to');
      dialogs.opened[0].pick(null);
      tick();
      fixture.detectChanges();

      expect(host.to()).toBeNull();
      expect(control().hasError('required')).toBeTrue();
      expect(control().dirty).toBeTrue();
    }));

    it('clears just the start from the calendar and opens nothing after', fakeAsync(() => {
      host.required.set(false);
      render();

      range.open('from');
      dialogs.opened[0].pick(null);
      tick();

      expect(host.from()).toBeNull();
      expect(host.to()).toEqual(endOfDay(new Date(2026, 10, 8)));
      expect(dialogs.opened.length).toBe(1);
      expect(range.opened()).toBeNull();
      expect(host.form().valid).toBeTrue();
    }));

    it('clears just the end from the calendar', fakeAsync(() => {
      host.required.set(false);
      render();

      range.open('to');
      dialogs.opened[0].pick(null);
      tick();

      expect(host.from()).toEqual(new Date(2026, 10, 2));
      expect(host.to()).toBeNull();
      expect(range.opened()).toBeNull();
    }));

  });

  it('drops the end when the new start is past it', fakeAsync(() => {
    range.open('from');
    dialogs.opened[0].pick(new Date(2026, 10, 12));
    tick();
    fixture.detectChanges();

    expect(host.to()).toBeNull();
    expect(control().hasError('required')).toBeTrue();
  }));

  it('clears both ends at once', fakeAsync(() => {
    range.cleared();
    render();

    expect(host.from()).toBeNull();
    expect(host.to()).toBeNull();
    expect(host.form().dirty).toBeTrue();
    expect(control().hasError('required')).toBeTrue();
  }));

});
