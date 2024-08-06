import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Pipe({
  name: 'customcurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: any, currencyCode: string = 'VND', display: string | boolean = 'symbol', digitsInfo?: string, locale?: string): any {
    if (typeof value === 'object' && value !== null) {
      // If the value is an object, return 0
      return this.currencyPipe.transform(0, currencyCode, display, digitsInfo, locale);
    } else if (typeof value === 'number') {
      // If the value is a number, format it as currency
      return this.currencyPipe.transform(value, currencyCode, display, digitsInfo, locale);
    } else {
      return 'Không có dữ liệu'; // Handle other cases or return a placeholder
    }
  }
}
