import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { entryResolver } from './entry.resolver';
import { EntriesService } from '../services/entries.service';
import { Observable, of } from 'rxjs';
import { Entry } from '../model/entry';

describe('entryResolver', () => {
  let mockEntriesService: jasmine.SpyObj<EntriesService>;

  const executeResolver: ResolveFn<Entry> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => entryResolver(...resolverParameters));

  beforeEach(() => {
    // Cria um mock do serviço
    mockEntriesService = jasmine.createSpyObj('EntriesService', ['loadById']);

    // Configura o TestBed com o serviço mockado
    TestBed.configureTestingModule({
      providers: [
        { provide: EntriesService, useValue: mockEntriesService },
      ],
    });
  });

  it('should resolve with entry data for a valid ID', (done) => {
    // Configura o mock para retornar dados simulados
    const mockEntry: Entry = {
      _id: '1',
      description: 'Test Entry',
      category: 'Test Category',
      amount: 100,
      type: 'DEBIT',
      currency: 'BRL',
      eventDate: new Date(),
      createdAt: new Date(),
      deletedAt: null,
      updatedAt: null,
    };

    mockEntriesService.loadById.and.returnValue(of(mockEntry));

    const result = executeResolver({ params: { id: '1' } } as any, {} as any);

    // Verifica se o resultado é um Observable e chama subscribe
    if (result instanceof Observable) {
      result.subscribe((entry) => {
        expect(entry).toEqual(mockEntry);
        done();
      });
    } else {
      fail('Expected an Observable, but got something else');
    }
  });

  it('should resolve with default entry for missing ID', () => {
    const result = executeResolver({ params: {} } as any, {} as any);

    // Verifica se o resultado é um objeto Entry diretamente
    expect(result).toEqual({
      _id: '',
      description: '',
      category: '',
      amount: 0,
      type: 'DEBIT',
      currency: 'BRL',
      eventDate: jasmine.any(Date),
      createdAt: jasmine.any(Date),
      deletedAt: null,
      updatedAt: null,
    });
  });
});
