import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { EntriesService } from '../services/entries.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Entry } from '../model/entry';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss'],
  standalone: false
})
export class EntryFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    category: ['notafiscal'],
    invoiceAccessKey: [''],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    company: ['MADRID'],
    type: ['DEBIT'],
    currency: ['BRL'],
    eventDate: [new Date()]
  });

  constructor (private readonly formBuilder: NonNullableFormBuilder,
    private readonly service: EntriesService,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location,
    private readonly route: ActivatedRoute
  ) {
    //this.form
  }

  ngOnInit(): void {
    const entry: Entry = this.route.snapshot.data['entry'];
    this.form.setValue({
      _id: entry._id,
      description: entry.description,
      category: entry.category,
      invoiceAccessKey: entry.invoiceAccessKey,
      company: entry.company,
      amount: entry.amount,
      type: entry.type,
      currency: entry.currency,
      eventDate: entry.eventDate,
    })
  }

  onSubmit() {

    if (this.form.valid) {
      this.service.save(this.form.value)
        .subscribe({
          next: (result) => this.onSucess(),
          error: (error) => this.onError(),
          complete: () => console.log('completo')
        });
    } else {
      this.onError('Campos inválidos.');
    }

  }

  onCancel() {
    this.location.back();
  }

  private onSucess() {
    this.snackBar.open('Lançamento salvo com sucesso.', '', {duration: 5000});
    this.onCancel();
  }

  private onError(complemento: string = '') {
    this.snackBar.open(`Erro ao salvar o lançamento. ${complemento}`, '', {duration: 5000});
  }

  errorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('min')) {
      const requiredLength = field.errors ? field.errors['min']['min'] : 1;
      return `Valor mínimo de R$ ${requiredLength}.`;
    }

    return 'Campo inválido';
  }
}
