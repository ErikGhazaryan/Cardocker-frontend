import { TestBed } from '@angular/core/testing';

import { CarForSaleService } from './car-for-sale.service';

describe('CarForSaleService', () => {
  let service: CarForSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarForSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
