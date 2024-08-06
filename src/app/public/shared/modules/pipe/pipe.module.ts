import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CustomCurrencyPipe } from 'app/public/service/currency.pipe';

@NgModule({
  declarations: [
    CustomCurrencyPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    CurrencyPipe,
    { provide: LOCALE_ID, useValue: 'vi-VN' }
  ],
  exports: [
    CustomCurrencyPipe
    // other pipes you want to share
  ]
})
export class PipeModule { }
