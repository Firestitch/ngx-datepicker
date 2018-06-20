
import { Injectable } from '@angular/core';

import { isNumeric } from '@firestitch/common/util';

import * as moment from 'moment-timezone';
import { isObject } from 'lodash';


@Injectable()
export class FsDatePickerCommon {

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
      result['date'] = null;
      result['hour'] = null;
      result['minute'] = null;
      result['year'] = null;
      result['month'] = null;
      result['day'] = null;
    }

    return result;
  }

  addClear(renderer, el, click, init = null) {

    const parent = el.parentNode.parentNode;

    const div = renderer.createElement('div');
    renderer.addClass(div, 'mat-input-suffix');
    renderer.addClass(div, 'mat-form-field-suffix');

    const a = renderer.createElement('a');
    renderer.setStyle(a, 'color', 'inherit');

    renderer.setAttribute(a, 'href', 'javascript:;');
    renderer.listen(a, 'click', click);

    const icon = renderer.createElement('mat-icon');

    renderer.addClass(icon, 'mat-icon');
    renderer.addClass(icon, 'material-icons');
    renderer.setStyle(icon, 'vertical-align', 'middle');
    renderer.setStyle(icon, 'height', '24px');
    renderer.setStyle(icon, 'font-size', '20px');
    const text = renderer.createText('clear');

    renderer.appendChild(parent, div);
    renderer.appendChild(div, a);
    renderer.appendChild(a, icon);
    renderer.appendChild(icon, text);

    if (init) {
      // This event should be async to correct handling of disabled condition
      setTimeout(() => {
        init();
      });
    }
  }

  updateClearViewStatus(model, renderer, el) {

    let show = false;

    if (!el.disabled) {
      if ((!moment.isMoment(model) && isObject(model)) && (model.start || model.end)) {

        show = true;
      }

      if ((moment.isMoment(model) || !isObject(model)) && model) {
        show = true;
      }
    }

    if (show) {
      this.showClear(renderer, el);
    } else {
      this.hideClear(renderer, el);
    }
  }

  showClear(renderer, el) {
    const clearButtonEl = el.parentNode.parentNode.querySelector('.mat-input-suffix');

    if (clearButtonEl) {
      renderer.setStyle(clearButtonEl, 'display', 'block');
    }
  }

  hideClear(renderer, el) {
    const clearButtonEl = el.parentNode.parentNode.querySelector('.mat-input-suffix');

    if (clearButtonEl) {
      renderer.setStyle(clearButtonEl, 'display', 'none');
    }
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

  positionDialogUnderInput(dialog, elementRef) {
    if (!dialog || window.innerWidth < 500) {
      return;
    }

    this.positionDialog(dialog, elementRef);

    // after basic position of dialog we need to set it under input
    const input = elementRef.nativeElement;
    const parent = input.parentElement.parentElement;
    const dialogContainer = dialog.instance.element.nativeElement.querySelector('.fs-date-picker-dialog');
    const parentBound = parent.getBoundingClientRect();
    const dialogBound = dialogContainer.getBoundingClientRect();

    // triangle
    const pseudoHeight = Number(window
      .getComputedStyle(dialogContainer.querySelector('.wrap'), ':before')
      .getPropertyValue('border-left')
      .substr(0, 2));

    dialogContainer.style.top = dialogBound.top + parentBound.height + pseudoHeight + 'px';
  }

  formatDateTimeRange(value, view = 'date') {
    const format = [];
    const startDate = this.formatDateTime(value.start, view);
    const endDate = this.formatDateTime(value.end, view);

    if (startDate) {
      format.push(startDate);
    }

    if (endDate) {
      format.push(endDate);
    }

    return format.join(' to ');
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

  isValidRange(startDate, endDate): boolean {
    return moment(startDate).isValid() && moment(endDate).isValid();
  }
}
