import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
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
    description: [''],
    category: ['notafiscal'],
    invoiceAccessKey: [''],
    amount: [0],
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
    this.service.save(this.form.value)
      .subscribe({
        next: (result) => this.onSucess(),
        error: (error) => this.onError(),
        complete: () => console.log('completo')
      });
  }

  onCancel() {
    this.location.back();
  }

  private onSucess() {
    this.snackBar.open('Lançamento salvo com sucesso.', '', {duration: 5000});
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar o lançamento.', '', {duration: 5000});
  }
}
