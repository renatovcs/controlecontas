import { Component, Input } from '@angular/core';
import { Entry } from '../model/entry';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-entries-list',
  //imports: [],
  templateUrl: './entries-list.component.html',
  styleUrl: './entries-list.component.scss',
  standalone: false
})
export class EntriesListComponent {

  @Input() entries: Entry[] = [];

  readonly displayedColumns = ['eventDate', 'description', 'category', 'amount', 'actions'];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void { }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
