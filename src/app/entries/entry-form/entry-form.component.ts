import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { EntriesService } from '../services/entries.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss'],
  standalone: false
})
export class EntryFormComponent implements OnInit {

  form = this.formBuilder.group({
    description: [''],
    category: ['notafiscal'],
    amount: [0],
    type: ['DEBIT'],
    currency: ['BRL'],
    eventDate: [new Date()]
  });

  constructor (private readonly formBuilder: NonNullableFormBuilder,
    private readonly service: EntriesService,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location) {
    //this.form
  }

  ngOnInit(): void { }

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
