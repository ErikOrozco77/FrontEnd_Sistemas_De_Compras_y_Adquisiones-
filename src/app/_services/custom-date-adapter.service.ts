import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: string): string {
    const dtf = new Intl.DateTimeFormat(this.locale, MY_DATE_FORMATS.display.dateInput);
    return dtf.format(date);
  }
}

export const CUSTOM_DATE_ADAPTER_PROVIDER = {
  provide: DateAdapter,
  useClass: CustomDateAdapter,
};

export const CUSTOM_DATE_FORMATS_PROVIDER = {
  provide: MAT_DATE_FORMATS,
  useValue: MY_DATE_FORMATS,
};
