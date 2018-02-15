import { Injectable } from '@angular/core';
import { FsUtil } from '@firestitch/common';
import * as moment from 'moment-timezone';

@Injectable()
export class FsDatePickerCommon {

  constructor(private fsUtil: FsUtil) { }

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

  createMoment() {
    return moment().startOf('day');
  }

  positionDialog(dialog, elementRef) {

    if (!dialog || window.innerWidth < 500) {
      return;
    }

    const input = elementRef.nativeElement;
    const dialogContainer = dialog.instance.element.nativeElement.querySelector('.fs-datetime-dialog');
    const dialogContainerStyles = window.getComputedStyle(dialogContainer);
    const inputBound = input.getBoundingClientRect();
    const dialogBound = dialog.instance.element.nativeElement.getBoundingClientRect();
    const dialogContainerBound = dialogContainer.getBoundingClientRect();
    const top = parseInt(inputBound.top) + inputBound.height;

    const css = { top: '', bottom: '', left: '', right: '' };

    if ((top + this.fsUtil.int(dialogContainer.style.marginTop) +
        this.fsUtil.int(dialogContainerStyles.height)) > window.innerHeight) {
      css.bottom = '10px';
      dialogContainer.classList.add('vertical-reposition');
    } else {
      css.top = top + 'px';
      dialogContainer.classList.remove('vertical-reposition');
    }

    const left = parseInt(inputBound.left);

    if ((left + this.fsUtil.int(dialogContainerStyles.width)) > window.innerWidth) {
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

  renderDateTime(input, value, view = 'date') {

    const format = [],
        options = {};

    if (this.fsUtil.isInt(value)) {
      value = moment(new Date(value));
    } else if (this.fsUtil.isString(value)) {
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

      input.nativeElement.value = value.format(format.join(' '));

    } else {
      input.nativeElement.value = '';
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

      if (el.className.match('/fs-datetime-backdrop/')) {
        setTimeout(() => {
          el.click();
        });
        break;
      }
    } while (el.tagName !== 'HTML' && !el.tagName.match(/^FS-DATETIME/));

    for (let i = 0; i < stack.length; i += 1) {
        stack[i].classList.remove('pointer-events-none');
    }

    callback();
  }
}
