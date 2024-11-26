import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Entry } from '../model/entry';
import { tap, first, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  //private readonly API = '/assets/entries.json';
  private readonly API = 'api/entries';

  constructor(private readonly httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Entry[]>(this.API)
    .pipe(
      first(),
      //delay(5000),
      tap(entries => console.log(entries))
    );
  }

  save(record: Entry) {
    return this.httpClient.post<Entry>(this.API, record).pipe(first());
  }
}
