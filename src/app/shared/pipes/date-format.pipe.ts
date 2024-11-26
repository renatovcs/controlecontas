import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFormat',
    standalone: false
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, format: string = 'dd/MM/yyyy'): string | null {
    if (!value) {
      return null;
    }

    const date = new Date(value);
    return new Intl.DateTimeFormat('pt-BR', this.getOptions(format)).format(date);
  }

  private getOptions(format: string): Intl.DateTimeFormatOptions {
    switch (format) {
      case 'dd/MM/yyyy':
        return { day: '2-digit', month: '2-digit', year: 'numeric' };
      case 'MM/yyyy':
        return { month: '2-digit', year: 'numeric' };
      default:
        return { day: '2-digit', month: '2-digit', year: 'numeric' };
    }
  }
}
