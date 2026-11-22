import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  DoCheck,
  ElementRef,
  inject,
  Injector,
  input,
  model,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlContainer, FormsModule } from '@angular/forms';

import {
  MatFormField,
  MatFormFieldAppearance,
  MatHint,
  MatPrefix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

import { FsClearModule } from '@firestitch/clear';
import { FsFormRequiredDirective } from '@firestitch/form';

import { timer } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { endOfDay, isAfter, isSameDay, startOfDay } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

import { PickerViewType } from '../../../libs/common/enums/picker-view-type.enum';
import { IDatePresetRange } from '../../../libs/common/interfaces/date-preset.interface';
import { WeekDays } from '../../../libs/common/types/week-days.type';
import { FsDatePickerDialogRef } from '../../../libs/dialog/classes/dialog-ref';
import { FsDatePickerDialogFactory } from '../../../libs/dialog/services/dialog-factory.service';
import { RangePickerRef } from '../../classes/range-picker-ref';
import { createDateFromValue } from '../../helpers/create-date-from-value';
import { formatDateTime } from '../../helpers/format-date-time';
import { IFsDatePickerConfig } from '../../interfaces/datepicker-config.interface';
import { FS_DATEPICKER_CONFIG } from '../../providers/datepicker-config.provider';
import { FsDatePickerPresetChipComponent } from '../preset-chip/preset-chip.component';

import { FsDateRangeControlDirective } from './date-range-control.directive';


let nextId = 0;

/**
 * A date range in one form field: From and To side by side, each its own click
 * target, one icon and one clear button for the pair.
 *
 * The two ends bind to two variables, `[(from)]` and `[(to)]`. The page's form
 * still sees the field: the control inside registers with the form around this
 * component under `name`, so required, dirty and submit work as on any field.
 * Required means both ends.
 */
@Component({
  selector: 'fs-date-range',
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatHint,
    MatPrefix,
    MatIcon,
    FsClearModule,
    FsFormRequiredDirective,
    FsDatePickerPresetChipComponent,
    FsDateRangeControlDirective,
  ],
  // Lets the control in the template join the form this component sits in.
  // Without it, ngModel's form lookup stops at this component's edge.
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true, optional: true }),
    },
  ],
  host: {
    class: 'fs-date-range',
    '[class.fs-date-range-has-chip]': 'presetChip',
    '[class.fs-date-range-empty]': '!from() && !to() && !opened()',
  },
})
export class FsDateRangeComponent implements DoCheck {

  public readonly from = model<Date | null>(null);
  public readonly to = model<Date | null>(null);
  public readonly name = input<string>(`fsDateRange${nextId++}`);
  public readonly required = input(false);
  public readonly disabled = input(false);
  public readonly view = input<PickerViewType>(PickerViewType.Date);
  public readonly fromLabel = input('From');
  public readonly toLabel = input('To');
  public readonly minDate = input<Date | null>(null);
  public readonly maxDate = input<Date | null>(null);
  public readonly timezone = input<string | null>(null);
  public readonly weekStartsOn = input<WeekDays>();
  public readonly showNow = input(true);
  public readonly clear = input(true);
  public readonly appearance = input<MatFormFieldAppearance>();

  public readonly opened = signal<'from' | 'to' | null>(null);
  public readonly fromDisplay = computed(() => createDateFromValue(this.from(), this.timezone()));
  public readonly toDisplay = computed(() => createDateFromValue(this.to(), this.timezone()));
  public readonly fromText = computed(() => formatDateTime(this.fromDisplay(), this.view()));
  public readonly toText = computed(() => formatDateTime(this.toDisplay(), this.view()));
  public readonly range = computed<IDatePresetRange | null>(() => {
    return this.from() && this.to() ? { from: this.from(), to: this.to() } : null;
  });

  public readonly presetChip: boolean;

  private _config = inject<IFsDatePickerConfig>(FS_DATEPICKER_CONFIG);
  private _dialogFactory = inject(FsDatePickerDialogFactory);
  private _injector = inject(Injector);
  private _destroyRef = inject(DestroyRef);
  // Not .required: DoCheck reads it before the view exists.
  private _control = viewChild(FsDateRangeControlDirective);
  private _fromEnd = viewChild.required<ElementRef<HTMLElement>>('fromEnd');
  private _toEnd = viewChild.required<ElementRef<HTMLElement>>('toEnd');
  private _pickerRef = new RangePickerRef(PickerViewType.Date);
  private _dialogRef: FsDatePickerDialogRef | null = null;
  private _next: 'from' | 'to' | null = null;

  constructor() {
    this.presetChip = !!this._config.preset || !!this._config.presets?.length;
    this._init();
  }

  public ngDoCheck(): void {
    this._control()?.updateErrorState();
  }

