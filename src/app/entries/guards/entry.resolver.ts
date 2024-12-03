import { ResolveFn } from '@angular/router';
import { EntriesService } from '../services/entries.service';
import { inject } from '@angular/core';
import { Entry } from '../model/entry';

export const entryResolver: ResolveFn<Entry> = (route, state) => {

  const service = inject(EntriesService);

  const id = route.params?.['id'];

  if (id) {
    return service.loadById(id);
  }

  return {
    _id: '',
    description: '',
    category: '',
    amount: 0,
    type: 'DEBIT',
    currency: 'BRL',
    eventDate: new Date(),
    createdAt: new Date(),
    deletedAt: null,
    updatedAt: null,
  };
};