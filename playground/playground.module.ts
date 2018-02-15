import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FsDatePickerModule } from '../src';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app/material.module';
import { DateExampleComponent } from './app/components/date-example/date-example.component';
import { TimeExampleComponent } from './app/components/time-example/time-example.component';
import { DateTimeExampleComponent } from './app/components/datetime-example/datetime-example.component';
import { FsExampleModule } from '@firestitch/example';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsDatePickerModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    DateExampleComponent,
    TimeExampleComponent,
    DateTimeExampleComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
