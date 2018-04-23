import { EventEmitter, OnInit } from '@angular/core';
import { FsPreset } from './../../interfaces/fspreset.interface';
import { FsDatePickerModel } from './../../services/fsdatepickermodel.service';
export declare class FsDatepickerPresetsComponent implements OnInit {
    private fsDatePickerModel;
    datesChange: EventEmitter<any>;
    presets: FsPreset[];
    constructor(fsDatePickerModel: FsDatePickerModel);
    ngOnInit(): void;
    setPreset(preset: FsPreset): void;
}
