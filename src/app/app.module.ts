import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { NgSelect2Module } from 'ng-select2';
import { NgxPaginationModule } from 'ngx-pagination';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ApiInterceptor } from './shared/service/api.interceptor';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import localeVi from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';

// Register the locale data
registerLocaleData(localeVi, 'vi-VN');
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
    NgWizardModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    NgSelect2Module,
    NgxPaginationModule,
    PerfectScrollbarModule,
    NgbTypeaheadModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: LOCALE_ID, useValue: 'vi-VN' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
