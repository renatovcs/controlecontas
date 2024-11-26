import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntriesService } from '../services/entries.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss'],
  standalone: false
})
export class EntryFormComponent implements OnInit {

  form: FormGroup;

  constructor (private readonly formBuilder: FormBuilder,
    private readonly service: EntriesService,
    private readonly snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      description: [null],
      category: [null],
      amount: [null],
      type: [null],
      currency: [null],
      eventDate: [null]
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => console.log(result), error => this.onError());
  }

  onCancel() {

  }

  private onError() {
    this.snackBar.open('Erro ao salvar o lançamento.', '', {duration: 5000});
  }
}
