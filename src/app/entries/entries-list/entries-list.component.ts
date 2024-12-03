import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entry } from '../model/entry';

@Component({
  selector: 'app-entries-list',
  //imports: [],
  templateUrl: './entries-list.component.html',
  styleUrl: './entries-list.component.scss',
  standalone: false
})
export class EntriesListComponent {

  @Input() entries: Entry[] = [];
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();

  readonly displayedColumns = ['eventDate', 'description', 'category', 'amount', 'actions'];

  constructor() { }

  ngOnInit(): void { /* method 'ngOnInit' is empty */  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(entry: Entry) {
    this.edit.emit(entry);
  }


}
