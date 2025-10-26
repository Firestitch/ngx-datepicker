import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideRouter } from '@angular/router';
import { FsDatePickerModule } from '../src/app/datepicker.module';
import { FsScrollbarModule } from '@firestitch/scrollbar';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsDateModule } from '@firestitch/date';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(FsDatePickerModule.forRoot(), FsScrollbarModule.forRoot(), FsExampleModule.forRoot(), FsMessageModule.forRoot(), BrowserModule, FormsModule, FsFormModule, FsLabelModule, FsDateModule),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { floatLabel: 'auto', appearance: 'outline' },
        },
        provideRouter([]),
        provideAnimations(),
    ]
})
  .catch(err => console.error(err));

