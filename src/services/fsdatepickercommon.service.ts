import { Injectable } from '@angular/core';
import { isNumeric } from '@firestitch/common/util';
import * as moment from 'moment-timezone';

@Injectable()
export class FsDatePickerCommon {

  constructor() { }

  getSelected(date) {
    const result = {};

    if (date && moment(date).isValid()) {
      result['date'] = moment(date).format('YYYY-MM-DD');
      result['hour'] = parseInt(moment(date).format('H'));
      result['minute'] = parseInt(moment(date).format('m'));
      result['year'] = parseInt(moment(date).format('YYYY'));
      result['month'] = parseInt(moment(date).format('M'));
      result['day'] = parseInt(moment(date).format('D'));
    } else {
      result['date'] = undefined;
      result['hour'] = undefined;
      result['minute'] = undefined;
      result['year'] = undefined;
      result['month'] = undefined;
      result['day'] = undefined;
    }

    return result;
  }

  isSameDay(startDate, endDate) {
    return moment(startDate).format('YYYY-MM-DD') === moment(endDate).format('YYYY-MM-DD');
  }

  createMoment() {
    return moment().startOf('day');
  }

  getMomentSafe(date) {
    return moment(date).isValid() ? date : this.createMoment();
  }

  positionDialog(dialog, elementRef) {

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

  formatDateTimeRange(value, view = 'date') {
    const format = [];
    const startDate = this.formatDateTime(value.start_date, view);
    const endDate = this.formatDateTime(value.end_date, view);

    if (startDate) {
      format.push(startDate);
    }

    if (endDate) {
      format.push(endDate);
    }

    return format.join(' - ');
  }

  formatDateTime(value, view = 'date') {
    let result = '';
    const format = [];

    if (isNumeric(value)) {
      value = moment(new Date(value));
    } else if (typeof value === 'string') {
      if (moment(value).isValid()) {
        value = moment(value);
      } else {
        value = moment(Date.parse(value));
      }
    }

    if (value && moment(value).isValid()) {

      if (['date', 'datetime'].indexOf(view) != -1) {
        format.push('MMM D, YYYY');
      }

      if (['time', 'datetime'].indexOf(view) != -1) {
        format.push('h:mm a');
      }

      result = value.format(format.join(' '));
    }

    return result;
  }

  formatSummary(date, view = 'date') {

    if (view === 'date') {
      return moment(date).format('MMM D, YYYY');
    }

    if (view === 'time') {
      return moment(date).format('h:mm a');
    }
  }

  inputClick(e, callback) {

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
}