  public open(end: 'from' | 'to', event?: Event): void {
    event?.stopPropagation();

    if (this._control()?.disabled) {
      return;
    }

    // The calendar leaves both ends clickable while it is open, so a click on
    // the other end switches to it; a click on the open end keeps it open.
    if (this._dialogRef) {
      if (this.opened() !== end) {
        this._next = end;
        this._dialogRef.close();
      }

      return;
    }

    this._openDialog(end);
  }

  public cleared(): void {
    this.from.set(null);
    this.to.set(null);
    this._notify();
  }

  private _init(): void {
    this._listenRange();
    this._listenActivePicker();
    this._destroyRef.onDestroy(() => this._dialogRef?.close());
  }

  private _openDialog(end: 'from' | 'to'): void {
    const from = this.fromDisplay();
    const to = this.toDisplay();
    const target = end === 'from' ? this._fromEnd() : this._toEnd();

    this._pickerRef.view = this.view();
    this._pickerRef.updateStartDate(from);
    this._pickerRef.updateEndDate(to);

    this._dialogRef = this._dialogFactory.openDatePicker(target, this._injector, {
      view: this.view(),
      minDate: this.minDate(),
      maxDate: this.maxDate(),
      rangeStart: from,
      // An empty end opens on the other end's date, as the two-field picker does.
      modelValue: end === 'from' ? (from ?? to) : (to ?? from),
      components: { calendarStart: true, calendarEnd: true },
      pickerRef: this._pickerRef,
      rangeType: end,
      weekStartsOn: this.weekStartsOn() ?? this._config.weekStartsOn,
      showNow: this.showNow(),
      preset: this._config.preset,
      presets: this._config.presets,
      ignoreOutsideClicksOn: [this._fromEnd().nativeElement, this._toEnd().nativeElement],
      // Clears just this end. On a required range that leaves the field
      // invalid, and the form shows its required message as for any field.
      showClear: !!(end === 'from' ? from : to),
    });

    this.opened.set(end);
    this._listenDialog(end, this._dialogRef);
  }

  private _listenDialog(end: 'from' | 'to', dialogRef: FsDatePickerDialogRef): void {
    dialogRef.value$
      .pipe(
        tap((value: Date) => this._pick(end, value)),
        takeUntilDestroyed(this._destroyRef),
        takeUntil(dialogRef.close$),
      )
      .subscribe();

    dialogRef.close$
      .pipe(
        take(1),
        tap(() => this._closed()),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  /**
   * The dialog is still tearing down when close$ fires, so the next end opens
   * on the following tick rather than inside that teardown.
   */
  private _closed(): void {
    const next = this._next;

    this._dialogRef = null;
    this._next = null;
    this.opened.set(null);

    if (next) {
      timer(0)
        .pipe(
          tap(() => this._openDialog(next)),
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe();
    }
  }

  private _pick(end: 'from' | 'to', value: Date | null): void {
    if (end === 'from') {
      this._pickFrom(value);
    } else {
      this._pickTo(value);
    }

    this._notify();
  }

  private _pickFrom(value: Date | null): void {
    const from = this._isDateView() && value ? startOfDay(value) : value;
    const to = this.toDisplay();
    const previous = this.fromDisplay();
    const newDay = !!from && !(previous && isSameDay(previous, from));

    this.from.set(this._toModel(from));

    // Cleared from the calendar: the end stays as it is and nothing opens next.
    if (!from) {
      return;
    }

    // A start past the end leaves no range, so the end goes, as the two-field picker's does.
    if (to && isAfter(from, to)) {
      this.to.set(null);
    }

    // A date pick closes the calendar, so carry straight on to the end date.
    if (this._isDateView()) {
      this._next = 'to';

      return;
    }

    // A date-time calendar stays open for the time, and Continue moves on. With
    // no end yet, a new start date moves on by itself rather than waiting for
    // Continue; the start's time is one click on the start away.
    if (newDay && !this.to()) {
      this._next = 'to';
      this._dialogRef?.close();
    }
  }

  private _pickTo(value: Date | null): void {
    const to = this._isDateView() && value ? endOfDay(value) : value;

    this.to.set(this._toModel(to));
  }

  /** Presets set both ends at once, through the range ref the dialog was given. */
  private _listenRange(): void {
    this._pickerRef.range$
      .pipe(
        tap((range: IDatePresetRange) => {
          this.from.set(this._toModel(range.from));
          this.to.set(this._toModel(range.to));
          this._notify();
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  /** The dialog's Continue and Back buttons ask for the other end, then close. */
  private _listenActivePicker(): void {
    this._pickerRef.activePicker$
      .pipe(
        tap((end: 'from' | 'to' | null) => {
          this._next = end;
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  private _notify(): void {
    this._control()?.notifyChange(this.range());
  }

  private _toModel(date: Date | null): Date | null {
    return date && this.timezone() ? fromZonedTime(date, this.timezone()) : date;
  }

  private _isDateView(): boolean {
    return this.view() === PickerViewType.Date;
  }

}
