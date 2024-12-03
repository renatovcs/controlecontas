import { Component, OnInit } from '@angular/core';
import { Entry } from '../model/entry';
import { EntriesService } from '../services/entries.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-entries',
    templateUrl: './entries.component.html',
    styleUrls: ['./entries.component.scss'],
    standalone: false
})
export class EntriesComponent implements OnInit {

  entries$: Observable<Entry[]> | null = null;
  //entries: Entry[] =[];
  //entriesService: EntriesService;

  constructor(
    private readonly entriesService: EntriesService,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar
  ) { }

  refresh() {
    this.entries$ = this.entriesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar os lançamentos.')
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(entry: Entry) {
    this.router.navigate(['edit', entry._id], {relativeTo: this.route});
  }

  onRemove(entry: Entry) {
    this.entriesService.remove(entry._id).subscribe({
      next: () => {
        this.refresh();
        this.snackBar.open('Lançamento removido com sucesso.', 'X', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      error: (error) => this.onError('Erro ao remover lançamento.'),
      //complete: () => console.log('Remoção concluída.'),
    });
  }
}
