import { PickerViewType } from '../../libs/common/enums/picker-view-type.enum';

import { parseDate } from './parse-date';


describe('parseDate', () => {

  it('parses 12-hour rendered time', () => {
    const date = parseDate('3:30 PM', PickerViewType.Time);

    expect(date).toBeTruthy();
    expect(date.getHours()).toBe(15);
    expect(date.getMinutes()).toBe(30);
  });

  it('parses lowercase / no-space am-pm', () => {
    const date = parseDate('3:30pm', PickerViewType.Time);

    expect(date).toBeTruthy();
    expect(date.getHours()).toBe(15);
    expect(date.getMinutes()).toBe(30);
  });

  it('parses 24-hour time', () => {
    const date = parseDate('15:30', PickerViewType.Time);

    expect(date).toBeTruthy();
    expect(date.getHours()).toBe(15);
    expect(date.getMinutes()).toBe(30);
  });

  it('parses hour-only with pm → afternoon', () => {
    const date = parseDate('3pm', PickerViewType.Time);

    expect(date).toBeTruthy();
    expect(date.getHours()).toBe(15);
    expect(date.getMinutes()).toBe(0);
  });

  it('parses hour-only with space am/pm', () => {
    const date = parseDate('3 PM', PickerViewType.Time);

    expect(date).toBeTruthy();
    expect(date.getHours()).toBe(15);
    expect(date.getMinutes()).toBe(0);
  });

  it('parses bare hour as 24-hour', () => {
    const date = parseDate('3', PickerViewType.Time);

    expect(date).toBeTruthy();
    expect(date.getHours()).toBe(3);
    expect(date.getMinutes()).toBe(0);
  });

  it('parses bare 24-hour evening', () => {
    const date = parseDate('15', PickerViewType.Time);

    expect(date).toBeTruthy();
    expect(date.getHours()).toBe(15);
    expect(date.getMinutes()).toBe(0);
  });

  it('returns null for garbage time', () => {
    expect(parseDate('not a time', PickerViewType.Time)).toBeNull();
  });

  it('still parses a full date on Date view', () => {
    const date = parseDate('Jun 5, 2026', PickerViewType.Date);

    expect(date).toBeTruthy();
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(5); // June (0-indexed)
    expect(date.getDate()).toBe(5);
  });

  it('does not accept bare time on Date view', () => {
    expect(parseDate('3:30 PM', PickerViewType.Date)).toBeNull();
  });

  it('parses a rendered date-time on DateTime view', () => {
    const date = parseDate('Nov 1, 2026 3:30 PM', PickerViewType.DateTime);

    expect(date).toBeTruthy();
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(10); // November (0-indexed)
    expect(date.getDate()).toBe(1);
    expect(date.getHours()).toBe(15);
    expect(date.getMinutes()).toBe(30);
  });

  /**
   * The scroll picker renders month/year, month/day, month-only and year-only
   * text. JavaScriptCore's Date.parse rejects some of these shapes, so the
   * engine parser is stubbed to NaN here to prove the rendered text still
   * parses back without it.
   */
  describe('scroll picker rendered text, without the engine parser', () => {

    beforeEach(() => {
      spyOn(Date, 'parse').and.returnValue(NaN);
    });

    it('parses month and year as the first of that month, local', () => {
      const date = parseDate('October 2026', PickerViewType.Date);

      expect(date).toBeTruthy();
      expect(date.getFullYear()).toBe(2026);
      expect(date.getMonth()).toBe(9); // October (0-indexed)
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
    });

    it('parses a year as the first of January, local', () => {
      const date = parseDate('2026', PickerViewType.Date);

      expect(date).toBeTruthy();
      expect(date.getFullYear()).toBe(2026);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
    });

    it('parses month and day into the current year', () => {
      const date = parseDate('November 1', PickerViewType.Date);

      expect(date).toBeTruthy();
      expect(date.getFullYear()).toBe(new Date().getFullYear());
      expect(date.getMonth()).toBe(10); // November (0-indexed)
      expect(date.getDate()).toBe(1);
    });

    it('parses a month alone into the current year', () => {
      const date = parseDate('November', PickerViewType.Date);

      expect(date).toBeTruthy();
      expect(date.getFullYear()).toBe(new Date().getFullYear());
      expect(date.getMonth()).toBe(10); // November (0-indexed)
    });

    it('parses the full date the date view renders', () => {
      const date = parseDate('Jun 5, 2026', PickerViewType.Date);

      expect(date).toBeTruthy();
      expect(date.getFullYear()).toBe(2026);
      expect(date.getMonth()).toBe(5); // June (0-indexed)
      expect(date.getDate()).toBe(5);
    });

    it('returns null for garbage date', () => {
      expect(parseDate('not a date', PickerViewType.Date)).toBeNull();
    });

  });

});
