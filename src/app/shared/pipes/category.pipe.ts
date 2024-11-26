import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'category',
    standalone: false
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'Gastos fixos': return 'autorenew';
      case 'Folha de pagamento': return 'patient_list';
    }
    return 'question_exchange';
  }

}
