import { FsDatePicker } from './../interfaces/fsdatepicker.interface';
import { FsPreset } from './../interfaces/fspreset.interface';
import { FsComponents } from './../interfaces/fscomponents.interface';
export declare class FsDatePickerModel implements FsDatePicker {
    private _minYear;
    private _maxYear;
    /**
     * date | datetime | time
     * View is options selected on init. Can't be changed manually
     */
    private _view;
    /**
     * Visual components. Can be changed by summary widget but only if _view allowed to do this.
     */
    private _componentsDefault;
    private _components;
    /**
     * year | month | date
     *
     * Current mode of calendar. For ranges consist values for both: start and end date
     */
    dateMode: any;
    presets: FsPreset[];
    components: FsComponents;
    minYear: any;
    maxYear: any;
    view: string;
    constructor();
}
