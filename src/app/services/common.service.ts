import { Injectable } from '@angular/core';

import { isNumeric } from '@firestitch/common';

import { isObject } from 'lodash-es';
import { format, isDate, isValid, lightFormat, startOfDay } from 'date-fns';


@Injectable()
export class FsDatePickerCommon {

  getSelected(date: Date) {
    const result = {};

    if (date && isValid(date) && isDate(date)) {
      result['date'] = lightFormat(date, 'yyyy-MM-dd');
      result['hour'] = date.getHours();
      result['minute'] = date.getMinutes();
      result['year'] = date.getFullYear();
      result['month'] = date.getMonth();
      result['day'] = date.getDate();
    } else {
      result['date'] = null;
      result['hour'] = null;
      result['minute'] = null;
      result['year'] = null;
      result['month'] = null;
      result['day'] = null;
    }

    return result;
  }

  public isSameDay(startDate, endDate) {
    return lightFormat(startDate, 'yyyy-MM-dd') === lightFormat(endDate, 'yyyy-MM-dd');
  }

  public createMoment() {
    return startOfDay(new Date());
  }

  public getMomentSafe(date) {
    return date && isValid(date) ? date : this.createMoment();
  }

  public positionDialog(dialog, elementRef) {

    if (!dialog || window.innerWidth < 500) {
      return;
    }

    const input = elementRef.nativeElement;
    const parent = input.parentElement.parentElement;
    const dialogContainer = dialog.instance.element.nativeElement.querySelector('.fs-date-picker-dialog');
    const dialogContainerStyles = window.getComputedStyle(dialogContainer);

    const inputBound = input.getBoundingClientRect();
    const parentBound = parent.getBoundingClientRect();
    const dialogBound = dialog.instance.element.nativeElement.getBoundingClientRect();
    const dialogContainerBound = dialogContainer.getBoundingClientRect();

    let top = 0;
    if (parent.className.match(/mat-input-flex/)) {
      top = parseInt(parentBound.top);
    } else {
      top = parseInt(inputBound.top) + inputBound.height;
    }

    const css = { top: '', bottom: '', left: '', right: '' };

    if ((top + parseInt(dialogContainerStyles.height)) > window.innerHeight) {
      css.bottom = '10px';
      dialogContainer.classList.add('vertical-reposition');
    } else {
      css.top = top + 'px';
      dialogContainer.classList.remove('vertical-reposition');
    }

    const left = parseInt(inputBound.left);

    if ((left + parseInt(dialogContainerStyles.width)) > window.innerWidth) {
      css.right = '10px';
      css.left = '';
      dialogContainer.classList.add('horizontal-reposition');
    } else {
      css.left = left + 'px';
      css.right = '';
      dialogContainer.classList.remove('horizontal-reposition');
    }

    for (const i in css) {

      if (css[i] === undefined) {
        continue;
      }

      dialogContainer.style[i] = css[i];
    }
  }

  public positionDialogUnderInput(dialog, elementRef) {
    if (!dialog || window.innerWidth < 500) {
      return;
    }

    this.positionDialog(dialog, elementRef);

    // after basic position of dialog we need to set it under input
    const input = elementRef.nativeElement;
    const parentInfix = input.parentElement;
    // const parent = parentInfix.parentElement;
    const dialogContainer = dialog.instance.element.nativeElement.querySelector('.fs-date-picker-dialog');
    // const parentBound = parent.getBoundingClientRect();
    const dialogBound = dialogContainer.getBoundingClientRect();

    // triangle
    const pseudoHeight = Number(window
      .getComputedStyle(dialogContainer.querySelector('.wrap'), ':before')
      .getPropertyValue('border-left-width')
      .substr(0, 2));

    const bottomOffset = Number(window
      .getComputedStyle(parentInfix)
      .getPropertyValue('padding-bottom')
      .substr(0, 2));

    // Dialog already aligned at the input bottom
    // Add input container bottom padding & triangle offset
    dialogContainer.style.top = dialogBound.top + bottomOffset + pseudoHeight + 'px';
  }

  public formatDateTimeRange(value, view = 'date') {

    if (!isObject(value)) {
      return '';
    }

    const parts = [];
    const startDate = this.formatDateTime(value.start, view);
    const endDate = this.formatDateTime(value.end, view);

    if (startDate) {
      parts.push(startDate);
    }

    if (endDate) {
      parts.push(endDate);
    }

    return parts.join(' to ');
  }

  public formatDateTime(value, view = 'date') {
    let result = '';
    const convertTo = [];

    if (isNumeric(value)) {
      value = new Date(value);
    } else if (typeof value === 'string') {
      value = new Date(value);
      if (!isValid(value)) {
        value = Date.parse(value);
      }
    }

    if (value && isValid(value)) {

      if (['date', 'datetime'].indexOf(view) != -1) {
        convertTo.push('MMM d, yyyy');
      }

      if (['time', 'datetime'].indexOf(view) != -1) {
        convertTo.push('h:mm aaaa');
      }

      result = format(value, convertTo.join(' '));
    }

    return result;
  }

  public formatSummary(date, view = 'date') {

    if (view === 'date') {
      return format(date, 'MMM d, yyyy');
    }

    if (view === 'time') {
      return format(date, 'h:mm aaaa');
    }
  }

  public inputClick(e, callback) {

    const x = e.clientX,
    y = e.clientY,
    stack = [];
    let el;

    do {

      el = document.elementFromPoint(x, y);

      const last = stack[stack.length - 1];

      if (last && last.isEqualNode(el)) {
        break;
      }

      el.classList.add('pointer-events-none');
      stack.push(el);

      if (el.className.match('/fs-date-picker-backdrop/')) {
        setTimeout(() => {
          el.click();
        });
        break;
      }
    } while (el.tagName !== 'HTML' && !el.tagName.match(/^FS-DATE-PICKER/));

    for (let i = 0; i < stack.length; i += 1) {
        stack[i].classList.remove('pointer-events-none');
    }

    callback();
  }

  public isValidRange(startDate, endDate): boolean {
    return startDate && endDate && isValid(startDate) && isValid(endDate);
  }

  public createDate(value) {
    if (value && !isDate(value)) {
      value = new Date(value);

      if (!isValid(value)) {
        value = null;
      }
    }
    return value;
  }

  public addClass(element, klass) {
    element.classList.add(klass);
  }

  public removeClass(element, klass) {
    element.classList.remove(klass);
  }

}
