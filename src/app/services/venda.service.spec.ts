import { TestBed } from '@angular/core/testing';

import { VendaService } from './venda.service';

describe('FornecedorService', () => {
  let service: VendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
